// Merges the three result files into a scorecard and a side-by-side page.
//
// The markdown is the decision record. The HTML is the thing that actually gets
// read: 200 queries against three engines is only judgeable if the three top-5
// lists sit next to each other on one row, with the expected URL already
// marked.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, GATES, RESULTS_DIR } from './config.mjs';
import {
  scoreQuery,
  summarise,
  summariseBy,
  normalisePath,
} from './lib/score.mjs';

async function readResult(name) {
  try {
    return JSON.parse(
      await readFile(new URL(`./${name}`, RESULTS_DIR), 'utf8')
    );
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

const relevance = await readResult('relevance.json');
const perf = await readResult('perf.json');
const payload = await readResult('payload.json');

if (!relevance) {
  console.error(
    'no results/relevance.json — run `pnpm bakeoff:relevance` first'
  );
  process.exit(1);
}

const labels = Object.fromEntries(TARGETS.map((t) => [t.key, t.label]));
const keys = relevance.targets;

const scored = {};
for (const key of keys) {
  scored[key] = relevance.runs
    .filter((run) => run.target === key)
    .map((run) =>
      scoreQuery({ id: run.id, bucket: run.bucket, expect: run.expect }, run)
    );
}

const full = Object.fromEntries(
  keys.map((key) => [key, scored[key].filter((row) => row.variant === 'full')])
);
const prefix = Object.fromEntries(
  keys.map((key) => [key, scored[key].filter((row) => row.variant !== 'full')])
);

const pct = (value) => `${(value * 100).toFixed(0)}%`;
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;
const ms = (value) => (value == null ? '—' : `${Math.round(value)}ms`);

// --- Markdown ---------------------------------------------------------------

const lines = [];
lines.push('# Search bake-off results', '');
lines.push(`Relevance run: ${relevance.ranAt}`);
if (perf)
  lines.push(
    `Performance run: ${perf.ranAt} (${perf.network.label}, ${perf.cpuThrottle}x CPU)`
  );
lines.push('');

if (payload) {
  lines.push('## Payload', '');
  lines.push(
    '| Engine | Raw | Brotli | On the wire today | Fast 4G once compressed | Parsed every page load |'
  );
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const row of payload.rows) {
    lines.push(
      `| ${row.label} | ${mb(row.raw)} | ${mb(row.brotli)} | ${mb(row.wireToday)}${
        row.servedCompressed ? '' : ' (uncompressed host)'
      } | ${row.downloadSecondsOnCdn.toFixed(1)}s | ${mb(row.parsedBytes)} |`
    );
  }
  lines.push('');
  lines.push(
    'The staging sites are Azure static website endpoints and serve blobs uncompressed. The brotli column is what production would ship. The last column is the cost caching cannot remove.',
    ''
  );
}

if (perf) {
  lines.push('## Performance', '');
  lines.push(
    '| Engine | Cold first result | Warm first result | Revisit (cached) | Keystroke p95 | Index bytes, cold |'
  );
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const row of perf.measurements) {
    lines.push(
      `| ${row.label} | ${ms(row.coldFirstResultMs)} | ${ms(row.warmFirstResultMs)} | ${ms(
        row.revisitFirstResultMs
      )} | ${ms(row.keystrokeP95Ms)} | ${
        // Orama fetches its index from inside a Web Worker, and worker requests
        // do not surface on the page's CDP session. Zero here means unmeasured,
        // and printing it as 0MB would read as a win. `payload.mjs` has the real
        // number for every target.
        row.coldIndexBytes > 0 ? mb(row.coldIndexBytes) : 'not captured'
      } |`
    );
  }
  lines.push('');

  lines.push('### Gates', '');
  lines.push(
    '| Engine | Cold ≤ ' +
      GATES.coldFirstResultMs +
      'ms | Warm ≤ ' +
      GATES.warmFirstResultMs +
      'ms | Keystroke p95 ≤ ' +
      GATES.keystrokeP95Ms +
      'ms | Wire ≤ ' +
      mb(GATES.indexWireBytes) +
      ' |'
  );
  lines.push('| --- | --- | --- | --- | --- |');
  for (const row of perf.measurements) {
    const wire = payload?.rows.find((entry) => entry.target === row.target);
    const gate = (ok) => (ok ? 'pass' : 'FAIL');
    lines.push(
      `| ${row.label} | ${gate((row.coldFirstResultMs ?? Infinity) <= GATES.coldFirstResultMs)} | ${gate(
        (row.warmFirstResultMs ?? Infinity) <= GATES.warmFirstResultMs
      )} | ${gate(row.keystrokeP95Ms <= GATES.keystrokeP95Ms)} | ${gate(
        (wire?.brotli ?? Infinity) <= GATES.indexWireBytes
      )} |`
    );
  }
  lines.push('');
}

lines.push('## Relevance, full-length queries', '');
lines.push(
  '| Engine | Success@1 | Success@5 | MRR | Zero results | Highlighted | Blank excerpts |'
);
lines.push('| --- | --- | --- | --- | --- | --- | --- |');
for (const key of keys) {
  const summary = summarise(full[key]);
  lines.push(
    `| ${labels[key]} | ${pct(summary.successAt1)} | ${pct(summary.successAt5)} | ${summary.mrr.toFixed(
      3
    )} | ${pct(summary.zeroResultRate)} | ${pct(summary.highlightRate)} | ${pct(summary.blankExcerptRate)} |`
  );
}
lines.push('');

lines.push('## Relevance by bucket (Success@5)', '');
const buckets = [...new Set(relevance.runs.map((run) => run.bucket))];
lines.push(`| Engine | ${buckets.join(' | ')} |`);
lines.push(`| --- | ${buckets.map(() => '---').join(' | ')} |`);
for (const key of keys) {
  const byBucket = summariseBy(full[key], 'bucket');
  lines.push(
    `| ${labels[key]} | ${buckets
      .map((bucket) =>
        byBucket[bucket] ? pct(byBucket[bucket].successAt5) : '—'
      )
      .join(' | ')} |`
  );
}
lines.push('');

lines.push('## While you are still typing (truncated queries, Success@5)', '');
lines.push('| Engine | Success@5 | Zero results | Samples |');
lines.push('| --- | --- | --- | --- |');
for (const key of keys) {
  const summary = summarise(prefix[key]);
  lines.push(
    `| ${labels[key]} | ${pct(summary.successAt5)} | ${pct(summary.zeroResultRate)} | ${summary.queries} |`
  );
}
lines.push('');

// Where the engines disagree is the only part of a 200-query set worth reading
// by hand, so it gets its own list.
const disagreements = [];
for (const row of full[keys[0]]) {
  const others = keys
    .slice(1)
    .map((key) => full[key].find((entry) => entry.id === row.id));
  const tops = [row, ...others].map((entry) => entry?.topFive?.[0]?.url ?? '');
  if (new Set(tops).size > 1) {
    disagreements.push({ id: row.id, query: row.query, tops });
  }
}

lines.push(
  `## Disagreements at rank 1 (${disagreements.length} of ${full[keys[0]].length})`,
  ''
);
lines.push(`| Query | ${keys.map((key) => labels[key]).join(' | ')} |`);
lines.push(`| --- | ${keys.map(() => '---').join(' | ')} |`);
for (const row of disagreements) {
  lines.push(
    `| \`${row.query}\` | ${row.tops.map((url) => url || '—').join(' | ')} |`
  );
}
lines.push('');

if (relevance.failures.length > 0) {
  lines.push(
    `## Queries that never settled (${relevance.failures.length})`,
    ''
  );
  for (const failure of relevance.failures) {
    lines.push(`- ${failure.target} \`${failure.query}\` — ${failure.error}`);
  }
  lines.push('');
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(new URL('./report.md', RESULTS_DIR), lines.join('\n'));

// --- Side-by-side page ------------------------------------------------------

const escape = (text) =>
  String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const byId = new Map();
for (const run of relevance.runs) {
  if (run.variant !== 'full') continue;
  const entry = byId.get(run.id) ?? {
    id: run.id,
    bucket: run.bucket,
    query: run.query,
    expect: run.expect,
    note: run.note,
    targets: {},
  };
  entry.targets[run.target] = run;
  byId.set(run.id, entry);
}

const rowHtml = (entry) => {
  const wanted = new Set((entry.expect ?? []).map(normalisePath));

  const column = (key) => {
    const run = entry.targets[key];
    if (!run) return '<td class="miss">no run</td>';
    if (run.results.length === 0) return '<td class="miss">no results</td>';

    const items = run.results.slice(0, 5).map((result, at) => {
      const path = normalisePath(result.url);
      const hit = wanted.has(path);
      return `<li class="${hit ? 'hit' : ''}"><span class="rank">${at + 1}</span><b>${escape(
        result.title
      )}</b><code>${escape(path)}</code><span class="ex">${
        result.excerptHtml || '<i>no excerpt</i>'
      }</span></li>`;
    });

    const rank = run.results.findIndex((result) =>
      wanted.has(normalisePath(result.url))
    );
    const badge =
      wanted.size === 0
        ? 'unscored'
        : rank === -1
          ? 'miss'
          : `rank ${rank + 1}`;

    return `<td><div class="badge ${rank === 0 ? 'good' : rank === -1 && wanted.size > 0 ? 'bad' : ''}">${badge}</div><ol>${items.join('')}</ol></td>`;
  };

  return `<tr><th><div class="q">${escape(entry.query)}</div><div class="bucket">${escape(
    entry.bucket
  )}</div>${entry.note ? `<div class="note">${escape(entry.note)}</div>` : ''}${
    entry.expect?.length
      ? `<div class="want">want ${entry.expect.map((url) => `<code>${escape(normalisePath(url))}</code>`).join(' ')}</div>`
      : ''
  }</th>${keys.map(column).join('')}</tr>`;
};

const html = `<title>Search Bake-off</title>
<style>
  :root { --bg:#fff; --fg:#12181f; --muted:#5a6672; --line:#e2e8ef; --hit:#e6f6ec; --hitline:#2f8f4e; --bad:#fdecec; --badline:#c0392b; --code:#f4f6f9; }
  :root:not([data-theme="light"]) { }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#0f1419; --fg:#e6edf3; --muted:#8b98a5; --line:#232c36; --hit:#12301d; --hitline:#3fa863; --bad:#3a1a19; --badline:#e06c65; --code:#161d25; } }
  :root[data-theme="dark"] { --bg:#0f1419; --fg:#e6edf3; --muted:#8b98a5; --line:#232c36; --hit:#12301d; --hitline:#3fa863; --bad:#3a1a19; --badline:#e06c65; --code:#161d25; }
  body { background:var(--bg); color:var(--fg); font:14px/1.5 ui-sans-serif,system-ui,sans-serif; margin:0; padding:24px; }
  h1 { font-size:20px; margin:0 0 4px; }
  p.sub { color:var(--muted); margin:0 0 20px; }
  .scroll { overflow-x:auto; }
  table { border-collapse:collapse; width:100%; min-width:900px; }
  th,td { border:1px solid var(--line); vertical-align:top; padding:10px; text-align:left; }
  thead th { position:sticky; top:0; background:var(--bg); z-index:1; }
  tbody th { width:200px; font-weight:400; }
  .q { font-weight:600; font-size:15px; }
  .bucket { color:var(--muted); font-size:12px; text-transform:uppercase; letter-spacing:.04em; margin-top:2px; }
  .note { color:var(--muted); font-size:12px; margin-top:6px; }
  .want { margin-top:6px; font-size:12px; }
  ol { margin:0; padding-left:0; list-style:none; }
  li { border-top:1px solid var(--line); padding:6px 0; }
  li:first-child { border-top:0; }
  .rank { display:inline-block; min-width:18px; color:var(--muted); font-variant-numeric:tabular-nums; }
  li.hit { background:var(--hit); box-shadow:inset 3px 0 0 var(--hitline); padding-left:6px; }
  code { background:var(--code); padding:1px 4px; border-radius:3px; font-size:12px; word-break:break-all; }
  .ex { display:block; color:var(--muted); font-size:12px; margin-top:3px; }
  .ex mark { background:transparent; color:var(--fg); font-weight:700; }
  .badge { display:inline-block; font-size:11px; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); margin-bottom:8px; }
  .badge.good { color:var(--hitline); font-weight:700; }
  .badge.bad { color:var(--badline); font-weight:700; }
</style>
<h1>Search bake-off — top 5 per engine</h1>
<p class="sub">${escape(relevance.ranAt)} · ${byId.size} queries · a green row is a URL the query was expected to return, written before the run.</p>
<div class="scroll"><table>
<thead><tr><th>Query</th>${keys.map((key) => `<th>${escape(labels[key])}</th>`).join('')}</tr></thead>
<tbody>${[...byId.values()].map(rowHtml).join('')}</tbody>
</table></div>`;

await writeFile(new URL('./report.html', RESULTS_DIR), html);

console.log(lines.join('\n'));
console.log(`\nwritten to results/report.md and results/report.html`);

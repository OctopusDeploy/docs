// Scores a traffic-weighted experiment.
//
// The standard report treats every query alike, which is right for a set built to
// probe behaviour. These sets are different: each query carries a visitor count,
// so the headline can be demand-weighted — of the traffic these terms represent,
// what share would search have served?
//
// Weighted rates are computed over the *scoreable* terms only. A set built from
// real search logs contains single keystrokes, keyboard mashes and unfinished
// words that have no target page at all; leaving them in the denominator would
// charge every engine for queries no engine could ever satisfy. They are reported
// separately, because whether an engine returns junk for junk still matters.
//
// IN_NAME    which relevance-*.json to read (default relevance-traffic)
// QUERY_SET  which query file supplies the weights

import { readFile, writeFile } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { scoreQuery, normalisePath } from './lib/score.mjs';
import { loadQueries } from './lib/queries.mjs';

const inName = process.env.IN_NAME ?? 'relevance-traffic';
const run = JSON.parse(
  await readFile(new URL(`./${inName}.json`, RESULTS_DIR), 'utf8')
);

const queries = await loadQueries();
const byId = new Map(queries.map((q) => [q.id, q]));
const labels = Object.fromEntries(TARGETS.map((t) => [t.key, t.label]));

const scoreable = queries.filter((q) => (q.expect ?? []).length > 0);
const unscoreable = queries.filter((q) => (q.expect ?? []).length === 0);
const scoreableWeight = scoreable.reduce((s, q) => s + (q.weight ?? 1), 0);
const unscoreableWeight = unscoreable.reduce((s, q) => s + (q.weight ?? 1), 0);

const pct = (n) => `${(n * 100).toFixed(0)}%`;
const rows = [];

for (const key of run.targets) {
  const all = run.runs
    .filter((r) => r.target === key && r.variant === 'full')
    .map((r) => ({
      ...scoreQuery({ id: r.id, bucket: r.bucket, expect: r.expect }, r),
      weight: byId.get(r.id)?.weight ?? 1,
    }));

  const judged = all.filter((r) => r.judged);
  const junk = all.filter((r) => !r.judged);

  const weighted = (rowsIn, predicate) =>
    rowsIn.filter(predicate).reduce((s, r) => s + r.weight, 0) /
    scoreableWeight;
  const plain = (rowsIn, predicate) =>
    rowsIn.length === 0 ? 0 : rowsIn.filter(predicate).length / rowsIn.length;

  rows.push({
    key,
    label: labels[key],
    judged,
    weightedAt1: weighted(judged, (r) => r.successAt1),
    weightedAt5: weighted(judged, (r) => r.successAt5),
    plainAt1: plain(judged, (r) => r.successAt1),
    plainAt5: plain(judged, (r) => r.successAt5),
    weightedMrr:
      judged.reduce((s, r) => s + r.reciprocalRank * r.weight, 0) /
      scoreableWeight,
    // For terms with no possible right answer, the only question is whether the
    // engine admits it has nothing.
    junkZeroRate: plain(junk, (r) => r.zeroResults),
    judgedZeroRate: plain(judged, (r) => r.zeroResults),
  });
}

console.log(
  `${inName} — ${queries.length} terms, ${scoreable.length} scoreable ` +
    `(${scoreableWeight} visitors), ${unscoreable.length} not scoreable (${unscoreableWeight} visitors)\n`
);
console.log(
  'engine'.padEnd(22) +
    'w-S@1'.padStart(7) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(8) +
    '   |  ' +
    'S@1'.padStart(5) +
    'S@5'.padStart(6) +
    '   |  ' +
    'zero real'.padStart(11) +
    'zero junk'.padStart(11)
);
for (const row of rows) {
  console.log(
    row.label.padEnd(22) +
      pct(row.weightedAt1).padStart(7) +
      pct(row.weightedAt5).padStart(7) +
      row.weightedMrr.toFixed(3).padStart(8) +
      '   |  ' +
      pct(row.plainAt1).padStart(5) +
      pct(row.plainAt5).padStart(6) +
      '   |  ' +
      pct(row.judgedZeroRate).padStart(11) +
      pct(row.junkZeroRate).padStart(11)
  );
}

console.log('\n--- Terms search cannot serve, heaviest first');
for (const row of rows) {
  const misses = row.judged
    .filter((r) => !r.successAt5)
    .sort((a, b) => b.weight - a.weight);
  const lost = misses.reduce((s, r) => s + r.weight, 0);
  console.log(
    `\n${row.label} — ${misses.length} of ${row.judged.length} terms, ${lost} of ${scoreableWeight} visitors (${pct(lost / scoreableWeight)})`
  );
  for (const miss of misses.slice(0, 10)) {
    const query = byId.get(miss.id);
    console.log(
      `  ${String(miss.weight).padStart(3)}  "${miss.query}"  wanted ${normalisePath(query.expect[0])}`
    );
    console.log(`       got ${miss.topFive[0]?.url ?? '(nothing)'}`);
  }
  if (misses.length > 10) console.log(`  … and ${misses.length - 10} more`);
}

console.log('\n--- Terms only one engine serves, heaviest first');
const perTerm = new Map();
for (const row of rows) {
  for (const entry of row.judged) {
    const seen = perTerm.get(entry.id) ?? {
      weight: entry.weight,
      query: entry.query,
      hits: {},
    };
    seen.hits[row.key] = entry.successAt5;
    perTerm.set(entry.id, seen);
  }
}
const unique = [...perTerm.entries()]
  .map(([id, seen]) => ({
    id,
    ...seen,
    winners: Object.entries(seen.hits)
      .filter(([, hit]) => hit)
      .map(([k]) => k),
  }))
  .filter((e) => e.winners.length === 1)
  .sort((a, b) => b.weight - a.weight);

for (const entry of unique.slice(0, 12)) {
  console.log(
    `  ${String(entry.weight).padStart(3)}  "${entry.query}"  only ${entry.winners[0]}`
  );
}
console.log(`  (${unique.length} terms served by exactly one engine)`);

await writeFile(
  new URL(`./${inName}-report.json`, RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      querySet: process.env.QUERY_SET ?? 'top-pages',
      scoreableTerms: scoreable.length,
      scoreableWeight,
      unscoreableTerms: unscoreable.length,
      unscoreableWeight,
      engines: rows.map(({ judged, ...rest }) => rest),
      uniqueReach: unique,
    },
    null,
    2
  )
);
console.log(
  `\nwritten to ${new URL(`./${inName}-report.json`, RESULTS_DIR).pathname}`
);

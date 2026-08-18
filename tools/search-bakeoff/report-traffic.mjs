// Scores the top-pages experiment, weighted by real traffic.
//
// The standard report treats every query alike, which is right for a query set
// built to probe behaviour. This set is different: each query stands for a page
// people actually visit, and the visitor count says how much that page matters.
// So the headline here is demand-weighted — of all the traffic these 98 pages
// receive, what share would search have been able to deliver?
//
// A 458-visitor page and a 56-visitor page are eight times apart in how much a
// miss costs, and an unweighted average hides that entirely.

import { readFile, writeFile } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { scoreQuery, normalisePath } from './lib/score.mjs';
import { loadQueries } from './lib/queries.mjs';

const run = JSON.parse(
  await readFile(new URL('./relevance-traffic.json', RESULTS_DIR), 'utf8')
);
const queries = await loadQueries();
const weightFor = new Map(queries.map((q) => [q.id, q.weight ?? 1]));
const labels = Object.fromEntries(TARGETS.map((t) => [t.key, t.label]));

const totalWeight = [...weightFor.values()].reduce((a, b) => a + b, 0);

const pct = (n) => `${(n * 100).toFixed(0)}%`;
const rows = [];

for (const key of run.targets) {
  const scored = run.runs
    .filter((r) => r.target === key && r.variant === 'full')
    .map((r) => ({
      ...scoreQuery({ id: r.id, bucket: r.bucket, expect: r.expect }, r),
      weight: weightFor.get(r.id) ?? 1,
    }));

  const weighted = (predicate) =>
    scored.filter(predicate).reduce((sum, r) => sum + r.weight, 0) /
    totalWeight;

  const plain = (predicate) => scored.filter(predicate).length / scored.length;

  rows.push({
    key,
    label: labels[key],
    scored,
    weightedAt1: weighted((r) => r.successAt1),
    weightedAt5: weighted((r) => r.successAt5),
    plainAt1: plain((r) => r.successAt1),
    plainAt5: plain((r) => r.successAt5),
    weightedMiss: weighted((r) => !r.successAt5),
    zero: plain((r) => r.zeroResults),
    // Weighted MRR: a page's rank matters in proportion to how many people want it.
    weightedMrr:
      scored.reduce((sum, r) => sum + r.reciprocalRank * r.weight, 0) /
      totalWeight,
  });
}

console.log(
  `Top-visited pages experiment — ${queries.length} pages, ${totalWeight} visitors\n`
);
console.log(
  'engine'.padEnd(22) +
    'w-S@1'.padStart(7) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(8) +
    '   |  ' +
    'S@1'.padStart(5) +
    'S@5'.padStart(6) +
    'zero'.padStart(7)
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
      pct(row.zero).padStart(7)
  );
}

// The misses ranked by the traffic behind them: the work list, in priority order.
console.log('\n--- Pages search cannot reach, heaviest traffic first');
for (const row of rows) {
  const misses = row.scored
    .filter((r) => !r.successAt5)
    .sort((a, b) => b.weight - a.weight);
  const lost = misses.reduce((sum, r) => sum + r.weight, 0);
  console.log(
    `\n${row.label} — ${misses.length} of ${row.scored.length} pages, ${lost} of ${totalWeight} visitors (${pct(lost / totalWeight)})`
  );
  for (const miss of misses.slice(0, 12)) {
    const query = queries.find((q) => q.id === miss.id);
    console.log(
      `  ${String(miss.weight).padStart(4)}  "${miss.query}"  wanted ${normalisePath(query.expect[0])}`
    );
    console.log(`        got ${miss.topFive[0]?.url ?? '(nothing)'}`);
  }
  if (misses.length > 12) console.log(`  … and ${misses.length - 12} more`);
}

// Where one engine reaches a page the others cannot — the clearest read on which
// engine would actually serve this traffic better.
console.log('\n--- Pages only one engine reaches (top five, by traffic)');
const byId = new Map();
for (const row of rows) {
  for (const entry of row.scored) {
    const seen = byId.get(entry.id) ?? {
      weight: entry.weight,
      query: entry.query,
      hits: {},
    };
    seen.hits[row.key] = entry.successAt5;
    byId.set(entry.id, seen);
  }
}
const unique = [...byId.entries()]
  .map(([id, seen]) => ({
    id,
    ...seen,
    winners: Object.entries(seen.hits)
      .filter(([, hit]) => hit)
      .map(([k]) => k),
  }))
  .filter((entry) => entry.winners.length === 1)
  .sort((a, b) => b.weight - a.weight);

for (const entry of unique.slice(0, 12)) {
  console.log(
    `  ${String(entry.weight).padStart(4)}  "${entry.query}"  only ${entry.winners[0]}`
  );
}
console.log(`  (${unique.length} pages reached by exactly one engine)`);

await writeFile(
  new URL('./traffic-report.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      source: 'top-pages.json',
      pages: queries.length,
      totalVisitors: totalWeight,
      engines: rows.map(({ scored, ...rest }) => rest),
      uniqueReach: unique,
    },
    null,
    2
  )
);
console.log(
  `\nwritten to ${new URL('./traffic-report.json', RESULTS_DIR).pathname}`
);

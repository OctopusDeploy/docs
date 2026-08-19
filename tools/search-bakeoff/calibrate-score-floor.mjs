// Where to put Pagefind's score floor, measured against every term in the log.
//
// Pagefind returns whatever shares a few letters with the query, ranked, with no
// signal that it found nothing worth showing. A floor fixes that only if genuine
// queries and nonsense actually separate by score, and only at a value measured
// rather than guessed.
//
// Calibrated on a fresh page with the shipped ranking and nothing else, because
// `options()` merges rather than replaces: a previous sweep's parameters survive
// into the next call and depress every score. That is how the first attempt at
// this landed on a threshold 45% too low, which sat just under the keyboard mash
// it was meant to catch and therefore did nothing at all.
//
// BASE       site to calibrate against, default the deployed Pagefind spike
// QUERY_SET  query file supplying the terms

import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';

const BASE = process.env.BASE ?? TARGETS.find((t) => t.key === 'pagefind').base;

// Whatever `search-engine-pagefind.ts` sets. Scores move with these, so the
// calibration is only valid for the configuration it was run under.
const SHIPPED_RANKING = { metaWeights: { title: 8, trail: 0.5 } };

const queries = await loadQueries();
const real = queries.filter((q) => (q.expect ?? []).length > 0);
const unscoreable = queries.filter((q) => (q.expect ?? []).length === 0);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });

const scoresFor = async (terms) =>
  page.evaluate(
    async ({ base, list, ranking }) => {
      const pf = await import(`${base}pagefind/pagefind.js`);
      await pf.options({ basePath: `${base}pagefind/`, ranking });
      const out = [];
      for (const term of list) {
        const found = await pf.search(term);
        out.push({
          term,
          score: found.results[0]?.score ?? null,
          count: found.results.length,
        });
      }
      return out;
    },
    { base: BASE, list: terms.map((q) => q.query), ranking: SHIPPED_RANKING }
  );

const realScores = await scoresFor(real);
const junkScores = await scoresFor(unscoreable);
await browser.close();

// A query that already returns nothing needs no floor, so it says nothing about
// where the floor belongs.
const realWith = realScores.filter((r) => r.score !== null);
const junkWith = junkScores.filter((r) => r.score !== null);

const weakestReal = [...realWith].sort((a, b) => a.score - b.score);
const strongestJunk = [...junkWith].sort((a, b) => b.score - a.score);

console.log(`real terms with results:  ${realWith.length} of ${real.length}`);
console.log(
  `unscoreable with results: ${junkWith.length} of ${unscoreable.length}\n`
);

console.log('weakest genuine queries:');
for (const row of weakestReal.slice(0, 8)) {
  console.log(`  ${row.score.toFixed(2).padStart(8)}  ${row.term}`);
}
console.log('\nstrongest unscoreable terms:');
for (const row of strongestJunk.slice(0, 8)) {
  console.log(`  ${row.score.toFixed(2).padStart(8)}  ${row.term}`);
}

console.log('\nfloor   real lost   nonsense suppressed');
for (const floor of [0, 5, 6, 7, 8, 9, 10, 12, 15]) {
  const lost = realWith.filter((r) => r.score < floor);
  const killed = junkWith.filter((r) => r.score < floor);
  const cost = lost.length
    ? `   costs: ${lost.map((l) => l.term).join(', ')}`
    : '';
  console.log(
    `${String(floor).padStart(5)}   ${String(lost.length).padStart(9)}   ${String(killed.length).padStart(20)}${cost}`
  );
}

console.log(
  '\nPick the highest floor that costs nothing real. Anything above the weakest' +
    '\ngenuine query starts throwing away answers people wanted.'
);

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./score-floor.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      base: BASE,
      ranking: SHIPPED_RANKING,
      realScores,
      junkScores,
    },
    null,
    2
  )
);

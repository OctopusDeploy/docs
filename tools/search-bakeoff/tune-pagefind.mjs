// Sweeps Pagefind's ranking parameters against the already-deployed index.
//
// Pagefind's `ranking` is a client-side option, so a candidate configuration can
// be tried against the live bundle without rebuilding or redeploying anything.
// That turns a 10-minute deploy cycle per guess into one run over the whole
// sweep, and only the winner gets committed to `search-engine-pagefind.ts`.
//
// This talks to the Pagefind API directly rather than through the overlay,
// because the overlay has no way to pass ranking options in.

import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { scoreQuery, summarise, summariseBy } from './lib/score.mjs';

const target = TARGETS.find((entry) => entry.key === 'pagefind');

// `pageLength` is the parameter the round-one failures point at: the REST API
// example pages are short, and at the 0.75 default that is most of why they take
// rank 1 from the product pages. `termSimilarity` is the other candidate — it
// suppresses pages ranking for long extensions of the query, which is the same
// failure seen from a different angle.
const CONFIGS = [
  { name: 'default (pageLength 0.75)', ranking: null },
  { name: 'pageLength 0.4', ranking: { pageLength: 0.4 } },
  { name: 'pageLength 0.2', ranking: { pageLength: 0.2 } },
  { name: 'pageLength 0.0', ranking: { pageLength: 0.0 } },
  {
    name: 'pageLength 0.2 + termSimilarity 1.5',
    ranking: { pageLength: 0.2, termSimilarity: 1.5 },
  },
  {
    name: 'pageLength 0.0 + termSimilarity 2.0',
    ranking: { pageLength: 0.0, termSimilarity: 2.0 },
  },
];

const queries = await loadQueries();
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();

await page.goto(target.base, {
  waitUntil: 'domcontentloaded',
  timeout: 60_000,
});

// Loaded once and reconfigured per sweep. Pagefind applies `options` to every
// subsequent search, so the module does not need reimporting.
await page.evaluate(async (base) => {
  window.__pagefind = await import(`${base}pagefind/pagefind.js`);
  await window.__pagefind.options({ basePath: `${base}pagefind/` });
  await window.__pagefind.filters();
}, target.base);

const sweep = [];

for (const config of CONFIGS) {
  if (config.ranking) {
    await page.evaluate(
      (ranking) => window.__pagefind.options({ ranking }),
      config.ranking
    );
  }

  const runs = [];
  for (const query of queries) {
    const results = await page.evaluate(async (term) => {
      const response = await window.__pagefind.search(term);
      const top = await Promise.all(
        response.results.slice(0, 5).map((stub) => stub.data())
      );
      return top.map((fragment) => ({
        url: fragment.url,
        title: fragment.meta?.title ?? '',
        excerptHtml: fragment.excerpt ?? '',
        excerpt: fragment.excerpt ?? '',
      }));
    }, query.query);

    runs.push({ query, run: { query: query.query, variant: 'full', results } });
  }

  const scored = runs.map(({ query, run }) => scoreQuery(query, run));
  const summary = summarise(scored);
  const byBucket = summariseBy(scored, 'bucket');

  sweep.push({
    config: config.name,
    ranking: config.ranking,
    summary,
    byBucket,
    scored,
  });

  // Ambiguity is called out per config because it is the bucket these
  // parameters were expected to move, and the one that shows they do not.
  console.log(
    `${config.name.padEnd(38)} S@1 ${(summary.successAt1 * 100).toFixed(0)}%  ` +
      `S@5 ${(summary.successAt5 * 100).toFixed(0)}%  ` +
      `MRR ${summary.mrr.toFixed(3)}  ` +
      `ambiguity@5 ${((byBucket.ambiguity?.successAt5 ?? 0) * 100).toFixed(0)}%`
  );
}

await browser.close();

// Ranked so the winner is the first thing in the file as well as the last line
// printed.
const ranked = [...sweep].sort(
  (a, b) =>
    b.summary.successAt5 - a.summary.successAt5 || b.summary.mrr - a.summary.mrr
);

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./pagefind-tuning.json', RESULTS_DIR),
  JSON.stringify({ ranAt: new Date().toISOString(), ranked }, null, 2)
);

console.log('\nbest by Success@5:');
for (const entry of ranked.slice(0, 3)) {
  console.log(
    `  ${entry.config.padEnd(38)} S@1 ${(entry.summary.successAt1 * 100).toFixed(0)}%  ` +
      `S@5 ${(entry.summary.successAt5 * 100).toFixed(0)}%  ` +
      `ambiguity@5 ${((entry.byBucket.ambiguity?.successAt5 ?? 0) * 100).toFixed(0)}%`
  );
}

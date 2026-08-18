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

// Not a shippable configuration. Restricting to the `docs` section removes the
// REST API examples from contention entirely, which bounds how much of
// Pagefind's ambiguity failure is those pages competing rather than its ranking
// being wrong. If this run scores well, `data-pagefind-weight` on the examples
// tree can recover most of it; if it does not, weighting will not help either.
const DIAGNOSTIC = {
  name: 'diagnostic: docs section only',
  ranking: null,
  filters: { section: ['docs'] },
};

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

for (const config of [...CONFIGS, DIAGNOSTIC]) {
  if (config.ranking) {
    await page.evaluate(
      (ranking) => window.__pagefind.options({ ranking }),
      config.ranking
    );
  }

  const runs = [];
  let withSubResults = 0;

  for (const query of queries) {
    const response = await page.evaluate(
      async ({ term, filters }) => {
        const found = await window.__pagefind.search(
          term,
          filters ? { filters } : undefined
        );
        const top = await Promise.all(
          found.results.slice(0, 5).map((stub) => stub.data())
        );
        return {
          // Whether Pagefind is returning heading-scoped sub-results with
          // anchors. The engine ignores them today, so this is the only place
          // that records they exist.
          subResults: top.reduce(
            (total, fragment) => total + (fragment.sub_results?.length ?? 0),
            0
          ),
          results: top.map((fragment) => ({
            url: fragment.url,
            title: fragment.meta?.title ?? '',
            excerptHtml: fragment.excerpt ?? '',
            excerpt: fragment.excerpt ?? '',
          })),
        };
      },
      { term: query.query, filters: config.filters ?? null }
    );

    if (response.subResults > 0) withSubResults += 1;

    runs.push({
      query,
      run: { query: query.query, variant: 'full', results: response.results },
    });
  }

  const scored = runs.map(({ query, run }) => scoreQuery(query, run));
  const summary = summarise(scored);
  const byBucket = summariseBy(scored, 'bucket');

  sweep.push({
    config: config.name,
    ranking: config.ranking,
    filters: config.filters ?? null,
    queriesWithSubResults: withSubResults,
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
      `ambiguity@5 ${((byBucket.ambiguity?.successAt5 ?? 0) * 100).toFixed(0)}%  ` +
      `sub-results on ${withSubResults}/${queries.length} queries`
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

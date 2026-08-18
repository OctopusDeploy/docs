// Sweeps Pagefind's metaWeights against a weighted query set.
//
// Metadata fields are searchable, and matches in them are boosted: `title` gets
// 5x by default and everything else 1x. That default was never checked here, and
// this site adds a `trail` field carrying the breadcrumb, which is searchable too
// and currently counts for as little as body text.
//
// Run with the engine's own reorder applied, because that is what ships — tuning
// against raw score order would optimise something nobody sees.
//
// BASE       site to test (default the local static server)
// QUERY_SET  query file supplying terms and weights

import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { normalisePath } from './lib/score.mjs';

const BASE = process.env.BASE ?? 'http://127.0.0.1:8899/docs/';
const POOL = 30;
const DEPTH_PENALTY = 0.12;

// `title` is the lever with real range. `trail` is included because boosting it
// is the cheap way to make a section's own pages findable by their section name,
// and lowering it is the cheap way to stop breadcrumbs matching everything.
const CONFIGS = {
  'default (title 5)': null,
  'title 8': { title: 8 },
  'title 10': { title: 10 },
  'title 3': { title: 3 },
  'title 8, trail 3': { title: 8, trail: 3 },
  'title 8, trail 0.5': { title: 8, trail: 0.5 },
  'title 10, trail 3': { title: 10, trail: 3 },
};

const queries = (await loadQueries()).filter(
  (q) => (q.expect ?? []).length > 0
);
const totalWeight = queries.reduce((s, q) => s + (q.weight ?? 1), 0);

const comparable = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const segmentsOf = (url) => normalisePath(url).split('/').filter(Boolean);

/** Mirrors `byNameThenDepth` in search-engine-pagefind.ts. */
function reorder(hits, term) {
  const wanted = comparable(term);
  const discounted = (hit) =>
    hit.score / (1 + DEPTH_PENALTY * segmentsOf(hit.url).length);
  const names = (hit) => {
    const slug = segmentsOf(hit.url).pop() ?? '';
    return comparable(hit.title) === wanted ||
      comparable(slug.replace(/-/g, ' ')) === wanted
      ? 1
      : 0;
  };
  return [...hits].sort(
    (a, b) => names(b) - names(a) || discounted(b) - discounted(a)
  );
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.evaluate(async (base) => {
  window.__pf = await import(`${base}pagefind/pagefind.js`);
  await window.__pf.options({ basePath: `${base}pagefind/` });
  await window.__pf.filters();
}, BASE);

const rows = [];

for (const [name, metaWeights] of Object.entries(CONFIGS)) {
  await page.evaluate(
    (weights) =>
      window.__pf.options({ ranking: weights ? { metaWeights: weights } : {} }),
    metaWeights
  );

  let at1 = 0;
  let at5 = 0;
  let mrr = 0;

  for (const query of queries) {
    const hits = await page.evaluate(
      async ({ term, pool }) => {
        const response = await window.__pf.search(term);
        const top = response.results.slice(0, pool);
        const fragments = await Promise.all(top.map((s) => s.data()));
        return top.map((stub, at) => ({
          score: stub.score,
          url: new URL(fragments[at].url, location.origin).pathname,
          title: fragments[at].meta?.title ?? '',
        }));
      },
      { term: query.query, pool: POOL }
    );

    const wanted = new Set(query.expect.map(normalisePath));
    const ordered = reorder(hits, query.query);
    // A page and its own headings are one result; anchors are not returned here,
    // but dedupe anyway so the number matches the harness.
    const seen = new Set();
    const pages = ordered.filter((hit) => {
      const path = normalisePath(hit.url);
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    });

    const rank =
      pages.findIndex((hit) => wanted.has(normalisePath(hit.url))) + 1;
    const weight = query.weight ?? 1;
    if (rank === 1) at1 += weight;
    if (rank >= 1 && rank <= 5) at5 += weight;
    if (rank >= 1) mrr += (1 / rank) * weight;
  }

  rows.push({
    config: name,
    metaWeights,
    weightedAt1: at1 / totalWeight,
    weightedAt5: at5 / totalWeight,
    weightedMrr: mrr / totalWeight,
  });
}

await browser.close();

const pct = (n) => `${(n * 100).toFixed(0)}%`.padStart(5);
console.log(
  `${queries.length} scoreable terms, ${totalWeight} visitors, set "${process.env.QUERY_SET ?? 'curated+head'}"\n`
);
console.log(
  'metaWeights'.padEnd(24) +
    'w-S@1'.padStart(6) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(9)
);
for (const row of rows) {
  console.log(
    row.config.padEnd(24) +
      pct(row.weightedAt1) +
      pct(row.weightedAt5).padStart(7) +
      row.weightedMrr.toFixed(3).padStart(9)
  );
}

const best = [...rows].sort(
  (a, b) => b.weightedAt5 - a.weightedAt5 || b.weightedMrr - a.weightedMrr
)[0];
console.log(`\nbest: ${best.config}`);

await writeFile(
  new URL('./pagefind-metaweights.json', RESULTS_DIR),
  JSON.stringify({ ranAt: new Date().toISOString(), base: BASE, rows }, null, 2)
);

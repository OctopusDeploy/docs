// Does the landing-page fix that transformed Orama also work for Pagefind?
//
// Orama went from 54% to 80% weighted Success@5 on real search terms once hits
// were reordered to prefer a page the query names and to discount depth. Pagefind
// has the same defect — `variables` returns an API example, `tentacle` returns the
// CLI reference — and it was never tested there. This closes that gap.
//
// An earlier diagnostic filtered every competing API and CLI page out of
// contention and reached only 61% Success@5, which was read as a ceiling. That
// diagnostic removed *competitors*; it never tried promoting landing pages, so it
// bounded the wrong thing.
//
// Pagefind's result stub carries `score` but no URL — only a content hash — so a
// depth-aware reorder needs each fragment fetched first. That costs nothing extra
// in practice: `search-engine-pagefind.ts` already fetches a fragment for each of
// the 30 results it shows, so reordering those same 30 is free.
//
// The limit it does impose is reach. Reordering happens inside the top 30 by raw
// score, so a landing page sitting at rank 31 cannot be promoted at all, where the
// Orama worker reorders 200. Baking the same preference into
// `data-pagefind-weight` at index time would not have that ceiling, and is the
// better production fix — it needs a rebuild, so it is untested here.
//
// QUERY_SET  query file supplying terms and weights (default curated+head)

import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { normalisePath } from './lib/score.mjs';

const target = TARGETS.find((entry) => entry.key === 'pagefind');
// Deep enough that a buried landing page can be promoted, shallow enough that the
// fragment fetches stay reasonable.
const POOL = 30;

const queries = (await loadQueries()).filter(
  (q) => (q.expect ?? []).length > 0
);
const totalWeight = queries.reduce((s, q) => s + (q.weight ?? 1), 0);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(target.base, {
  waitUntil: 'domcontentloaded',
  timeout: 60_000,
});

await page.evaluate(async (base) => {
  window.__pf = await import(`${base}pagefind/pagefind.js`);
  await window.__pf.options({ basePath: `${base}pagefind/` });
  await window.__pf.filters();
}, target.base);

// Retrieve once per query; every strategy below reorders the same hits.
const retrieved = [];
for (const query of queries) {
  const hits = await page.evaluate(
    async ({ term, pool }) => {
      const response = await window.__pf.search(term);
      const top = response.results.slice(0, pool);
      const fragments = await Promise.all(top.map((stub) => stub.data()));
      return top.map((stub, at) => ({
        score: stub.score,
        url: fragments[at].url,
        title: fragments[at].meta?.title ?? '',
      }));
    },
    { term: query.query, pool: POOL }
  );
  retrieved.push({ query, hits });
}

await browser.close();

const comparable = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const segmentsOf = (url) => normalisePath(url).split('/').filter(Boolean);

// Mirrors what shipped in orama-worker.ts, so the two engines are given the same
// help rather than different help.
const DEPTH_PENALTY = 0.12;
const discounted = (hit) =>
  hit.score / (1 + DEPTH_PENALTY * segmentsOf(hit.url).length);

const strategies = {
  none: (hits) => hits,

  depthDecay: (hits) => [...hits].sort((a, b) => discounted(b) - discounted(a)),

  nameThenDepth: (hits, term) => {
    const wanted = comparable(term);
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
  },
};

const pct = (n) => `${(n * 100).toFixed(0)}%`.padStart(5);
const rows = [];

for (const [name, reorder] of Object.entries(strategies)) {
  let at1 = 0;
  let at5 = 0;
  let mrr = 0;

  for (const { query, hits } of retrieved) {
    const wanted = new Set(query.expect.map(normalisePath));
    const ordered = reorder(hits, query.query);
    const rank =
      ordered.findIndex((hit) => wanted.has(normalisePath(hit.url))) + 1;
    const weight = query.weight ?? 1;

    if (rank === 1) at1 += weight;
    if (rank >= 1 && rank <= 5) at5 += weight;
    if (rank >= 1) mrr += (1 / rank) * weight;
  }

  rows.push({
    strategy: name,
    weightedAt1: at1 / totalWeight,
    weightedAt5: at5 / totalWeight,
    weightedMrr: mrr / totalWeight,
  });
}

console.log(
  `Pagefind re-rank — ${queries.length} scoreable terms, ${totalWeight} visitors, ` +
    `set "${process.env.QUERY_SET ?? 'curated+head (default)'}", top ${POOL} reordered\n`
);
console.log(
  'strategy'.padEnd(18) +
    'w-S@1'.padStart(6) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(9)
);
for (const row of rows) {
  console.log(
    row.strategy.padEnd(18) +
      pct(row.weightedAt1) +
      pct(row.weightedAt5).padStart(7) +
      row.weightedMrr.toFixed(3).padStart(9)
  );
}

await writeFile(
  new URL('./pagefind-rerank.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      querySet: process.env.QUERY_SET ?? 'curated+head',
      pool: POOL,
      totalWeight,
      rows,
    },
    null,
    2
  )
);

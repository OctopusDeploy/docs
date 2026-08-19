// How small can the fetched result pool get before relevance suffers?
//
// The engine fetches a fragment for each of the 30 results it might show, and
// that tail of fetches is where its keystroke stalls come from: p95 goes from
// 149ms at zero fragments to 587ms at thirty. Pagefind's own Component UI avoids
// it by loading a result's data only when the row scrolls into view.
//
// The obstacle is the reorder, which needs a URL and title and therefore a
// fragment. Fetching fewer shrinks the pool it can promote a landing page out of.
// This measures what that costs by reordering only the leading N of a full fetch,
// which is exactly what a smaller limit would do.

import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { normalisePath } from './lib/score.mjs';

const BASE = process.env.BASE ?? TARGETS.find((t) => t.key === 'pagefind').base;
const POOLS = [5, 8, 10, 15, 20, 30];
const DEPTH_PENALTY = 0.12;

const queries = (await loadQueries()).filter(
  (q) => (q.expect ?? []).length > 0
);
const totalWeight = queries.reduce((s, q) => s + (q.weight ?? 1), 0);

const comparable = (t) =>
  String(t ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const segs = (u) => normalisePath(u).split('/').filter(Boolean);

function reorder(hits, term) {
  const wanted = comparable(term);
  const disc = (h) => h.score / (1 + DEPTH_PENALTY * segs(h.url).length);
  const names = (h) =>
    comparable(h.title) === wanted ||
    comparable((segs(h.url).pop() ?? '').replace(/-/g, ' ')) === wanted
      ? 1
      : 0;
  return [...hits].sort((a, b) => names(b) - names(a) || disc(b) - disc(a));
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.evaluate(async (base) => {
  window.__pf = await import(`${base}pagefind/pagefind.js`);
  await window.__pf.options({
    basePath: `${base}pagefind/`,
    ranking: { metaWeights: { title: 8, trail: 0.5 } },
  });
  await window.__pf.filters();
}, BASE);

// Fetch the full pool once per query; the pools below are prefixes of it.
const captured = [];
for (const query of queries) {
  const hits = await page.evaluate(async (t) => {
    const found = await window.__pf.search(t);
    const top = found.results.slice(0, 30);
    const frags = await Promise.all(top.map((s) => s.data()));
    return top.map((stub, at) => ({
      score: stub.score,
      url: new URL(frags[at].url, location.origin).pathname,
      title: frags[at].meta?.title ?? '',
    }));
  }, query.query);
  captured.push({ query, hits });
}
await browser.close();

const rows = [];
for (const pool of POOLS) {
  let at1 = 0;
  let at5 = 0;
  let mrr = 0;

  for (const { query, hits } of captured) {
    const wanted = new Set(query.expect.map(normalisePath));
    const seen = new Set();
    const pages = reorder(hits.slice(0, pool), query.query).filter((h) => {
      const path = normalisePath(h.url);
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    });
    const rank = pages.findIndex((h) => wanted.has(normalisePath(h.url))) + 1;
    const w = query.weight ?? 1;
    if (rank === 1) at1 += w;
    if (rank >= 1 && rank <= 5) at5 += w;
    if (rank >= 1) mrr += (1 / rank) * w;
  }

  rows.push({
    pool,
    weightedAt1: at1 / totalWeight,
    weightedAt5: at5 / totalWeight,
    weightedMrr: mrr / totalWeight,
  });
}

const pct = (n) => `${(n * 100).toFixed(0)}%`.padStart(6);
console.log(
  `${queries.length} scoreable terms, set "${process.env.QUERY_SET ?? 'curated+head'}"\n`
);
console.log(
  'pool'.padEnd(8) +
    'w-S@1'.padStart(7) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(9)
);
for (const r of rows) {
  console.log(
    String(r.pool).padEnd(8) +
      pct(r.weightedAt1) +
      pct(r.weightedAt5) +
      r.weightedMrr.toFixed(3).padStart(9)
  );
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./pagefind-pool-size.json', RESULTS_DIR),
  JSON.stringify({ ranAt: new Date().toISOString(), base: BASE, rows }, null, 2)
);

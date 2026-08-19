// The Pagefind ranking parameters that were never swept, plus a score floor.
//
// An earlier sweep covered `pageLength` and `termSimilarity` and found the
// defaults already best. It did not touch `termFrequency`, `termSaturation` or
// `diacriticSimilarity`, and `metaWeights` was tuned separately. This closes that
// gap, and tests the one idea that could fix Pagefind's habit of answering
// nonsense confidently: dropping results that score far below the top hit.
//
// Runs with the engine's own name-then-depth reorder and its shipped metaWeights,
// because that is what a change would land on top of.
//
// BASE       site to test, default the deployed Pagefind spike
// QUERY_SET  query file supplying terms and weights

import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { normalisePath } from './lib/score.mjs';

const BASE = process.env.BASE ?? TARGETS.find((t) => t.key === 'pagefind').base;
const POOL = 30;
const DEPTH_PENALTY = 0.12;
const SHIPPED_META = { title: 8, trail: 0.5 };

// One parameter at a time, then the combinations worth trying. Ranges are the
// documented ones: termFrequency and diacriticSimilarity 0–1, termSaturation 0–2.
const CONFIGS = {
  shipped: {},
  'termFrequency 0.6': { termFrequency: 0.6 },
  'termFrequency 0.3': { termFrequency: 0.3 },
  'termSaturation 1.0': { termSaturation: 1.0 },
  'termSaturation 1.8': { termSaturation: 1.8 },
  'diacriticSimilarity 0.5': { diacriticSimilarity: 0.5 },
  'diacriticSimilarity 1.0': { diacriticSimilarity: 1.0 },
  'termFreq 0.6 + termSat 1.0': { termFrequency: 0.6, termSaturation: 1.0 },
};

const queries = await loadQueries();
const scoreable = queries.filter((q) => (q.expect ?? []).length > 0);
const junk = queries.filter((q) => (q.expect ?? []).length === 0);
const totalWeight = scoreable.reduce((s, q) => s + (q.weight ?? 1), 0);

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
  await window.__pf.options({ basePath: `${base}pagefind/` });
  await window.__pf.filters();
}, BASE);

const fetchTop = async (term) =>
  page.evaluate(
    async ({ t, pool }) => {
      const r = await window.__pf.search(t);
      const top = r.results.slice(0, pool);
      const frags = await Promise.all(top.map((s) => s.data()));
      return top.map((stub, at) => ({
        score: stub.score,
        url: new URL(frags[at].url, location.origin).pathname,
        title: frags[at].meta?.title ?? '',
      }));
    },
    { t: term, pool: POOL }
  );

const rows = [];

for (const [name, ranking] of Object.entries(CONFIGS)) {
  await page.evaluate(
    (r) =>
      window.__pf.options({
        ranking: { ...r, metaWeights: { title: 8, trail: 0.5 } },
      }),
    ranking
  );

  let at1 = 0;
  let at5 = 0;
  let mrr = 0;

  for (const query of scoreable) {
    const hits = await fetchTop(query.query);
    const wanted = new Set(query.expect.map(normalisePath));
    const seen = new Set();
    const pages = reorder(hits, query.query).filter((h) => {
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
    config: name,
    ranking,
    weightedAt1: at1 / totalWeight,
    weightedAt5: at5 / totalWeight,
    weightedMrr: mrr / totalWeight,
  });
}

const pct = (n) => `${(n * 100).toFixed(0)}%`.padStart(5);
console.log(
  `${scoreable.length} scoreable terms, ${totalWeight} visitors, set "${process.env.QUERY_SET ?? 'curated+head'}"\n`
);
console.log(
  'ranking'.padEnd(30) +
    'w-S@1'.padStart(6) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(9)
);
for (const r of rows) {
  console.log(
    r.config.padEnd(30) +
      pct(r.weightedAt1) +
      pct(r.weightedAt5).padStart(7) +
      r.weightedMrr.toFixed(3).padStart(9)
  );
}

// --- Score floor -----------------------------------------------------------
// Is there a gap between what a real query scores and what nonsense scores? If
// there is, dropping results below a fraction of some reference kills the
// invented answers without touching the real ones.
await page.evaluate(() =>
  window.__pf.options({ ranking: { metaWeights: { title: 8, trail: 0.5 } } })
);

const topScore = async (term) => (await fetchTop(term))[0]?.score ?? null;

const realScores = [];
for (const q of scoreable.slice(0, 25)) {
  const s = await topScore(q.query);
  if (s !== null) realScores.push({ term: q.query, score: s });
}
const junkScores = [];
for (const q of junk) {
  const s = await topScore(q.query);
  junkScores.push({ term: q.query, score: s });
}

await browser.close();

const nums = (a) =>
  a
    .map((x) => x.score)
    .filter((x) => x !== null)
    .sort((a, b) => a - b);
const realNums = nums(realScores);
const junkNums = nums(junkScores);
const at = (arr, f) =>
  arr[Math.min(arr.length - 1, Math.floor(f * arr.length))];

console.log('\n--- top-result score: real queries vs unscoreable ones');
console.log(
  `  real  n=${realNums.length}  min ${realNums[0]?.toFixed(1)}  p10 ${at(realNums, 0.1)?.toFixed(1)}  median ${at(realNums, 0.5)?.toFixed(1)}  max ${realNums.at(-1)?.toFixed(1)}`
);
console.log(
  `  junk  n=${junkNums.length}  min ${junkNums[0]?.toFixed(1)}  median ${at(junkNums, 0.5)?.toFixed(1)}  p90 ${at(junkNums, 0.9)?.toFixed(1)}  max ${junkNums.at(-1)?.toFixed(1)}`
);
console.log('\n  highest-scoring unscoreable terms:');
for (const j of [...junkScores]
  .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  .slice(0, 8)) {
  console.log(
    `    ${String(j.score?.toFixed(1) ?? '-').padStart(7)}  ${j.term}`
  );
}
console.log('\n  lowest-scoring real terms:');
for (const r of [...realScores].sort((a, b) => a.score - b.score).slice(0, 8)) {
  console.log(`    ${r.score.toFixed(1).padStart(7)}  ${r.term}`);
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./pagefind-ranking2.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      base: BASE,
      rows,
      realScores,
      junkScores,
    },
    null,
    2
  )
);

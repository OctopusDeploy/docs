// Sweeps Orama's ranking against a weighted query set, without a deploy.
//
// The bake-off compared an untuned Orama against a legacy engine carrying years
// of hand-tuned field weighting. Pagefind's ranking parameters were swept and
// found to be already optimal; Orama's field boosts never were. This closes that
// gap.
//
// Two kinds of change are tested. Field boosts are passed straight to `search`.
// The re-rank strategies are applied to the returned hits, which is where a real
// fix would live too — `search-engine-orama.ts` already post-processes hits, so
// none of this needs a different index.
//
// The defect being aimed at: a bare section name returns a page from inside the
// section rather than the section's own landing page. `variables` returns
// system-variables, `tentacle` returns tentacle/linux. It is the single largest
// source of missed traffic on every engine measured.
//
// ORAMA_PACKAGE   file:// URL for the ESM entry point, when not installed
// QUERY_SET       query file supplying terms and weights (default real-searches)

import { readFile, writeFile } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import { normalisePath } from './lib/score.mjs';

const { create, load, search } = await import(
  process.env.ORAMA_PACKAGE ?? '@orama/orama'
).catch(() => {
  console.error('set ORAMA_PACKAGE to a file:// URL for @orama/orama');
  process.exit(1);
});

const target = TARGETS.find((entry) => entry.key === 'orama');
const CACHE = new URL('./orama-index.cache.json', RESULTS_DIR);

const SCHEMA = {
  url: 'string',
  title: 'string',
  description: 'string',
  body: 'string',
  trail: 'string',
  section: 'enum',
};
const TOKENIZER = { stemming: true, language: 'english' };
// Ask for plenty, because every re-rank strategy reorders what came back. The
// shipped engine asks for 200.
const POOL = 200;

async function indexJson() {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  console.log(`fetching ${target.payloadUrls[0]}`);
  const body = await fetch(target.payloadUrls[0]).then((r) => r.text());
  await writeFile(CACHE, body);
  return JSON.parse(body);
}

const raw = await indexJson();
const queries = (await loadQueries()).filter(
  (q) => (q.expect ?? []).length > 0
);
const totalWeight = queries.reduce((s, q) => s + (q.weight ?? 1), 0);

const depthOf = (url) => normalisePath(url).split('/').filter(Boolean).length;
const slugOf = (url) =>
  normalisePath(url).split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? '';
const normalise = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// --- Re-rank strategies -----------------------------------------------------
// Each takes Orama's hits and the query, and returns a reordered list. Applied
// after retrieval, so they cost nothing at index time.

const rerankers = {
  none: (hits) => hits,

  // A page whose title is the query is almost certainly the page wanted.
  exactTitle: (hits, query) => {
    const q = normalise(query);
    return [...hits].sort(
      (a, b) =>
        (normalise(b.document.title) === q ? 1 : 0) -
          (normalise(a.document.title) === q ? 1 : 0) || b.score - a.score
    );
  },

  // Same idea via the URL, which catches `/docs/runbooks` for `runbooks` even
  // when the title is "Runbooks and automation" or similar.
  exactTitleOrSlug: (hits, query) => {
    const q = normalise(query);
    const exact = (hit) =>
      normalise(hit.document.title) === q ||
      normalise(slugOf(hit.document.url)) === q
        ? 1
        : 0;
    return [...hits].sort((a, b) => exact(b) - exact(a) || b.score - a.score);
  },

  // Shallower pages win ties. A section landing page is always shallower than
  // anything inside it, so this addresses the defect directly without needing to
  // recognise the query at all.
  shallowFirst: (hits) =>
    [...hits].sort(
      (a, b) =>
        b.score - a.score || depthOf(a.document.url) - depthOf(b.document.url)
    ),

  // Depth as a score multiplier rather than a tiebreak, so a shallow page can
  // overtake a slightly better-scoring deep one.
  depthDecay: (hits) =>
    [...hits]
      .map((hit) => ({
        ...hit,
        adjusted: hit.score / (1 + 0.12 * depthOf(hit.document.url)),
      }))
      .sort((a, b) => b.adjusted - a.adjusted),

  // Both signals: an exact name wins outright, otherwise depth-adjusted score.
  exactThenDepth: (hits, query) => {
    const q = normalise(query);
    const exact = (hit) =>
      normalise(hit.document.title) === q ||
      normalise(slugOf(hit.document.url)) === q
        ? 1
        : 0;
    return [...hits]
      .map((hit) => ({
        ...hit,
        adjusted: hit.score / (1 + 0.12 * depthOf(hit.document.url)),
      }))
      .sort((a, b) => exact(b) - exact(a) || b.adjusted - a.adjusted);
  },
};

// --- Configurations ---------------------------------------------------------

const BOOSTS = {
  'shipped (t4 d2 tr2 b1)': { title: 4, description: 2, trail: 2, body: 1 },
  'title 8': { title: 8, description: 2, trail: 2, body: 1 },
  'title 16': { title: 16, description: 2, trail: 2, body: 1 },
  'title 8, body 0.5': { title: 8, description: 2, trail: 2, body: 0.5 },
};

const db = create({
  schema: SCHEMA,
  sort: { enabled: false },
  components: { tokenizer: TOKENIZER },
});
load(db, raw);

const results = [];

for (const [boostName, boost] of Object.entries(BOOSTS)) {
  // Retrieval is identical for every re-ranker at a given boost, so search once
  // and reorder the same hits repeatedly.
  const retrieved = [];
  for (const query of queries) {
    const response = await search(db, {
      term: query.query,
      limit: POOL,
      boost,
      tolerance: 1,
    });
    retrieved.push({ query, hits: response.hits });
  }

  for (const [rerankName, rerank] of Object.entries(rerankers)) {
    let hit1 = 0;
    let hit5 = 0;
    let mrr = 0;

    for (const { query, hits } of retrieved) {
      const wanted = new Set(query.expect.map(normalisePath));
      const ordered = rerank(hits, query.query).slice(0, 30);
      const rank =
        ordered.findIndex((hit) =>
          wanted.has(normalisePath(hit.document.url))
        ) + 1;
      const weight = query.weight ?? 1;

      if (rank === 1) hit1 += weight;
      if (rank >= 1 && rank <= 5) hit5 += weight;
      if (rank >= 1) mrr += (1 / rank) * weight;
    }

    results.push({
      boost: boostName,
      rerank: rerankName,
      weightedAt1: hit1 / totalWeight,
      weightedAt5: hit5 / totalWeight,
      weightedMrr: mrr / totalWeight,
    });
  }
}

const pct = (n) => `${(n * 100).toFixed(0)}%`.padStart(5);
console.log(
  `${queries.length} scoreable terms, ${totalWeight} visitors, set "${process.env.QUERY_SET ?? 'curated+head (default)'}"\n`
);
console.log(
  'boost'.padEnd(24) +
    'rerank'.padEnd(20) +
    'w-S@1'.padStart(6) +
    'w-S@5'.padStart(7) +
    'w-MRR'.padStart(9)
);
for (const row of results) {
  console.log(
    row.boost.padEnd(24) +
      row.rerank.padEnd(20) +
      pct(row.weightedAt1) +
      pct(row.weightedAt5).padStart(7) +
      row.weightedMrr.toFixed(3).padStart(9)
  );
}

const best = [...results].sort(
  (a, b) => b.weightedAt5 - a.weightedAt5 || b.weightedMrr - a.weightedMrr
)[0];
console.log(
  `\nbest: ${best.boost} + ${best.rerank} — w-S@5 ${pct(best.weightedAt5)}, w-S@1 ${pct(best.weightedAt1)}, MRR ${best.weightedMrr.toFixed(3)}`
);

await writeFile(
  new URL('./orama-ranking-sweep.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      querySet: process.env.QUERY_SET ?? 'curated+head (default)',
      totalWeight,
      results,
    },
    null,
    2
  )
);

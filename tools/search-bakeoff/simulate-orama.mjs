// Sweeps Orama configurations against the deployed index.
//
// The browser arm can only be re-run once a build has been deployed. This
// reproduces what `orama-worker.ts` and `search-engine-orama.ts` do — same
// schema, same boosts, same tolerance, same limits — so a candidate change can
// be measured against the index that is already published.
//
// It is a simulation of the engine rather than of the page: it says nothing
// about download, restore or keystroke cost. Those come from `perf.mjs`.
//
// Stop words need `@orama/stopwords`, which Orama ships separately and the
// spike does not depend on. Point ORAMA_STOPWORDS at a copy to include those
// configurations; without it they are skipped rather than silently passing.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import {
  scoreQuery,
  summarise,
  summariseBy,
  normalisePath,
} from './lib/score.mjs';

// `@orama/orama` is a dependency of the spike branch rather than of main, so it
// is only on the resolution path when the checkout happens to have it
// installed. ORAMA_PACKAGE points at a copy when it does not.
const { create, load, search } = await import(
  process.env.ORAMA_PACKAGE ?? '@orama/orama'
).catch(() => {
  console.error(
    'could not load @orama/orama.\n' +
      'Install it, or set ORAMA_PACKAGE to a file:// URL for its ESM entry point.'
  );
  process.exit(1);
});

const target = TARGETS.find((entry) => entry.key === 'orama');
const INDEX_URL = target.payloadUrls[0];

// Mirrors `orama-worker.ts`.
const SCHEMA = {
  url: 'string',
  title: 'string',
  description: 'string',
  body: 'string',
  trail: 'string',
  section: 'enum',
};
const BOOST = { title: 4, description: 2, trail: 2, body: 1 };
const WORKER_LIMIT = 200;
// Mirrors `search-engine-orama.ts`.
const RESULT_LIMIT = 30;

const TOKENIZER = { stemming: true, language: 'english' };

async function stopWords() {
  const source = process.env.ORAMA_STOPWORDS ?? '@orama/stopwords/english';
  try {
    const module = await import(source);
    return module.stopwords ?? module.default;
  } catch {
    return null;
  }
}

const stop = await stopWords();
if (!stop) {
  console.log('no @orama/stopwords — skipping the stop-word configurations\n');
}

// Downloading 11MB per run adds nothing once it is on disk, and the index only
// changes when the spike is redeployed.
const CACHE = new URL('./orama-index.cache.json', RESULTS_DIR);

async function indexJson() {
  try {
    const cached = await readFile(CACHE, 'utf8');
    console.log(
      `using cached index (${(cached.length / 1048576).toFixed(1)}MB)\n`
    );
    return JSON.parse(cached);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  console.log(`fetching ${INDEX_URL}`);
  const body = await fetch(INDEX_URL).then((response) => response.text());
  await mkdir(RESULTS_DIR, { recursive: true });
  await writeFile(CACHE, body);
  return JSON.parse(body);
}

const raw = await indexJson();
const queries = await loadQueries();

// `threshold` is kept in the sweep as a recorded negative. Orama's types say it
// defaults to 0 and that 0 means every query term has to appear, which with no
// stop-word list would make "how do I create an api key" a seven-term AND. It
// scores identically at 0, 0.5 and 1 on this corpus, so whatever it does, it is
// not that. Left here so nobody re-derives the same hypothesis.
const CONFIGS = [
  { name: 'as deployed (no tokenizer)', components: null, search: {} },
  { name: 'tokenizer', components: { tokenizer: TOKENIZER }, search: {} },
  {
    name: 'tokenizer + threshold 1',
    components: { tokenizer: TOKENIZER },
    search: { threshold: 1 },
  },
  {
    name: 'tokenizer + threshold 0.5',
    components: { tokenizer: TOKENIZER },
    search: { threshold: 0.5 },
  },
  ...(stop
    ? [
        {
          name: 'tokenizer + stop words',
          components: { tokenizer: { ...TOKENIZER, stopWords: stop } },
          search: {},
        },
        {
          name: 'tokenizer + stop words + threshold 1',
          components: { tokenizer: { ...TOKENIZER, stopWords: stop } },
          search: { threshold: 1 },
        },
      ]
    : []),
  // Orama's BM25 `b` is what Pagefind calls pageLength: how much a document's
  // length is held against it. Swept for the same reason.
  {
    name: 'tokenizer + b 0.3 (less length penalty)',
    components: { tokenizer: TOKENIZER },
    search: { relevance: { k: 1.2, b: 0.3, d: 0.5 } },
  },
];

async function run(config) {
  const db = create(
    config.components
      ? { schema: SCHEMA, components: config.components }
      : { schema: SCHEMA }
  );
  // `load` mutates, and a second run must not inherit the first one's state.
  load(db, structuredClone(raw));

  const scored = [];

  for (const query of queries) {
    const response = await search(db, {
      term: query.query,
      limit: WORKER_LIMIT,
      boost: BOOST,
      tolerance: 1,
      ...config.search,
    });

    const results = response.hits.slice(0, RESULT_LIMIT).map((hit) => ({
      url: normalisePath(hit.document.url),
      title: hit.document.title,
      excerpt: hit.document.description || hit.document.body || '',
      excerptHtml: '',
    }));

    scored.push(
      scoreQuery(query, { query: query.query, variant: 'full', results })
    );
  }

  const summary = summarise(scored);
  const byBucket = summariseBy(scored, 'bucket');

  const pct = (value) => `${(value * 100).toFixed(0)}%`.padStart(4);
  console.log(
    `${config.name.padEnd(40)} S@1 ${pct(summary.successAt1)}  S@5 ${pct(
      summary.successAt5
    )}  MRR ${summary.mrr.toFixed(3)}  zero ${pct(summary.zeroResultRate)}` +
      `  intent ${pct(byBucket.intent?.successAt5 ?? 0)}` +
      `  ambig ${pct(byBucket.ambiguity?.successAt5 ?? 0)}`
  );

  return {
    config: config.name,
    search: config.search,
    summary,
    byBucket,
    scored,
  };
}

const sweep = [];
for (const config of CONFIGS) sweep.push(await run(config));

const ranked = [...sweep].sort(
  (a, b) =>
    b.summary.successAt5 - a.summary.successAt5 || b.summary.mrr - a.summary.mrr
);

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./orama-simulation.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), indexUrl: INDEX_URL, ranked },
    null,
    2
  )
);

console.log(`\nbest: ${ranked[0].config}`);
console.log(
  `written to ${new URL('./orama-simulation.json', RESULTS_DIR).pathname}`
);

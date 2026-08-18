// Runs the query set against the deployed Orama index in Node, with the
// tokenizer as the only variable.
//
// The browser arm of the bake-off can only be re-run once a build has been
// deployed. This reproduces what `orama-worker.ts` and `search-engine-orama.ts`
// do — same schema, same boosts, same tolerance, same limits — so the effect of
// a change to the worker can be measured against the index that is already
// published, without waiting on a deploy.
//
// It is a simulation of the engine rather than of the page: it says nothing
// about download, restore or keystroke cost. Those come from `perf.mjs`.

import { create, load, search } from '@orama/orama';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { loadQueries } from './lib/queries.mjs';
import {
  scoreQuery,
  summarise,
  summariseBy,
  normalisePath,
} from './lib/score.mjs';

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

// Downloading 11MB per run adds nothing once it is on disk, and the index only
// changes when the spike is redeployed.
const CACHE = new URL('./orama-index.cache.json', RESULTS_DIR);

async function indexJson() {
  try {
    const cached = await readFile(CACHE, 'utf8');
    console.log(
      `using cached index (${(cached.length / 1048576).toFixed(1)}MB)`
    );
    return JSON.parse(cached);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  console.log(`fetching ${INDEX_URL}`);
  const body = await fetch(INDEX_URL).then((response) => response.text());
  await mkdir(RESULTS_DIR, { recursive: true });
  await writeFile(CACHE, body);
  console.log(`fetched ${(body.length / 1048576).toFixed(1)}MB`);
  return JSON.parse(body);
}

const raw = await indexJson();
const queries = await loadQueries();

async function run(label, components) {
  const db = create(
    components ? { schema: SCHEMA, components } : { schema: SCHEMA }
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
  console.log(
    `\n${label}\n  Success@1 ${(summary.successAt1 * 100).toFixed(0)}%  ` +
      `Success@5 ${(summary.successAt5 * 100).toFixed(0)}%  ` +
      `MRR ${summary.mrr.toFixed(3)}  ` +
      `zero results ${(summary.zeroResultRate * 100).toFixed(0)}%`
  );

  const byBucket = summariseBy(scored, 'bucket');
  for (const [bucket, entry] of Object.entries(byBucket)) {
    console.log(
      `    ${bucket.padEnd(14)} Success@5 ${(entry.successAt5 * 100).toFixed(0)}%` +
        `   zero ${(entry.zeroResultRate * 100).toFixed(0)}%`
    );
  }

  return { label, summary, byBucket, scored };
}

const before = await run(
  'create({ schema }) — the worker before the fix',
  null
);
const after = await run(
  'create({ schema, tokenizer }) — the worker after the fix',
  { tokenizer: { stemming: true, language: 'english' } }
);

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./orama-simulation.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), indexUrl: INDEX_URL, before, after },
    null,
    2
  )
);

console.log(
  `\nwritten to ${new URL('./orama-simulation.json', RESULTS_DIR).pathname}`
);

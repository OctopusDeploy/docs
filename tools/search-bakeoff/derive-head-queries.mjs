// Derives candidate head queries from the corpus, because no record of real
// ones exists.
//
// The site search is client side and nothing reports queries anywhere, so there
// is no log, no analytics event and no backend to ask. Guessing a head bucket
// from memory would be the weakest evidence in the set and impossible to
// defend, so it is derived from the corpus instead and the derivation is kept
// runnable.
//
// The rule: a head query is a term that the docs talk about a lot *and* that
// names a page of its own. Frequency alone returns filler like "octopus" and
// "step"; titles alone return 1,250 pages with no ordering. The intersection is
// the set of concepts a reader is likely to search for and to expect a specific
// landing page from.
//
// Output is a candidate list for a human to accept or reject, not a finished
// query set — `queries/head.json` is written by hand from this.

import { writeFile, mkdir } from 'node:fs/promises';
import { RESULTS_DIR } from './config.mjs';
import { normalisePath } from './lib/score.mjs';

const PAGE_LIST = 'https://octopus.com/docs/search.json';

// Titles longer than this are phrases rather than the short noun a reader types
// into a search field.
const MAX_TITLE_WORDS = 3;

// The whole REST API tree is reference material: the examples duplicate dozens
// of product page titles, and every CLI command page is titled with the common
// words that make up the command, so `octopus project create` outranks
// `Projects` on frequency alone. A bare concept term should land on the product
// page, so nothing under here is ever proposed as the expected answer. Queries
// that genuinely target the API and CLI live in the curated buckets, where the
// expected URL is chosen rather than derived.
const SECONDARY = /^\/docs\/octopus-rest-api\//;

const pages = await fetch(PAGE_LIST).then((response) => response.json());

// --- Corpus term frequency --------------------------------------------------
// `keywords` is the page text with stop words already removed, which is exactly
// the vocabulary worth counting. 792 of 1,250 pages carry it; the rest simply
// contribute nothing rather than distorting anything.
const frequency = new Map();
let pagesWithKeywords = 0;

for (const page of pages) {
  if (!page.keywords) continue;
  pagesWithKeywords += 1;

  // Counted once per page, so one page repeating a word does not make it look
  // like a site-wide concept.
  const seen = new Set(
    String(page.keywords)
      .toLowerCase()
      .split(/[^a-z0-9.-]+/)
      .filter((word) => word.length > 2)
  );

  for (const word of seen) {
    frequency.set(word, (frequency.get(word) ?? 0) + 1);
  }
}

// --- Score every page by how central its title is ----------------------------
const singular = (word) => (word.endsWith('s') ? word.slice(0, -1) : word);

const scoreWord = (word) =>
  Math.max(frequency.get(word) ?? 0, frequency.get(singular(word)) ?? 0);

const candidates = [];

for (const page of pages) {
  const title = String(page.title ?? '').trim();
  const words = title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  if (words.length === 0 || words.length > MAX_TITLE_WORDS) continue;

  // The weakest word decides. A title is only a good head query when every part
  // of it is common vocabulary — "Tentacle communication" scores on whichever of
  // its words the docs use least.
  const score = Math.min(...words.map(scoreWord));
  if (score === 0) continue;

  candidates.push({ title, url: normalisePath(page.url), score });
}

// --- Collapse duplicate titles onto the canonical page -----------------------
const byTitle = new Map();

for (const candidate of candidates) {
  const key = candidate.title.toLowerCase();
  const group = byTitle.get(key) ?? [];
  group.push(candidate);
  byTitle.set(key, group);
}

const derived = [];

for (const [, group] of byTitle) {
  const product = group.filter((entry) => !SECONDARY.test(entry.url));
  // Every page with this title is an example page, so there is no canonical
  // product page to point at and the term is not a head query.
  if (product.length === 0) continue;

  // Shallowest path wins: /docs/runbooks over /docs/runbooks/runbook-examples.
  const canonical = product.sort(
    (a, b) => a.url.split('/').length - b.url.split('/').length
  )[0];

  derived.push({
    query: canonical.title.toLowerCase(),
    expect: [canonical.url],
    corpusPages: canonical.score,
    alternatives: group
      .filter((entry) => entry.url !== canonical.url)
      .map((entry) => entry.url),
  });
}

derived.sort((a, b) => b.corpusPages - a.corpusPages);

const top = derived.slice(0, 40);

console.log(`pages: ${pages.length}, with keywords: ${pagesWithKeywords}`);
console.log(
  `candidate head queries: ${derived.length}, showing top ${top.length}\n`
);
console.log('query'.padEnd(34) + 'pages'.padStart(6) + '  expected');
for (const entry of top) {
  console.log(
    entry.query.padEnd(34) +
      String(entry.corpusPages).padStart(6) +
      '  ' +
      entry.expect[0] +
      (entry.alternatives.length > 0
        ? `   (${entry.alternatives.length} same-title)`
        : '')
  );
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./head-candidates.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      method:
        'terms frequent across the corpus that also name a page; examples tree never proposed as the expected answer',
      pagesWithKeywords,
      candidates: derived,
    },
    null,
    2
  )
);

console.log(
  `\nwritten to ${new URL('./head-candidates.json', RESULTS_DIR).pathname}`
);

// Checks every expected URL in the query set against the live page list before
// a run happens.
//
// A typo in an `expect` entry scores as a miss on all three engines at once,
// which looks like agreement and hides the mistake. Cheaper to catch here.

import { writeFile, mkdir } from 'node:fs/promises';
import { RESULTS_DIR } from './config.mjs';
import { normalisePath } from './lib/score.mjs';
import { loadQueries } from './lib/queries.mjs';

// The legacy index is the only place the whole page list is available as plain
// JSON, and all three targets are built from near-identical content.
const PAGE_LIST = 'https://octopus.com/docs/search.json';

const pages = await fetch(PAGE_LIST).then((response) => {
  if (!response.ok) throw new Error(`${PAGE_LIST} returned ${response.status}`);
  return response.json();
});

const known = new Map(
  pages.map((page) => [normalisePath(page.url), page.title])
);
const queries = await loadQueries();

const unknown = [];
const unjudged = [];

for (const query of queries) {
  if (query.expect.length === 0) {
    unjudged.push(query);
    continue;
  }
  for (const url of query.expect) {
    if (!known.has(normalisePath(url))) {
      unknown.push({ id: query.id, query: query.query, url });
    }
  }
}

console.log(`pages in live index: ${known.size}`);
console.log(
  `queries: ${queries.length} (${unjudged.length} recorded but unscored)`
);

if (unknown.length > 0) {
  console.log(`\n${unknown.length} expected URLs do not exist:`);
  for (const row of unknown) {
    console.log(`  ${row.id}  "${row.query}"  ->  ${row.url}`);

    // A near miss is almost always a path that moved, so offer the closest
    // candidates rather than only reporting the failure.
    const tail = row.url.split('/').filter(Boolean).pop() ?? '';
    const near = [...known.keys()]
      .filter((path) => path.endsWith(`/${tail}`))
      .slice(0, 3);
    for (const candidate of near)
      console.log(`      did you mean ${candidate}`);
  }
} else {
  console.log('\nall expected URLs exist');
}

// Titles that appear more than once are what the ambiguity bucket is testing,
// so the current list is worth printing: it is the cheapest way to keep that
// bucket pointed at real collisions as the docs change.
const byTitle = new Map();
for (const page of pages) {
  const key = page.title.trim().toLowerCase();
  byTitle.set(key, [...(byTitle.get(key) ?? []), normalisePath(page.url)]);
}
const collisions = [...byTitle].filter(([, urls]) => urls.length > 1);
console.log(`\n${collisions.length} titles are shared by more than one page`);

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./query-check.json', RESULTS_DIR),
  JSON.stringify(
    {
      pageCount: known.size,
      queryCount: queries.length,
      unscored: unjudged.map((query) => query.id),
      unknown,
      titleCollisions: Object.fromEntries(collisions),
    },
    null,
    2
  )
);

if (unknown.length > 0) process.exitCode = 1;

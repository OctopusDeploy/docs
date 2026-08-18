// Loads the query set.
//
// Curated buckets live in `queries/curated.json`. Real user queries, once they
// are pulled from analytics, go in `queries/head.json` in the same shape and
// are merged here — they replace the `source: "assumed"` head bucket rather
// than adding to it, because assumed queries are the weakest evidence in the
// set and there is no reason to keep them once real ones exist.

import { readFile } from 'node:fs/promises';
import { PREFIX_LENGTHS } from '../config.mjs';

const CURATED = new URL('../queries/curated.json', import.meta.url);
const HEAD = new URL('../queries/head.json', import.meta.url);

async function readIfPresent(url) {
  try {
    return JSON.parse(await readFile(url, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function loadQueries() {
  const curated = JSON.parse(await readFile(CURATED, 'utf8'));
  const head = await readIfPresent(HEAD);

  const base = curated.queries.map((query) => ({
    ...query,
    expect: query.expect ?? [],
  }));

  if (!head) return base;

  const real = head.queries.map((query) => ({
    ...query,
    bucket: 'head',
    source: 'analytics',
    expect: query.expect ?? [],
  }));

  return [...base.filter((query) => query.source !== 'assumed'), ...real];
}

/**
 * Every query, plus its truncations.
 *
 * The overlay searches on each keystroke, so a query is only half-tested at its
 * full length — the prefixes are what the user sees for most of the time the
 * panel is open. A prefix is skipped when it would be the whole query anyway.
 */
export function withPrefixes(query) {
  const variants = [{ variant: 'full', text: query.query }];

  for (const length of PREFIX_LENGTHS) {
    if (query.query.length <= length) continue;
    variants.push({
      variant: `prefix${length}`,
      text: query.query.slice(0, length),
    });
  }

  return variants;
}

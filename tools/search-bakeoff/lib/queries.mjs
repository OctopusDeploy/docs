// Loads the query set.
//
// Curated buckets live in `queries/curated.json`. The head bucket lives in
// `queries/head.json` and replaces the `source: "assumed"` entries in the
// curated file, which exist only so the set is runnable before it is derived.
//
// There is no analytics source to draw head queries from: the search runs
// entirely in the browser and nothing reports what was typed, so no log exists
// to go and read. `head.json` is derived from the corpus instead, and each entry
// records which derivation produced it.

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
    source: query.derivation ?? 'derived',
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

// Holds the Orama index off the main thread.
//
// Restoring a serialized index is CPU-bound and proportional to the corpus, so
// on the main thread it would freeze the page for as long as it takes. The
// overlay is open and taking keystrokes while this runs.
//
// Core `create` + `load` rather than @orama/plugin-data-persistence: the plugin
// reaches for Node's filesystem and buffers, and bundling it for a browser
// worker fails at import time.

import { create, load, search } from '@orama/orama';
import { stopwords as englishStopwords } from '@orama/stopwords/english';

type LoadMessage = { type: 'load'; indexUrl: string };
type SearchMessage = {
  type: 'search';
  id: number;
  query: string;
  facet?: string;
  limit: number;
};

// Has to match the schema the index was built with, or `load` restores an index
// the search side cannot read.
const SCHEMA = {
  url: 'string',
  title: 'string',
  description: 'string',
  body: 'string',
  trail: 'string',
  section: 'enum',
} as const;

// Has to match `orama-index.ts`, and for a reason that is invisible when it is
// wrong: `load` restores the index data but the tokenizer comes from `create`.
// Build the index with the English stemmer and restore it without, and every
// query term is compared unstemmed against stemmed index terms — `variables`
// found 5 pages instead of 321, and no typo matched at all. Search kept working,
// so nothing failed loudly.
const TOKENIZER = {
  stemming: true,
  language: 'english',
  // Orama defaults this to an empty list, so without it `how`, `do`, `the` and
  // 177 others are live search terms on both sides.
  stopWords: englishStopwords,
} as const;

// How much a page's depth counts against it, per path segment. BM25 has no
// notion of a site's shape, so on its own it ranks `/docs/projects/variables`
// below `/docs/projects/variables/system-variables` for the query `variables`:
// the child page repeats the term more often in less text. Readers searching a
// bare section name almost always want the section, and on real search logs this
// single failure was the largest source of missed traffic.
//
// 0.12 was picked by sweeping it against three query sets — the search terms
// readers actually typed, the pages they actually visit, and a curated set. Much
// lower and landing pages stay buried; much higher and a genuinely deep page
// cannot win even when it is the only match.
const DEPTH_PENALTY = 0.12;

type Ranked = { score: number; document: { url: string; title: string } };

/** Lowercased, punctuation collapsed, so `Config as Code` matches `config as code`. */
function comparable(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function segments(url: string) {
  return url.split('/').filter(Boolean);
}

/**
 * Reorders hits so a section's own page beats the pages inside it.
 *
 * Two signals, in order. A page the query *names* — by title or by the last
 * segment of its URL — wins outright, which is what makes `runbooks` return
 * `/docs/runbooks`. Everything else is ordered by score discounted for depth.
 *
 * A plain tiebreak on depth was tried first and did nothing: BM25 scores are
 * floats and almost never tie, so depth has to scale the score rather than break
 * a draw between equal ones.
 */
function byNameThenDepth<T extends Ranked>(hits: T[], term: string): T[] {
  const wanted = comparable(term);

  const names = (hit: T) => {
    const slug = segments(hit.document.url).pop() ?? '';
    return comparable(hit.document.title) === wanted ||
      comparable(slug.replace(/-/g, ' ')) === wanted
      ? 1
      : 0;
  };

  return hits
    .map((hit) => ({
      hit,
      names: names(hit),
      adjusted:
        hit.score / (1 + DEPTH_PENALTY * segments(hit.document.url).length),
    }))
    .sort((a, b) => b.names - a.names || b.adjusted - a.adjusted)
    .map((entry) => entry.hit);
}

let indexUrl = '';
let ready: Promise<unknown> | null = null;

function open() {
  ready ??= fetch(indexUrl)
    .then((response) => response.json())
    .then((raw) => {
      const db = create({
        schema: SCHEMA,
        // Matches `orama-index.ts`: the index was built without a sort store,
        // so restoring into a database that expects one is a mismatch.
        sort: { enabled: false },
        components: { tokenizer: TOKENIZER },
      });
      load(db, raw);
      return db;
    })
    .catch((error) => {
      // A failed load must not poison every later search.
      ready = null;
      throw error;
    });

  return ready;
}

self.addEventListener(
  'message',
  async (event: MessageEvent<LoadMessage | SearchMessage>) => {
    const message = event.data;

    if (message.type === 'load') {
      indexUrl = message.indexUrl;
      // Kicked off here so the download and restore overlap with typing; the
      // rejection is handled inside `open`.
      open().catch(() => {});
      return;
    }

    try {
      const db = await open();
      const query = {
        term: message.query,
        limit: message.limit,
        // Body carries the most text and the least signal per word, so it is
        // weighted below the fields that name what a page is about. Title at 8
        // rather than 4 was worth 26 points of Success@5 on real search terms on
        // its own — most searches are one or two words that name a page.
        boost: { title: 8, description: 2, trail: 2, body: 1 },
        tolerance: 1,
      };

      // Unfiltered, because a `where` clause narrows the facet counts to the
      // section being filtered on, and the tab strip has to keep showing what
      // the other tabs hold. `count` is the true total rather than the capped
      // number of hits returned.
      const overview = await search(db as never, {
        ...query,
        facets: { section: {} },
      });

      // Filtering in the worker rather than over the returned hits: a section
      // whose matches fall outside the first `limit` would otherwise come back
      // short.
      const selected =
        message.facet && message.facet !== 'all'
          ? await search(db as never, {
              ...query,
              where: { section: { eq: message.facet } },
            })
          : overview;

      self.postMessage({
        id: message.id,
        counts: {
          all: overview.count,
          ...(overview.facets?.section?.values ?? {}),
        },
        hits: byNameThenDepth(selected.hits, message.query).map(
          (hit) => hit.document
        ),
      });
    } catch (error) {
      self.postMessage({ id: message.id, error: String(error) });
    }
  }
);

// Pagefind behind the `SearchEngine` seam.
//
// The index is chunked and content-hashed, and Pagefind fetches only the chunks
// a query actually touches, so the per-query cost stays flat as the corpus
// grows. The `search.json` index this replaced was a single 1.86MB download,
// paid in full on the first search.
//
// Two calls per search: `search()` returns lightweight stubs, then each result's
// `data()` fetches its own fragment. Only the page of results being shown is
// loaded, so the fragments fetched scale with the result limit, not the corpus.

import {
  breadcrumbFrom,
  classify,
  type SearchEngine,
  type SearchResult,
} from './search-engine';

const RESULT_LIMIT = 30;

type PagefindSubResult = {
  title: string;
  /** Carries the heading's `#anchor` when the match is below the page title. */
  url: string;
  excerpt: string;
};

type PagefindFragment = {
  url: string;
  meta?: Record<string, string>;
  excerpt: string;
  sub_results?: PagefindSubResult[];
};

type PagefindResultStub = {
  /** Pagefind's own relevance score, before any reordering here. */
  score: number;
  data(): Promise<PagefindFragment>;
};

type PagefindApi = {
  options(config: Record<string, unknown>): Promise<void>;
  filters(): Promise<Record<string, Record<string, number>>>;
  preload(
    query: string,
    options?: { filters?: Record<string, string[]> }
  ): void;
  search(
    query: string,
    options?: { filters?: Record<string, string[]> }
  ): Promise<{
    results: PagefindResultStub[];
    totalFilters: Record<string, Record<string, number>>;
    unfilteredResultCount: number;
  }>;
};

// Below this score, the best match is not a match.
//
// Pagefind has no notion of a query it cannot answer: it ranks whatever shares a
// few letters and returns it as confidently as a real hit. Asked for
// `sssieddqxsx` — a keyboard mash, and the single most-typed term in the search
// log — it offered three security articles.
//
// Calibrated against every term in that log. The weakest genuine query, `cli`,
// scores 9.5; the mash scores 6.0 and a Spanish query 6.7. Eight sits between
// them with room on both sides, suppresses 17 of the 33 terms that have no right
// answer, and costs none of the 57 that do. The 16 it leaves are unfinished words
// like `te` and `version` that score 40 and up because they genuinely match
// something.
//
// Applied to the top result only. The question is whether this query has an
// answer at all, not whether to trim the tail of one that does.
//
// Re-check with `calibrate-score-floor.mjs` if the corpus or the ranking weights
// change; it is calibrated against both. Note that Pagefind's `options()` merges
// rather than replaces, so a calibration run has to start from a clean page or
// every score comes back depressed.
const MINIMUM_SCORE = 8;

// How many matched headings a row will show, and how many rows get them at all.
//
// Sections are their own rows, so they compete with pages for the reader's first
// screenful. Three each across thirty results made two thirds of the list
// headings, which buries the pages the reader is choosing between. Only the
// leading results earn them, and only a couple each.
const SECTION_LIMIT = 2;
const ROWS_WITH_SECTIONS = 3;

/**
 * The headings inside a result that matched on their own.
 *
 * Pagefind returns one sub-result for the page itself alongside the real
 * headings, and its URL is the page URL with no anchor — that is the row's own
 * link, so it is dropped rather than repeated underneath itself.
 */
function sectionsOf(fragment: PagefindFragment) {
  return (fragment.sub_results ?? [])
    .filter((sub) => sub.url.includes('#'))
    .slice(0, SECTION_LIMIT)
    .map((sub) => ({
      title: sub.title,
      // Keep the anchor, drop the origin, so the row links the same way every
      // other row does.
      url: new URL(sub.url, window.location.origin).pathname + hashOf(sub.url),
    }));
}

function hashOf(url: string) {
  const at = url.indexOf('#');
  return at === -1 ? '' : url.slice(at);
}

/** Lowercased, punctuation collapsed, so `Config as Code` matches `config as code`. */
function comparable(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function segments(path: string) {
  return path.split('/').filter(Boolean);
}

/**
 * Reorders results so a section's own page beats the pages inside it.
 *
 * Two signals: a page the query *names* — by title or by the last segment of
 * its URL — wins outright, and everything else is ordered by score discounted per
 * path segment. BM25 has no notion of a site's shape, so a bare section name
 * otherwise ranks the pages inside the section above the section itself.
 *
 * Measured against real search terms this is worth about twenty points of
 * Success@5; `data-pagefind-weight` alone measured as a no-op.
 *
 * This reaches only as far as the results already fetched, so a landing page
 * ranked below `RESULT_LIMIT` on raw score cannot be rescued here.
 */
function byNameThenDepth<
  T extends { score: number; url: string; title: string },
>(hits: T[], term: string): T[] {
  const wanted = comparable(term);
  const DEPTH_PENALTY = 0.12;

  const names = (hit: T) => {
    const slug = segments(hit.url).pop() ?? '';
    return comparable(hit.title) === wanted ||
      comparable(slug.replace(/-/g, ' ')) === wanted
      ? 1
      : 0;
  };

  return hits
    .map((hit) => ({
      hit,
      names: names(hit),
      adjusted: hit.score / (1 + DEPTH_PENALTY * segments(hit.url).length),
    }))
    .sort((a, b) => b.names - a.names || b.adjusted - a.adjusted)
    .map((entry) => entry.hit);
}

export function pagefindEngine(bundlePath: string): SearchEngine {
  let loading: Promise<PagefindApi | null> | null = null;

  function load() {
    loading ??= import(/* @vite-ignore */ `${bundlePath}pagefind.js`)
      .then(async (api: PagefindApi) => {
        // Pagefind resolves its chunk URLs against this, and prepends it to
        // every result URL; the site is proxied under /docs/ rather than served
        // from the root, and the index is built relative to that same prefix.
        await api.options({
          basePath: bundlePath,
          // The default is 30 words, which overruns the single line the result
          // row gives it. Sized to the row instead.
          excerptLength: 20,
          ranking: {
            // Metadata is searchable and boosted — title 5x by default, the rest
            // 1x. Swept against real search terms and top-visited pages.
            //
            // `trail` is the breadcrumb, derived from the URL, so every page
            // under /docs/projects/ carries "Projects" and matches a search for
            // it just as well as the Projects page itself. Demoting it is worth
            // seven points of Success@5; it earns its place in the result row,
            // not in the ranking.
            metaWeights: { title: 8, trail: 0.5 },
          },
        });
        // The filter index is a separate chunk, and a search returns empty
        // filter counts until it has been pulled down. Loading it here rather
        // than per-search means the tab strip is populated on the first result.
        await api.filters();
        return api;
      })
      .catch((error) => {
        // A failed load must not poison every later search.
        loading = null;
        console.error('[docs-search] could not load the Pagefind index', error);
        return null;
      });

    return loading;
  }

  return {
    // 118KB of runtime and WASM, and it shortens the cold path to the first
    // result. The per-query chunks are still fetched on demand.
    eager: true,
    warm: load,

    // Pulls the chunks this query needs while the reader is still typing.
    // Without it every keystroke pays for its own chunk fetches.
    preload(query) {
      const term = query.trim();
      if (!term) return;
      void load().then((api) => api?.preload(term));
    },

    async search(rawQuery, facet) {
      const query = rawQuery.trim();
      const empty = { results: [], counts: { all: 0 } };
      if (!query) return empty;

      const api = await load();
      if (!api) return empty;

      try {
        const filters =
          facet && facet !== 'all' ? { section: [facet] } : undefined;
        const response = await api.search(query, { filters });

        // Counts come from the whole match set rather than the filtered one, so
        // the strip keeps showing what the other tabs hold while one is selected.
        const counts: Record<string, number> = {
          all: response.unfilteredResultCount,
          ...(response.totalFilters?.section ?? {}),
        };

        // Whether the query has an answer at all is a question about the corpus,
        // so it is asked of the unfiltered scores. Narrowing to a tab only
        // removes documents, so a filtered top score under the floor would
        // suppress a query the corpus does answer, and zero the counts the strip
        // was just clicked from.
        const unfiltered = filters ? await api.search(query) : response;
        if ((unfiltered.results[0]?.score ?? 0) < MINIMUM_SCORE) return empty;

        const stubs = response.results.slice(0, RESULT_LIMIT);
        const fragments = await Promise.all(stubs.map((stub) => stub.data()));

        // The score lives on the stub and the URL on the fragment, so the
        // reorder needs both.
        const scored = fragments.map((fragment, at) => ({
          fragment,
          score: stubs[at].score,
          url: new URL(fragment.url, window.location.origin).pathname,
          title:
            fragment.meta?.title ??
            new URL(fragment.url, window.location.origin).pathname,
        }));

        const results = byNameThenDepth(scored, query).map(
          (hit, rank): SearchResult => ({
            url: hit.url,
            title: hit.title,
            // Already carries <mark> around the hits, and Pagefind escapes the
            // surrounding text itself.
            excerpt: hit.fragment.excerpt,
            breadcrumb: hit.fragment.meta?.trail
              ? hit.fragment.meta.trail.split(' / ')
              : breadcrumbFrom(hit.url),
            sections:
              rank < ROWS_WITH_SECTIONS
                ? sectionsOf(hit.fragment)
                : undefined,
            ...classify(hit.url),
          })
        );

        return { results, counts };
      } catch (error) {
        // Thirty fragment fetches per query, any of which can fail. Rejecting
        // would leave the previous query's rows under the new text.
        console.error('[docs-search] search failed', error);
        return empty;
      }
    },
  };
}

// Pagefind behind the `SearchEngine` seam.
//
// Two calls per search: `search()` returns lightweight stubs, then each result's
// `data()` fetches its own fragment. Only the rows being rendered are fetched.

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

// Below this score, the best match is not a match. Pagefind ranks whatever
// shares a few letters with the query and returns it as confidently as a real
// hit, so a keyboard mash comes back with three security articles.
//
// Calibrated against the site's search log: the weakest genuine query, `cli`,
// scores 9.5, and a keyboard mash 6.0. Applied to the top result only, because
// the question is whether the query has an answer at all.
const MINIMUM_SCORE = 8;

// Sections are their own rows, so they compete with pages for the reader's first
// screenful. Three each across thirty results made two thirds of the list
// headings.
const SECTION_LIMIT = 2;
const ROWS_WITH_SECTIONS = 3;

/**
 * The headings inside a result that matched on their own. Pagefind also returns a
 * sub-result for the page itself, whose URL carries no anchor; that is the row's
 * own link, so anchorless sub-results are dropped.
 */
function sectionsOf(fragment: PagefindFragment) {
  return (fragment.sub_results ?? [])
    .filter((sub) => sub.url.includes('#'))
    .slice(0, SECTION_LIMIT)
    .map((sub) => ({
      title: sub.title,
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
 * Reorders results so a section's own page beats the pages inside it. BM25 has
 * no notion of a site's shape, so a bare section name otherwise ranks the pages
 * inside the section above the section itself.
 *
 * A page the query *names* — by title or by the last segment of its URL — wins
 * outright; the rest are ordered by score discounted per path segment.
 * `data-pagefind-weight` alone measured as a no-op, so the attribute is no
 * substitute for this.
 *
 * Reaches only the results already fetched, so a landing page ranked below
 * `RESULT_LIMIT` on raw score cannot be rescued here.
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
        // Pagefind resolves its chunk URLs against this and prepends it to every
        // result URL, so it has to match the prefix the index was built against.
        await api.options({
          basePath: bundlePath,
          // The default is 30 words, which overruns the single line the result
          // row gives it. Sized to the row instead.
          excerptLength: 20,
          ranking: {
            // `trail` is the breadcrumb, derived from the URL, so every page
            // under /docs/projects/ carries "Projects" and would otherwise match
            // a search for it as well as the Projects page does. Demoting it is
            // worth seven points of Success@5.
            metaWeights: { title: 8, trail: 0.5 },
          },
        });
        // The filter index is a separate chunk, and a search returns empty filter
        // counts until it has been pulled down.
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
    // 118KB of runtime and WASM up front; the per-query chunks stay on demand.
    eager: true,
    warm: load,

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

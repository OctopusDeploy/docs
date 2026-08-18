// Pagefind behind the `SearchEngine` seam.
//
// The index is chunked and content-hashed, and Pagefind fetches only the chunks
// a query actually touches. That is the whole reason for the spike: the old
// index is a single 1.86MB download, and this one's per-query cost stays flat as
// the corpus grows.
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
function sectionsOf(fragment: PagefindFragment, path: string) {
  return (fragment.sub_results ?? [])
    .filter((sub) => sub.url.includes('#'))
    .slice(0, SECTION_LIMIT)
    .map((sub) => ({
      title: sub.title,
      // Keep the anchor, drop the origin, so the row links the same way every
      // other row does.
      url: new URL(sub.url, window.location.origin).pathname + hashOf(sub.url),
    }))
    .filter((sub) => sub.url !== path);
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
 * The same two signals the Orama worker uses, for the same reason and with the
 * same constant: a page the query *names* — by title or by the last segment of
 * its URL — wins outright, and everything else is ordered by score discounted per
 * path segment. Measured against real search terms this is worth about twenty
 * points of Success@5; `data-pagefind-weight` alone measured as a no-op.
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
          // Appends the query to every result URL, so the destination page can
          // highlight what was searched for. Nothing reads it yet — that needs
          // Pagefind's `pagefind-highlight.js` on the page, or an equivalent of
          // our own — but the parameter has to be set here for the links to
          // carry it at all.
          highlightParam: 'highlight',
        });
        // The filter index is a separate chunk, and a search returns empty
        // filter counts until it has been pulled down. Loading it here rather
        // than per-search means the tab strip is populated on the first result.
        await api.filters();
        return api;
      })
      .catch(() => {
        // A failed load must not poison every later search.
        loading = null;
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

      const response = await api.search(query, {
        filters: facet && facet !== 'all' ? { section: [facet] } : undefined,
      });

      // Counts come from the whole match set rather than the filtered one, so
      // the strip keeps showing what the other tabs hold while one is selected.
      const counts: Record<string, number> = {
        all: response.unfilteredResultCount,
        ...(response.totalFilters?.section ?? {}),
      };

      const stubs = response.results.slice(0, RESULT_LIMIT);
      const fragments = await Promise.all(stubs.map((stub) => stub.data()));

      // The score lives on the stub and the URL on the fragment, so the reorder
      // needs both. Pairing them costs nothing: a fragment is fetched for every
      // row that gets rendered anyway.
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
          // Pagefind takes the title from the first heading inside the indexed
          // body, which is why the article rather than `.page-content` carries
          // `data-pagefind-body`.
          title: hit.title,
          // Already carries <mark> around the hits, and Pagefind escapes the
          // surrounding text itself.
          excerpt: hit.fragment.excerpt,
          // Written into the page by the layout; the path is the fallback for
          // anything built before that attribute existed.
          breadcrumb: hit.fragment.meta?.trail
            ? hit.fragment.meta.trail.split(' / ')
            : breadcrumbFrom(hit.url),
          sections:
            rank < ROWS_WITH_SECTIONS
              ? sectionsOf(hit.fragment, hit.url)
              : undefined,
          ...classify(hit.url),
        })
      );

      return { results, counts };
    },
  };
}

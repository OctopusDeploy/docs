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

type PagefindResultStub = { data(): Promise<PagefindFragment> };

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

// How many matched headings a row will show. More than this and the row stops
// being a result and starts being a table of contents.
const SECTION_LIMIT = 3;

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

      const fragments = await Promise.all(
        response.results.slice(0, RESULT_LIMIT).map((stub) => stub.data())
      );

      const results = fragments.map((fragment): SearchResult => {
        const path = new URL(fragment.url, window.location.origin).pathname;

        return {
          url: path,
          // Pagefind takes the title from the first heading inside the indexed
          // body, which is why the article rather than `.page-content` carries
          // `data-pagefind-body`.
          title: fragment.meta?.title ?? path,
          // Already carries <mark> around the hits, and Pagefind escapes the
          // surrounding text itself.
          excerpt: fragment.excerpt,
          // Written into the page by the layout; the path is the fallback for
          // anything built before that attribute existed.
          breadcrumb: fragment.meta?.trail
            ? fragment.meta.trail.split(' / ')
            : breadcrumbFrom(path),
          sections: sectionsOf(fragment, path),
          ...classify(path),
        };
      });

      return { results, counts };
    },
  };
}

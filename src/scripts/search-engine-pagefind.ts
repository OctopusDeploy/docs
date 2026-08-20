// Pagefind behind the `SearchEngine` seam.
//
// Two calls per search: `search()` returns lightweight stubs, then each result's
// `data()` fetches its own fragment. Only the rows being rendered are fetched,
// which is what makes a thousand-result query affordable and why the stubs are
// kept for `more()` rather than thrown away at the end of the first page.

import {
  breadcrumbFrom,
  classify,
  type SearchEngine,
  type SearchResult,
} from './search-engine';

// Rows fetched at a time. Pagefind's own UI shows five and offers the rest on
// demand; thirty, because `byNameThenDepth` reorders within a page and needs
// enough of the list to have something to reorder.
const PAGE_SIZE = 30;

// How many shallow pages the named-page lookup looks through. Measured over 18
// section queries: three finds the page for 16, five for 17, and twenty finds no
// more than five does.
const LANDING_CANDIDATES = 5;

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
// scores 9.5 and a keyboard mash 6.0. Eight suppressed 17 of the 33 terms with
// no right answer and cost none of the 57 that had one. Applied to the top
// result only, because the question is whether the query has an answer at all.
//
// Recalibrating: `options()` merges rather than replaces, so a run that did not
// start from a clean page comes back with every score depressed.
const MINIMUM_SCORE = 8;

// Sections are their own rows, so they compete with pages for the reader's first
// screenful. Three headings per page across thirty results made two thirds of
// the list headings.
/** Headings shown under one page. */
const SECTION_LIMIT = 2;
/** How many of the leading pages get headings at all. */
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
    .map((sub) => {
      const { pathname, hash } = new URL(sub.url, window.location.origin);
      // Path and anchor, no origin, so the row links the way a page row does.
      // The anchor is the whole point of a section row.
      return { title: sub.title, url: pathname + hash };
    });
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

/** Whether the query is this page's own name, by its title or its URL slug. */
function names(hit: { url: string; title: string }, term: string) {
  const wanted = comparable(term);
  const slug = segments(hit.url).pop() ?? '';
  return (
    comparable(hit.title) === wanted ||
    comparable(slug.replace(/-/g, ' ')) === wanted
  );
}

/**
 * Reorders results so a section's own page beats the pages inside it. BM25 has
 * no notion of a site's shape, so a bare section name otherwise ranks the pages
 * inside the section above the section itself.
 *
 * A page the query *names* — by title or by the last segment of its URL — wins
 * outright; the rest are ordered by score discounted per path segment.
 * Pagefind's own levers are no substitute. `ranking.pageLength` at 0.9 and 1.0
 * reordered the raw results for 12 of 20 section queries and changed the final
 * order for none of them; `data-pagefind-weight` on the h1 measured as no change
 * at all.
 *
 * Reaches only the results already fetched, which is what `namedPage` below is
 * for: a page ranked past `PAGE_SIZE` on raw score cannot be rescued here.
 */
function byNameThenDepth<
  T extends { score: number; url: string; title: string },
>(hits: T[], term: string): T[] {
  const DEPTH_PENALTY = 0.12;

  return hits
    .map((hit) => ({
      hit,
      named: names(hit, term) ? 1 : 0,
      adjusted: hit.score / (1 + DEPTH_PENALTY * segments(hit.url).length),
    }))
    .sort((a, b) => b.named - a.named || b.adjusted - a.adjusted)
    .map((entry) => entry.hit);
}

/** A stub's score paired with its fetched fragment, which is where the URL is. */
type Hit = {
  fragment: PagefindFragment;
  score: number;
  url: string;
  title: string;
};

/**
 * Fetches the fragment for each stub. A fragment that fails takes its own row
 * out rather than the whole result set.
 */
async function hydrate(stubs: PagefindResultStub[]): Promise<Hit[]> {
  const settled = await Promise.allSettled(stubs.map((stub) => stub.data()));

  return settled.flatMap((outcome, at) => {
    if (outcome.status === 'rejected') {
      console.error(
        '[docs-search] dropped a result whose fragment failed',
        outcome.reason
      );
      return [];
    }

    const fragment = outcome.value;
    const { pathname } = new URL(fragment.url, window.location.origin);
    return [
      {
        fragment,
        score: stubs[at].score,
        url: pathname,
        title: fragment.meta?.title ?? pathname,
      },
    ];
  });
}

/**
 * One page of rows, ordered within itself. `from` is how many rows already
 * precede them, which is what keeps the headings on the leading pages of the
 * list rather than on the leading rows of every page.
 */
function rows(hits: Hit[], term: string, from: number): SearchResult[] {
  return byNameThenDepth(hits, term).map((hit, rank) => ({
    url: hit.url,
    title: hit.title,
    // Already carries <mark> around the hits, and Pagefind escapes the
    // surrounding text itself.
    excerpt: hit.fragment.excerpt,
    breadcrumb: breadcrumbFrom(hit.url),
    sections:
      from + rank < ROWS_WITH_SECTIONS ? sectionsOf(hit.fragment) : undefined,
    ...classify(hit.url),
  }));
}

/**
 * The page the query names, when the first page of results missed it.
 *
 * `byNameThenDepth` can only promote what has been fetched, and a section's own
 * page can rank far below the pages inside it: `/docs/infrastructure/
 * deployment-targets/` is 36th for "deployment targets", six places past the
 * page size. These stubs come from a search narrowed to the shallow pages alone,
 * where the page a query names sits near the top of a few hundred candidates.
 *
 * Only called when nothing already fetched names the query, so the extra
 * fragments are paid for by the queries that need them and no others.
 */
async function namedPage(
  stubs: PagefindResultStub[],
  term: string,
  already: Hit[]
): Promise<Hit | null> {
  const seen = new Set(already.map((hit) => hit.url));
  const candidates = await hydrate(stubs.slice(0, LANDING_CANDIDATES));

  return (
    candidates.find((hit) => names(hit, term) && !seen.has(hit.url)) ?? null
  );
}

export function pagefindEngine(bundlePath: string): SearchEngine {
  let loading: Promise<PagefindApi | null> | null = null;
  // Everything the last search matched, and how much of it has been handed over.
  // A stub is a score and a promise of its fragment, so holding a thousand of
  // them costs nothing and saves searching again to show row thirty-one.
  let page: { term: string; stubs: PagefindResultStub[]; at: number } | null =
    null;

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
          ranking: { metaWeights: { title: 8 } },
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

        // Three searches at once, because a second await here would sit in front
        // of every fragment fetch below it. The first supplies the rows; the
        // second says whether the query has any answer at all, and only runs
        // while a tab is narrowing the first; the third is the shallow-page
        // shortlist `namedPage` draws on, which costs nothing until its
        // fragments are fetched.
        const [response, wholeCorpus, landing] = await Promise.all([
          api.search(query, { filters }),
          filters ? api.search(query) : null,
          api.search(query, { filters: { ...filters, landing: ['true'] } }),
        ]);
        const unfiltered = wholeCorpus ?? response;

        // Counts come from the whole match set rather than the filtered one, so
        // the strip keeps showing what the other tabs hold while one is selected.
        const counts: Record<string, number> = {
          all: response.unfilteredResultCount,
          ...(response.totalFilters?.section ?? {}),
        };

        // Two questions, and the floor answers both. Nothing in the corpus is a
        // real answer, so offer nothing and advertise nothing.
        if ((unfiltered.results[0]?.score ?? 0) < MINIMUM_SCORE) {
          page = null;
          return empty;
        }

        // The corpus answers it and this tab does not. Filtering only removes
        // documents, so the survivors here can be accidents scoring far below
        // anything the reader asked for. Keep the counts, so the strip still
        // shows which tab holds the answer.
        if ((response.results[0]?.score ?? 0) < MINIMUM_SCORE) {
          page = null;
          return { results: [], counts };
        }

        page = { term: query, stubs: response.results, at: PAGE_SIZE };
        const hits = await hydrate(response.results.slice(0, PAGE_SIZE));

        const named = hits.some((hit) => names(hit, query))
          ? null
          : await namedPage(landing.results, query, hits);
        if (named) hits.push(named);

        return {
          results: rows(hits, query, 0),
          counts,
          total: response.results.length + (named ? 1 : 0),
        };
      } catch (error) {
        // The search itself failed, rather than one row of it. Rejecting would
        // leave the previous query's rows under the new text.
        console.error('[docs-search] search failed', error);
        page = null;
        return empty;
      }
    },

    async more() {
      if (!page) return [];

      const slice = page.stubs.slice(page.at, page.at + PAGE_SIZE);
      if (slice.length === 0) return [];

      const from = page.at;
      page.at += slice.length;

      try {
        return rows(await hydrate(slice), page.term, from);
      } catch (error) {
        // The rows already on screen are still good, so this fails quietly and
        // leaves them alone.
        console.error('[docs-search] could not load more results', error);
        return [];
      }
    },
  };
}

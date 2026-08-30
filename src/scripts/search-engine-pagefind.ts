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

// Rows fetched at a time, and a fragment fetch for each one. Pagefind's own UI
// shows five and offers the rest on demand; twenty, because `byNameThenDepth`
// reorders within a page and needs enough of the list to have something to
// reorder, and because a reader who has scrolled past twenty rows is served
// better by a narrower query than by row twenty-one.
const PAGE_SIZE = 20;

// Above this share of the corpus, a query is too general to rank rather than
// unanswerable, and the overlay says so instead of reporting nothing found.
//
// `octopus` is on 1177 of 1251 pages and scores 0.87, where the weakest genuine
// query scores 9.5: BM25's IDF term collapses when a word is everywhere. Score
// alone cannot tell that from a keyboard mash, and neither can the share on its
// own — `asdfgh` matches 932 pages, because Pagefind scores partial matches. What
// separates them is that the mashes stop at 74.5% and the real words start at
// 79%. A mash landing on the gentler message costs nothing; both offer no rows.
const COMMON_TERM_SHARE = 0.8;

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
// screenful. Three headings per page made two thirds of the list headings.
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

// Words that mean the reader wants the reference rather than the guides. Every
// CLI page is titled `octopus <something>`, so a query opening that way counts as
// asking for one.
const ASKS_FOR_REFERENCE =
  /(^octopus\s)|\b(api|cli|rest|endpoints?|curl|commands?|octo|sdk|swagger)\b/;

/** How far a reference page's score is discounted when the query did not ask for
 *  one. Swept over both traffic-weighted query sets: 1.3 is the knee, and 4.0
 *  buys one more task query at the cost of four points on real-searches. */
const REFERENCE_PENALTY = 1.3;

const REFERENCE_FACETS = new Set(['api', 'cli']);

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
 * Whether a page gets to win outright for being the one the query names.
 *
 * Reference pages have to be asked for. Three CLI pages carry the slug
 * `create-release`, so `create release` would otherwise promote one of them over
 * Creating a release, which is the page the reader wanted.
 */
function claimsName(hit: { url: string; title: string }, term: string) {
  if (!names(hit, term)) return false;
  return (
    !REFERENCE_FACETS.has(classify(hit.url).facet) ||
    ASKS_FOR_REFERENCE.test(term.toLowerCase())
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
  const asked = ASKS_FOR_REFERENCE.test(term.toLowerCase());
  const demoted = (hit: T) =>
    !asked && REFERENCE_FACETS.has(classify(hit.url).facet);

  return hits
    .map((hit) => ({
      hit,
      named: claimsName(hit, term) ? 1 : 0,
      adjusted:
        hit.score /
        (1 + DEPTH_PENALTY * segments(hit.url).length) /
        (demoted(hit) ? REFERENCE_PENALTY : 1),
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
    candidates.find((hit) => claimsName(hit, term) && !seen.has(hit.url)) ??
    null
  );
}

export function pagefindEngine(bundlePath: string): SearchEngine {
  let loading: Promise<PagefindApi | null> | null = null;
  // Everything the last search matched, and how much of it has been handed over.
  // A stub is a score and a promise of its fragment, so holding a thousand of
  // them costs nothing and saves searching again to show row twenty-one.
  // `promoted` is the page `namedPage` pulled forward, whose own stub is still
  // waiting further down `stubs`.
  let page: {
    term: string;
    stubs: PagefindResultStub[];
    at: number;
    promoted: string | null;
  } | null = null;
  // Which search owns `page`. Searches run concurrently and can settle out of
  // order, and an overtaken one must not leave its stubs behind for `more()`.
  let searches = 0;
  // Pages in the index, read off the filter counts when the index loads.
  let corpus = 0;

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
        // counts until it has been pulled down. Its section totals also add up to
        // the size of the corpus, which is what `COMMON_TERM_SHARE` is a share of.
        const filters = await api.filters();
        corpus = Object.values(filters.section ?? {}).reduce(
          (total, count) => total + count,
          0
        );
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

      // The caller drops the rows of an overtaken search; this is the same guard
      // for the paging state behind them.
      const mine = ++searches;
      const settle = (next: typeof page) => {
        if (mine === searches) page = next;
      };

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

        // Asked of the whole corpus, and only once. A tab is not asked again: the
        // counts come from Pagefind in one pass and take no notice of the floor,
        // so a second check here would leave the strip offering a result the
        // panel then withheld — `kubernetes` advertised one API page and showed
        // none. A tab with nothing in it is already handled by its count, which
        // sends the reader back to All.
        if ((unfiltered.results[0]?.score ?? 0) < MINIMUM_SCORE) {
          settle(null);
          // Everything matched it equally, so there is nothing to rank rather
          // than nothing to find. Ordering thirty pages by a score of 0.87 would
          // be arbitrary, so the overlay says the query is too broad instead.
          const share = corpus > 0 ? unfiltered.results.length / corpus : 0;
          return share > COMMON_TERM_SHARE
            ? { ...empty, tooBroad: true }
            : empty;
        }

        const hits = await hydrate(response.results.slice(0, PAGE_SIZE));

        const named = hits.some((hit) => claimsName(hit, query))
          ? null
          : await namedPage(landing.results, query, hits);
        if (named) hits.push(named);

        // A promoted page was fetched precisely because its own stub ranks past
        // `PAGE_SIZE`, so that stub is still ahead of `more()` and has to be
        // skipped there rather than drawn a second time.
        settle({
          term: query,
          stubs: response.results,
          at: PAGE_SIZE,
          promoted: named?.url ?? null,
        });

        return {
          // The promoted page is already one of these stubs, so counting them
          // is counting the rows the query has in all.
          results: rows(hits, query, 0),
          counts,
          total: response.results.length,
        };
      } catch (error) {
        // The search itself failed, rather than one row of it. Rejecting would
        // leave the previous query's rows under the new text.
        console.error('[docs-search] search failed', error);
        settle(null);
        return empty;
      }
    },

    async more() {
      if (!page) return [];

      // Read off before the await: a search landing in the meantime replaces
      // `page`, and these rows still belong to the query that asked for them.
      const { term, promoted } = page;
      const slice = page.stubs.slice(page.at, page.at + PAGE_SIZE);
      if (slice.length === 0) return [];

      const from = page.at;
      page.at += slice.length;

      try {
        const hits = (await hydrate(slice)).filter(
          (hit) => hit.url !== promoted
        );
        return rows(hits, term, from);
      } catch (error) {
        // The rows already on screen are still good, so this fails quietly and
        // leaves them alone.
        console.error('[docs-search] could not load more results', error);
        return [];
      }
    },
  };
}

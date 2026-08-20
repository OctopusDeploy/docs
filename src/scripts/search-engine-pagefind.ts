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

// Rows fetched at a time. The panel shows about five, and the rest arrive as it
// is scrolled. Ranking no longer needs them, so this is only a drawing budget:
// ten covers the first screen with room to scroll into.
const PAGE_SIZE = 10;

/** The map of result id to url and title, written beside the index at build. */
const TITLE_MAP = 'docs-titles.json';

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
 * Runs over every result, because `rank` supplies url and title from the title
 * map and nothing here has to be fetched. So a page the query names wins from
 * anywhere in the list — `/docs/infrastructure/deployment-targets/` is 36th on
 * raw score for "deployment targets" and still comes first.
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
/** Everything ranking needs, and nothing that has to be fetched to get it. */
type Ranked = {
  stub: PagefindResultStub;
  score: number;
  url: string;
  title: string;
};

type TitleMap = Record<string, [url: string, title: string] | undefined>;

/**
 * Pairs each result with its url and title from the map, so the whole set can be
 * ranked before anything is fetched.
 *
 * A result the map does not know is dropped from ranking. That only happens when
 * the map and the index disagree, which means a stale deploy of one of them; the
 * caller falls back to ranking what it fetches.
 */
function rank(
  stubs: PagefindResultStub[],
  titles: TitleMap,
  term: string,
  prefix: string
): Ranked[] {
  const known = stubs.flatMap((stub) => {
    const entry = titles[stub.id];
    if (!entry) return [];
    // The map holds urls as the index does, relative to the indexed directory.
    // Pagefind applies the same prefix to the urls it returns from `data()`.
    const [path, title] = entry;
    const url = prefix + path;
    return [{ stub, score: stub.score, url, title: title || url }];
  });

  return byNameThenDepth(known, term);
}

/**
 * Draws a slice of the ranked list, fetching a fragment for each row in it. The
 * fragment supplies the excerpt and the matched headings; the order was settled
 * before any of it was asked for.
 *
 * `from` is how many rows already precede these, which keeps the headings on the
 * leading rows of the list rather than the leading rows of every batch.
 */
async function draw(
  ranked: Ranked[],
  from: number,
  count: number
): Promise<SearchResult[]> {
  const slice = ranked.slice(from, from + count);
  const settled = await Promise.allSettled(slice.map((hit) => hit.stub.data()));

  return settled.flatMap((outcome, at) => {
    if (outcome.status === 'rejected') {
      console.error(
        '[docs-search] dropped a result whose fragment failed',
        outcome.reason
      );
      return [];
    }

    const hit = slice[at];
    const fragment = outcome.value;
    // The fragment is the fallback for both: without the title map, `rank` has
    // no url or title to give and the fragment is the only source.
    const { pathname } = new URL(fragment.url, window.location.origin);
    return [
      {
        url: hit.url || pathname,
        title: hit.title || fragment.meta?.title || pathname,
        // Already carries <mark> around the hits, and Pagefind escapes the
        // surrounding text itself.
        excerpt: fragment.excerpt,
        breadcrumb: breadcrumbFrom(hit.url || pathname),
        sections:
          from + at < ROWS_WITH_SECTIONS ? sectionsOf(fragment) : undefined,
        ...classify(hit.url || pathname),
      },
    ];
  });
}

export function pagefindEngine(bundlePath: string): SearchEngine {
  let loading: Promise<PagefindApi | null> | null = null;
  // The last search's whole result set, already ranked, and how much of it has
  // been drawn. Ranking the tail costs nothing because it needs no fetches, so
  // `more()` only has to draw the next slice.
  let page: { term: string; ranked: Ranked[]; at: number } | null = null;
  // The map from result id to url and title, fetched once with the index.
  let titles: TitleMap | null = null;
  // What Pagefind prepends to the urls it returns, and therefore what the map's
  // own relative urls need. `/docs/pagefind/` leaves `/docs`.
  const urlPrefix = bundlePath.replace(/\/?pagefind\/?$/, '');
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
        const [filters] = await Promise.all([
          api.filters(),
          // Ranking reads url and title out of this, so it has to be here before
          // the first search returns. A failure leaves it null and ranking falls
          // back to ordering the rows it draws.
          fetch(`${bundlePath}${TITLE_MAP}`)
            .then((response) => (response.ok ? response.json() : null))
            .then((map: TitleMap | null) => {
              titles = map;
            })
            .catch((error) => {
              console.error(`[docs-search] could not load ${TITLE_MAP}`, error);
            }),
        ]);
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

        // Together, because a second await here would sit in front of every
        // fragment fetch below it. The first supplies the rows; the second says
        // whether the query has any answer at all, and only runs while a tab is
        // narrowing the first.
        const [response, wholeCorpus] = await Promise.all([
          api.search(query, { filters }),
          filters ? api.search(query) : null,
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

        // Every match is ranked here, whether it will be drawn or not. A page
        // the query names wins from anywhere in the list, which is what the
        // shallow-page search used to be for.
        const ranked = titles
          ? rank(response.results, titles, query, urlPrefix)
          : [];

        // The map was missing or disagreed with the index. Ranking what gets
        // drawn is worse than ranking everything, and it still answers.
        const fallback =
          ranked.length === 0 && response.results.length > 0
            ? response.results.map((stub) => ({
                stub,
                score: stub.score,
                url: '',
                title: '',
              }))
            : null;
        if (fallback) {
          console.error(
            `[docs-search] ranking without ${TITLE_MAP}: ${response.results.length} results, none of them in the map`
          );
        }

        const ordered = fallback ?? ranked;
        settle({ term: query, ranked: ordered, at: PAGE_SIZE });

        return {
          results: await draw(ordered, 0, PAGE_SIZE),
          counts,
          total: ordered.length,
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
      const { ranked } = page;
      const from = page.at;
      if (from >= ranked.length) return [];

      page.at = Math.min(from + PAGE_SIZE, ranked.length);

      try {
        return await draw(ranked, from, PAGE_SIZE);
      } catch (error) {
        // The rows already on screen are still good, so this fails quietly and
        // leaves them alone.
        console.error('[docs-search] could not load more results', error);
        return [];
      }
    },
  };
}

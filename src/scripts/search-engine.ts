// The seam between the search overlay and whatever indexes the site. `DocsSearch`
// only ever talks to a `SearchEngine`, so swapping the index out is a matter of
// supplying a different implementation.

/** A heading inside a result that matched in its own right. */
export type SearchSubResult = {
  /** The heading text. */
  title: string;
  /** The page URL with the heading's `#anchor`, so the reader lands on it. */
  url: string;
};

export type SearchResult = {
  url: string;
  title: string;
  /** May contain `<mark>` around the matched terms; the overlay trusts it. */
  excerpt: string;
  breadcrumb: string[];
  kind: 'page' | 'command';
  facet: string;
  /**
   * Headings within the page that matched, deepest-matching first. Only engines
   * that index per-heading can fill this: Pagefind returns them for free, while
   * Orama would need the index chunked per heading to know anything about them.
   * An empty array means the engine has nothing to say, never that the page has
   * no headings.
   */
  sections?: SearchSubResult[];
};

export type SearchResponse = {
  results: SearchResult[];
  /** Result totals per facet key, plus `all`, for the tab strip. */
  counts: Record<string, number>;
};

export type SearchEngine = {
  search(query: string, facet?: string): Promise<SearchResponse>;
  /** Optional: start loading the index before the first query needs it. */
  warm?(): void;
  /**
   * Whether `warm()` is cheap enough to run on page load rather than when the
   * overlay opens. Pagefind pays about 118KB for its runtime and fetches the
   * rest per query; Orama pays for its whole index parsed and restored, on
   * every navigation, for every visitor including the majority who never
   * search. The answer differs by engine, so the engine states it.
   */
  eager?: boolean;
  /**
   * Optional: fetch what this query will need without running it. Called while
   * the reader is still typing, ahead of the debounced search.
   */
  preload?(query: string): void;
};

export type Facet = { key: string; label: string };

// Mirrored by the tab strip in `DocsSearch.astro`. `all` is not listed here
// because it is not a section a page can belong to.
export const FACETS: Facet[] = [
  { key: 'docs', label: 'Docs' },
  { key: 'api', label: 'API' },
  { key: 'cli', label: 'CLI' },
  { key: 'integrations', label: 'Integrations' },
];

// Longest-match-first: every CLI page also sits under the REST API tree, so the
// CLI prefixes have to be tested before the API one they are nested in.
const SECTIONS: {
  facet: string;
  kind: SearchResult['kind'];
  prefix: RegExp;
}[] = [
  {
    facet: 'cli',
    kind: 'command',
    prefix:
      /^\/docs\/octopus-rest-api\/(cli|octopus-cli|[a-z.]+-command-line)(\/|$)/,
  },
  { facet: 'api', kind: 'command', prefix: /^\/docs\/octopus-rest-api(\/|$)/ },
  {
    facet: 'integrations',
    kind: 'page',
    prefix: /^\/docs\/api-and-integration(\/|$)/,
  },
];

/**
 * Which tab a result belongs under, and which glyph it gets, worked out from its
 * path. Anything that matches no section is ordinary documentation.
 */
export function classify(pathname: string): {
  facet: string;
  kind: SearchResult['kind'];
} {
  const section = SECTIONS.find((s) => s.prefix.test(pathname));
  return section
    ? { facet: section.facet, kind: section.kind }
    : { facet: 'docs', kind: 'page' };
}

/** Tallies the tab numbers. Counting happens before any facet is applied, so the
 *  strip keeps showing what the other tabs hold while one of them is selected. */
export function countByFacet(results: SearchResult[]): Record<string, number> {
  const counts: Record<string, number> = { all: results.length };
  for (const facet of FACETS) counts[facet.key] = 0;
  for (const result of results) counts[result.facet]++;
  return counts;
}

/**
 * Turns `/docs/deployments/patterns/blue-green` into
 * `['Deployments', 'Patterns']` — the trail above the page, without the page
 * itself or the `docs` root, title-cased the way the old results list did it.
 */
export function breadcrumbFrom(pathname: string): string[] {
  return pathname
    .split('/')
    .filter(Boolean)
    .slice(1, -1)
    .map((segment) =>
      segment.replace(/-/g, ' ').replace(/^./, (first) => first.toUpperCase())
    );
}

/** Serves a fixed list, for the component showcase and for tests. */
export function fixtureEngine(results: SearchResult[]): SearchEngine {
  return {
    async search(query, facet) {
      const term = query.trim().toLowerCase();
      const matched = term
        ? results.filter(
            (result) =>
              result.title.toLowerCase().includes(term) ||
              result.excerpt.toLowerCase().includes(term)
          )
        : results;

      return {
        counts: countByFacet(matched),
        results:
          facet && facet !== 'all'
            ? matched.filter((result) => result.facet === facet)
            : matched,
      };
    },
  };
}

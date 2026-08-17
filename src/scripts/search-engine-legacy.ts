// The current search, behind the `SearchEngine` seam: one build-time JSON of
// titles, headings, descriptions, tags and an extracted keyword bag, scored in
// the browser. The scoring is carried over unchanged from the results list this
// replaces, so the overlay returns exactly what the old dropdown returned.
//
// Body text is not in the index, which is the ceiling on how good this can be
// and the reason the Pagefind and Orama spikes exist.

import { contains, explode, highlight, sanitise } from './modules/string.js';
import { stemmer } from './modules/stemmer.js';
import {
  breadcrumbFrom,
  classify,
  countByFacet,
  type SearchEngine,
  type SearchResult,
} from './search-engine';

type Heading = { text: string; slug: string; safeText: string };

type Entry = {
  title: string;
  safeTitle: string;
  description: string;
  keywords: string;
  tags: string[];
  headings: Heading[];
  url: string;
  depth: number;
};

type Scored = Entry & {
  score: number;
  foundWords: number;
  foundTerms: string[];
};

// Phrase and per-term weights, verbatim from the list this replaces.
const SCORING = {
  depth: 5,
  phraseTitle: 60,
  phraseHeading: 20,
  phraseDescription: 20,
  termTitle: 40,
  termHeading: 15,
  termDescription: 15,
  termTags: 15,
  termKeywords: 15,
};

const WORD_SCORES = {
  titleExact: 20,
  titleContains: 15,
  headingContains: 10,
  contentContains: 1,
};

const RESULT_LIMIT = 30;

async function getSynonyms(): Promise<Record<string, string>> {
  try {
    return (await import('./synonyms.js')).synonyms;
  } catch {
    return {};
  }
}

/** Terms reach `highlight()` as a regular expression, so a query like `c++`
 *  would throw before anything was drawn. */
function escapeForRegExp(term: string) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** The excerpt is set as HTML so the `<mark>` around each hit survives. Escaping
 *  first means those marks are the only tags that can ever reach the DOM. */
function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function expand(query: string) {
  const synonyms = await getSynonyms();
  const terms: string[] = [];

  for (const term of explode(query)) {
    const synonym = synonyms[term];
    // An empty synonym is a stop word: drop the term rather than expanding it.
    if (synonym === '') continue;
    terms.push(term);
    if (synonym) terms.push(...synonym.split(' '));
  }

  const stemmed = terms
    .map((term) => stemmer(term))
    .filter((stem) => !terms.includes(stem));

  return { terms, allTerms: [...terms, ...stemmed] };
}

function score(entry: Entry, query: string, allTerms: string[]): Scored {
  const scored: Scored = { ...entry, score: 0, foundWords: 0, foundTerms: [] };

  // Phrase matches: the whole query, found intact
  if (scored.safeTitle === query) scored.foundWords += WORD_SCORES.titleExact;

  if (contains(scored.safeTitle, query)) {
    scored.score += SCORING.phraseTitle;
    scored.foundWords += WORD_SCORES.titleContains;
  }

  for (const heading of scored.headings) {
    if (contains(heading.safeText, query)) {
      scored.score += SCORING.phraseHeading;
      scored.foundWords += WORD_SCORES.headingContains;
    }
  }

  if (contains(scored.description, query)) {
    scored.score += SCORING.phraseDescription;
    scored.foundWords += WORD_SCORES.contentContains;
  }

  // Term matches: each word of the query, found anywhere
  for (const term of allTerms) {
    let found = false;

    if (contains(scored.safeTitle, term)) {
      scored.score += SCORING.termTitle;
      scored.foundWords += WORD_SCORES.headingContains / 2;
      found = true;
    }

    for (const heading of scored.headings) {
      if (contains(heading.safeText, term)) {
        scored.score += SCORING.termHeading;
        found = true;
      }
    }

    if (contains(scored.description, term)) {
      scored.score += SCORING.termDescription;
      found = true;
    }

    for (const tag of scored.tags) {
      if (contains(tag, term)) {
        scored.score += SCORING.termTags;
        found = true;
      }
    }

    if (contains(scored.keywords, term)) {
      scored.score += SCORING.termKeywords;
      found = true;
    }

    if (found) {
      scored.foundWords++;
      if (!scored.foundTerms.includes(term)) scored.foundTerms.push(term);
    }
  }

  // Shallow pages win ties: /docs/features over /docs/features/a/b
  if (scored.score > 0) {
    if (scored.depth < 5) {
      scored.score += SCORING.depth;
      scored.foundWords++;
    }
    if (scored.depth < 4) {
      scored.score += SCORING.depth;
      scored.foundWords++;
    }
  }

  return scored;
}

function byRelevance(a: Scored, b: Scored) {
  if (b.foundTerms.length !== a.foundTerms.length) {
    return b.foundTerms.length - a.foundTerms.length;
  }
  if (b.foundWords !== a.foundWords) return b.foundWords - a.foundWords;
  return b.score - a.score;
}

export function legacyEngine(indexUrl: string): SearchEngine {
  // One fetch, on the first search rather than on page load, shared by every
  // search after it. The old list fetched 1.86MB the moment the script ran.
  let loading: Promise<Entry[]> | null = null;

  function load() {
    loading ??= fetch(indexUrl)
      .then((response) => response.json())
      .then((data: Record<string, any>[]) =>
        data.map((item) => ({
          title: item.title,
          safeTitle: sanitise(item.title),
          description: item.description ?? '',
          keywords: item.keywords ?? '',
          tags: (item.tags ?? []).map((tag: string) => sanitise(tag)),
          headings: (item.headings ?? []).map((heading: Heading) => ({
            ...heading,
            safeText: sanitise(heading.text),
          })),
          url: item.url,
          depth: item.url.match(/\//g)?.length ?? 0,
        }))
      )
      .catch(() => {
        // A failed load must not poison every later search.
        loading = null;
        return [] as Entry[];
      });

    return loading;
  }

  return {
    warm: load,

    async search(rawQuery, facet) {
      // Chained words are joined, so `System.Text` searches as `systemtext`.
      const query = sanitise(rawQuery.replace(/\./g, ' '));
      if (!query) return { results: [], counts: countByFacet([]) };

      const [haystack, { terms, allTerms }] = await Promise.all([
        load(),
        expand(query),
      ]);

      const highlightTerms = terms.map(escapeForRegExp);

      const matched = haystack
        .map((entry) => score(entry, query, allTerms))
        .filter((entry) => entry.score > 0)
        .sort(byRelevance)
        .slice(0, RESULT_LIMIT)
        .map((entry): SearchResult => {
          // Same-origin results become paths so they navigate without a round
          // trip through the absolute URL the index stores.
          const address = new URL(entry.url, window.location.origin);
          const path = address.pathname;

          return {
            url: address.origin === window.location.origin ? path : entry.url,
            title: entry.title,
            excerpt: highlight(escapeHtml(entry.description), highlightTerms),
            breadcrumb: breadcrumbFrom(path),
            ...classify(path),
          };
        });

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

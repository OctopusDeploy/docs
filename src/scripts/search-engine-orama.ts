// Orama behind the `SearchEngine` seam.
//
// Unlike Pagefind, the whole index is downloaded and restored into memory before
// the first query can run — there is no per-query fetch at all after that. That
// is the trade the spike exists to measure: a larger up-front cost against zero
// marginal cost, on a corpus this size.
//
// Restore is CPU-bound and would block the main thread, so it happens in a
// worker and queries are messaged across.

import {
  classify,
  type SearchEngine,
  type SearchResult,
} from './search-engine';

const RESULT_LIMIT = 30;

type WorkerHit = {
  url: string;
  title: string;
  description: string;
  body: string;
  trail: string;
};

type WorkerReply = {
  id: number;
  hits?: WorkerHit[];
  /** Per-section totals across the whole match set, plus `all`. */
  counts?: Record<string, number>;
  error?: string;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeForRegExp(term: string) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * A window of body text around the first term that matched, with the terms
 * marked. Orama returns whole documents rather than excerpts, so the result row
 * has to cut its own.
 */
function excerptFrom(hit: WorkerHit, terms: string[]) {
  const pattern = new RegExp(terms.map(escapeForRegExp).join('|'), 'i');

  // Whichever field the query actually hit. Preferring the description outright
  // showed every page with a subtitle its subtitle, even when the match that
  // earned it its rank was in the body.
  //
  // `||` rather than `??` on the fallback, and body before description: 1,200 of
  // the 1,254 documents have an empty description, and `??` treats "" as a value
  // to keep, so it won every time and blocked the fallback to body.
  //
  // The fallback runs more often than it looks. The index matches stemmed terms
  // and this matches literally, so "guided failures" legitimately ranks a page
  // whose text only ever says "guides" — the regex then finds nothing. Opening
  // the page text is the right answer there; it just arrives unhighlighted.
  const matched = [hit.body, hit.description].find(
    (text) => text && pattern.test(text)
  );
  const source = matched || hit.body || hit.description;
  if (!source) return '';

  const at = source.search(pattern);
  const from = at > 60 ? source.lastIndexOf(' ', at - 60) + 1 : 0;
  const window = source.slice(from, from + 180);

  const text = escapeHtml((from > 0 ? '…' : '') + window);
  return text.replace(
    new RegExp(terms.map(escapeForRegExp).join('|'), 'gi'),
    (match) => `<mark>${match}</mark>`
  );
}

export function oramaEngine(indexUrl: string): SearchEngine {
  let worker: Worker | null = null;
  let nextId = 0;
  const pending = new Map<number, (reply: WorkerReply) => void>();

  function load() {
    if (worker) return;

    worker = new Worker(new URL('./orama-worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.addEventListener('message', (event: MessageEvent<WorkerReply>) => {
      pending.get(event.data.id)?.(event.data);
      pending.delete(event.data.id);
    });
    worker.postMessage({ type: 'load', indexUrl });
  }

  function ask(query: string, facet?: string) {
    load();
    const id = nextId++;

    return new Promise<WorkerReply>((resolve) => {
      pending.set(id, resolve);
      worker!.postMessage({ type: 'search', id, query, facet, limit: 200 });
    });
  }

  return {
    warm: load,

    async search(rawQuery, facet) {
      const query = rawQuery.trim();
      const empty = { results: [], counts: { all: 0 } };
      if (!query) return empty;

      // The worker applies the facet and reports the counts, because both need
      // the whole match set and it is the only side that has it.
      const reply = await ask(query, facet);
      if (reply.error || !reply.hits || !reply.counts) return empty;

      const terms = query.split(/\s+/).filter((term) => term.length > 1);

      const results = reply.hits.map((hit): SearchResult => {
        const path = new URL(hit.url, window.location.origin).pathname;
        return {
          url: path,
          title: hit.title || path,
          excerpt: excerptFrom(hit, terms.length > 0 ? terms : [query]),
          breadcrumb: hit.trail ? hit.trail.split(' / ') : [],
          ...classify(path),
        };
      });

      return {
        results: results.slice(0, RESULT_LIMIT),
        counts: reply.counts,
      };
    },
  };
}

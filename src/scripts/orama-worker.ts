// Holds the Orama index off the main thread.
//
// Restoring a serialized index is CPU-bound and proportional to the corpus, so
// on the main thread it would freeze the page for as long as it takes. The
// overlay is open and taking keystrokes while this runs.
//
// Core `create` + `load` rather than @orama/plugin-data-persistence: the plugin
// reaches for Node's filesystem and buffers, and bundling it for a browser
// worker fails at import time.

import { create, load, search } from '@orama/orama';

type LoadMessage = { type: 'load'; indexUrl: string };
type SearchMessage = {
  type: 'search';
  id: number;
  query: string;
  limit: number;
};

// Has to match the schema the index was built with, or `load` restores an index
// the search side cannot read.
const SCHEMA = {
  url: 'string',
  title: 'string',
  description: 'string',
  body: 'string',
  trail: 'string',
  section: 'enum',
} as const;

let indexUrl = '';
let ready: Promise<unknown> | null = null;

function open() {
  ready ??= fetch(indexUrl)
    .then((response) => response.json())
    .then((raw) => {
      const db = create({ schema: SCHEMA });
      load(db, raw);
      return db;
    })
    .catch((error) => {
      // A failed load must not poison every later search.
      ready = null;
      throw error;
    });

  return ready;
}

self.addEventListener(
  'message',
  async (event: MessageEvent<LoadMessage | SearchMessage>) => {
    const message = event.data;

    if (message.type === 'load') {
      indexUrl = message.indexUrl;
      // Kicked off here so the download and restore overlap with typing; the
      // rejection is handled inside `open`.
      open().catch(() => {});
      return;
    }

    try {
      const db = await open();
      const results = await search(db as never, {
        term: message.query,
        limit: message.limit,
        // Body carries the most text and the least signal per word, so it is
        // weighted below the fields that name what a page is about.
        boost: { title: 4, description: 2, trail: 2, body: 1 },
        tolerance: 1,
      });

      self.postMessage({
        id: message.id,
        hits: results.hits.map((hit) => hit.document),
      });
    } catch (error) {
      self.postMessage({ id: message.id, error: String(error) });
    }
  }
);

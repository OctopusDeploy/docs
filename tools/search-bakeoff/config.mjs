// What the bake-off runs against, and the bar each target has to clear.
//
// All three targets serve the same `DocsSearch` overlay — the overlay merged to
// main before either spike branched — so one adapter drives all of them and the
// only thing that differs is the engine behind the seam. That is the whole
// reason a three-way comparison is cheap here.

export const TARGETS = [
  {
    key: 'legacy',
    label: 'Legacy (production)',
    base: 'https://octopus.com/docs/',
    // The one to beat. Whatever replaces it has to be better than this on
    // relevance, or the payload win is not worth the migration.
    baseline: true,
    // Everything the engine pulls down that the page itself would not.
    indexPatterns: [/\/docs\/search\.json(\?|$)/],
    // Fetched whole before the first query can run, so a cold search waits on
    // all of it.
    payloadUrls: ['https://octopus.com/docs/search.json'],
  },
  {
    key: 'pagefind',
    label: 'Pagefind (PR 3371)',
    base: 'https://stoctodocspr3371.z22.web.core.windows.net/docs/',
    indexPatterns: [/\/docs\/pagefind\//],
    // Only the runtime and the WASM are unconditional; index chunks are fetched
    // per query and are counted from the network trace instead.
    payloadUrls: [
      'https://stoctodocspr3371.z22.web.core.windows.net/docs/pagefind/pagefind.js',
      'https://stoctodocspr3371.z22.web.core.windows.net/docs/pagefind/wasm.en.pagefind',
      'https://stoctodocspr3371.z22.web.core.windows.net/docs/pagefind/pagefind-entry.json',
    ],
  },
  {
    key: 'orama',
    label: 'Orama (PR 3372)',
    base: 'https://stoctodocspr3372.z22.web.core.windows.net/docs/',
    indexPatterns: [/\/docs\/search-index\.json(\?|$)/, /orama-worker/],
    payloadUrls: [
      'https://stoctodocspr3372.z22.web.core.windows.net/docs/search-index.json',
    ],
  },
];

// The staging sites are Azure static website endpoints, which serve blobs
// verbatim — no content negotiation, no compression. Production sits behind a
// CDN that brotlis everything. Comparing measured wire bytes across the two
// would charge the spikes for their hosting rather than their index, so
// `payload.mjs` compresses each index locally and reports both numbers.
export const HOSTING = {
  compressed: new Set(['legacy']),
};

// Gates, not scores. A target that misses one of these is out regardless of how
// well it searches, and a target that clears them all is judged on relevance
// alone.
export const GATES = {
  // Fast 4G with a 4x CPU penalty, which is roughly a mid-range Android on a
  // good mobile connection.
  coldFirstResultMs: 2000,
  // Index already resident: the number that decides whether search feels
  // instant on the second query of a visit.
  warmFirstResultMs: 300,
  // The overlay searches on every keystroke, so this is the one users feel most.
  // The overlay's own 150ms debounce is inside this number and is identical on
  // all three targets, so the budget is that debounce plus 100ms of engine work.
  // Comparing targets to each other is the point; the absolute value is only
  // meaningful with the debounce in mind.
  keystrokeP95Ms: 250,
  // Twice the legacy wire payload. Legacy is 423KB brotli today, and the
  // payload is the defect the replacement exists to fix.
  indexWireBytes: 423331 * 2,
  // A restore that peaks above this gets tabs reaped on iOS Safari.
  peakHeapBytes: 150 * 1024 * 1024,
};

// Chrome's own Fast 4G preset. Kept explicit so a run can be reproduced.
export const NETWORK = {
  label: 'Fast 4G',
  downloadThroughput: (9000 * 1024) / 8,
  uploadThroughput: (1500 * 1024) / 8,
  latency: 85,
};

export const CPU_THROTTLE = 4;

// How long to wait for the result list to stop changing before reading it. The
// overlay debounces input by 150ms and races its own generations, so a shorter
// window reads a half-drawn list.
export const SETTLE = {
  quietMs: 300,
  // Orama downloads and restores 11MB before its first query returns, and under
  // network and CPU throttling that is tens of seconds. Only the first query of
  // a session pays it, but the timeout has to survive it.
  timeoutMs: 120_000,
  warmTimeoutMs: 15_000,
};

// Every query is also run truncated, because the overlay searches while you
// type and prefix behaviour is where fuzzy matching and prefix matching pull
// apart hardest. Full length is always run in addition to these.
export const PREFIX_LENGTHS = [3, 5];

export const RESULTS_DIR = new URL('./results/', import.meta.url);

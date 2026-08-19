// How much of Pagefind's per-query cost is fetching result fragments?
//
// `search()` returns lightweight stubs; the body, excerpt and metadata of each
// result arrive from a separate `data()` call per stub. `search-engine-pagefind.ts`
// calls it for all 30 results it might display, on every keystroke.
//
// Pagefind's own Component UI does not: its results list loads a result's data
// only when that row scrolls into view. If most of the per-query cost is those
// fetches, matching that behaviour is a larger win than anything left in the
// ranking configuration.
//
// Complication worth stating: the engine's reorder needs a URL and title, which
// only arrive with the fragment. Fetching fewer fragments shrinks the pool the
// reorder can draw from, so this measures cost against that reach.

import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { percentile } from './lib/score.mjs';

const BASE = process.env.BASE ?? TARGETS.find((t) => t.key === 'pagefind').base;
const TERMS = [
  'var',
  'vari',
  'variables',
  'tent',
  'tentacle',
  'runbook',
  'api',
  'config',
];
const DEPTHS = [0, 5, 10, 20, 30];

const NETWORK = {
  downloadThroughput: (9000 * 1024) / 8,
  uploadThroughput: (1500 * 1024) / 8,
  latency: 85,
};

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', {
  offline: false,
  ...NETWORK,
});
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 180_000 });
await page.evaluate(async (base) => {
  window.__pf = await import(`${base}pagefind/pagefind.js`);
  await window.__pf.options({
    basePath: `${base}pagefind/`,
    ranking: { metaWeights: { title: 8, trail: 0.5 } },
  });
  await window.__pf.filters();
  // Warm, so this is steady state rather than first-load.
  await window.__pf.search('octopus deployment');
}, BASE);

const rows = [];

for (const depth of DEPTHS) {
  const samples = [];
  for (const term of TERMS) {
    const ms = await page.evaluate(
      async ({ t, n }) => {
        const started = performance.now();
        const found = await window.__pf.search(t);
        if (n > 0) {
          await Promise.all(found.results.slice(0, n).map((s) => s.data()));
        }
        return performance.now() - started;
      },
      { t: term, n: depth }
    );
    samples.push(Math.round(ms));
  }
  rows.push({
    fragments: depth,
    median: Math.round(percentile(samples, 0.5)),
    p95: Math.round(percentile(samples, 0.95)),
    max: Math.max(...samples),
  });
}

await browser.close();

console.log('Per-query cost against how many result fragments are fetched.');
console.log('Fast 4G, 4x CPU, index already warm, debounce excluded.\n');
console.log(
  'fragments'.padEnd(12) +
    'median'.padStart(9) +
    'p95'.padStart(9) +
    'max'.padStart(9)
);
for (const row of rows) {
  const label = row.fragments === 0 ? 'none (stubs)' : String(row.fragments);
  console.log(
    label.padEnd(12) +
      `${row.median}ms`.padStart(9) +
      `${row.p95}ms`.padStart(9) +
      `${row.max}ms`.padStart(9)
  );
}

const none = rows.find((r) => r.fragments === 0);
const all = rows.find((r) => r.fragments === 30);
if (none && all) {
  console.log(
    `\nFetching 30 fragments accounts for ${all.median - none.median}ms of the ${all.median}ms median.`
  );
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./pagefind-fragment-cost.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), base: BASE, terms: TERMS, rows },
    null,
    2
  )
);

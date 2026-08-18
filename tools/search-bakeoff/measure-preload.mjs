// How much of the cold first search is recoverable by loading the index earlier?
//
// `docs-search.ts` starts the index loading when the overlay opens, so the
// measured cold first result includes the whole download and restore. Warming on
// page load instead would give that work a head start equal to however long the
// reader spends on the page before searching.
//
// This measures that directly: open the overlay to kick the load off, close it,
// wait, then reopen and search. The wait stands in for reading time, and the
// series shows how much lead time it takes for the cost to disappear.
//
// Cold cache and Fast 4G throttling throughout, so every run pays the full
// download once.

import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import {
  TARGETS,
  NETWORK,
  CPU_THROTTLE,
  SETTLE,
  RESULTS_DIR,
} from './config.mjs';
import {
  openOverlay,
  runQuery,
  armFirstResultClock,
  resetClock,
  readFirstResultMs,
} from './lib/overlay.mjs';

const QUERY = 'retention policy';
// Seconds of head start the index gets before the reader searches. Zero is what
// ships today.
const LEAD_TIMES = process.env.LEAD_TIMES
  ? process.env.LEAD_TIMES.split(',').map(Number)
  : [0, 2, 5, 10, 20];

// The staging hosts serve indexes uncompressed while production sits behind a
// brotli CDN, so a Fast 4G run charges Orama for 5.33MB it would never ship.
// Scaling the bandwidth by the compression ratio makes the index take the time
// its compressed self would take at Fast 4G. Everything else on the page speeds
// up too, so read the result as an estimate of production rather than a
// measurement of it.
const SPEEDUP = Number(process.env.BANDWIDTH_MULTIPLIER ?? 1);

const only = process.argv
  .filter((argument) => argument.startsWith('--target='))
  .map((argument) => argument.slice('--target='.length));
const targets =
  only.length > 0 ? TARGETS.filter((t) => only.includes(t.key)) : TARGETS;

const browser = await chromium.launch();
const rows = [];

for (const target of targets) {
  console.log(`\n=== ${target.label}`);

  for (const lead of LEAD_TIMES) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);

    await cdp.send('Network.enable');
    await cdp.send('Network.clearBrowserCache');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: NETWORK.downloadThroughput * SPEEDUP,
      uploadThroughput: NETWORK.uploadThroughput * SPEEDUP,
      latency: NETWORK.latency,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE });

    await page.goto(target.base, {
      waitUntil: 'domcontentloaded',
      timeout: 180_000,
    });

    // Opening the overlay is what calls `warm()`. Closing it again leaves the
    // load running, which is exactly the state a page-load warm would produce.
    await openOverlay(page);

    if (lead > 0) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(lead * 1000);
      await openOverlay(page);
    }

    await armFirstResultClock(page);
    await resetClock(page);
    await runQuery(page, QUERY, { timeoutMs: SETTLE.timeoutMs });
    const firstResultMs = await readFirstResultMs(page);

    rows.push({ target: target.key, leadSeconds: lead, firstResultMs });
    console.log(
      `  ${String(lead).padStart(2)}s head start  ->  first result ${Math.round(
        firstResultMs ?? -1
      )}ms`
    );

    await context.close();
  }
}

await browser.close();
await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./preload.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      network: NETWORK,
      cpuThrottle: CPU_THROTTLE,
      query: QUERY,
      note: 'Staging serves indexes uncompressed; see payload.json for what a CDN would ship.',
      rows,
    },
    null,
    2
  )
);

console.log(`\nwritten to ${new URL('./preload.json', RESULTS_DIR).pathname}`);

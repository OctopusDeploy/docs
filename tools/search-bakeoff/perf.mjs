// Timing and bytes, on a throttled connection and a throttled CPU.
//
// Runs strictly one target at a time and never in parallel: concurrent contexts
// contend for the same cores, and CPU contention is exactly what this is trying
// to measure.

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
  typeAndTime,
} from './lib/overlay.mjs';
import { percentile } from './lib/score.mjs';

const COLD_QUERY = 'kubernetes deployment';
const WARM_QUERY = 'retention policy';
// Short and common, so every keystroke has results to redraw rather than
// bottoming out on an empty list.
const TYPING_QUERIES = ['variables', 'runbooks', 'tentacle', 'lifecycles'];

/** Accumulates true wire bytes per response, which is what the user pays for. */
function traceBytes(cdp) {
  const urls = new Map();
  const seen = [];

  cdp.on('Network.responseReceived', (event) => {
    urls.set(event.requestId, {
      url: event.response.url,
      fromCache: event.response.fromDiskCache === true,
      encoding: event.response.headers?.['content-encoding'] ?? 'none',
    });
  });

  cdp.on('Network.loadingFinished', (event) => {
    const request = urls.get(event.requestId);
    if (request) seen.push({ ...request, bytes: event.encodedDataLength });
  });

  return seen;
}

function indexBytes(seen, target) {
  return seen
    .filter((row) =>
      target.indexPatterns.some((pattern) => pattern.test(row.url))
    )
    .reduce((total, row) => total + row.bytes, 0);
}

async function heapBytes(page) {
  // Chrome only exposes this with the right isolation headers, and the staging
  // sites do not send them. Null is an honest answer; `payload.mjs` reports the
  // parsed size instead, which is the number that drives it.
  return page.evaluate(() => performance.memory?.usedJSHeapSize ?? null);
}

const browser = await chromium.launch();
const measurements = [];

for (const target of TARGETS) {
  console.log(`\n=== ${target.label}`);

  // --- Cold -----------------------------------------------------------------
  // Fresh context, so no HTTP cache and no service worker: the first search of
  // a visitor's first visit.
  const cold = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const coldPage = await cold.newPage();
  const coldCdp = await cold.newCDPSession(coldPage);

  await coldCdp.send('Network.enable');
  await coldCdp.send('Network.clearBrowserCache');
  const coldTrace = traceBytes(coldCdp);
  await coldCdp.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: NETWORK.downloadThroughput,
    uploadThroughput: NETWORK.uploadThroughput,
    latency: NETWORK.latency,
  });
  await coldCdp.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE });

  await coldPage.goto(target.base, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });
  await openOverlay(coldPage);
  await armFirstResultClock(coldPage);
  await resetClock(coldPage);

  const coldStarted = Date.now();
  await runQuery(coldPage, COLD_QUERY, { timeoutMs: SETTLE.timeoutMs });
  const coldWall = Date.now() - coldStarted;
  const coldFirstResultMs = await readFirstResultMs(coldPage);

  // Second query on the same page: the index is resident, the network is still
  // throttled. This is what the rest of a visit feels like.
  await armFirstResultClock(coldPage);
  await resetClock(coldPage);
  await runQuery(coldPage, WARM_QUERY, { timeoutMs: SETTLE.warmTimeoutMs });
  const warmFirstResultMs = await readFirstResultMs(coldPage);

  const coldBytes = indexBytes(coldTrace, target);
  const peakHeap = await heapBytes(coldPage);

  await cold.close();

  // --- Warm cache -----------------------------------------------------------
  // Same context reused across a navigation, so the index is in the HTTP cache
  // but has to be parsed and restored again. For Orama that second cost is the
  // one caching does nothing about.
  const warm = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const warmPage = await warm.newPage();
  const warmCdp = await warm.newCDPSession(warmPage);
  await warmCdp.send('Network.enable');
  await warmCdp.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE });

  await warmPage.goto(target.base, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });
  await openOverlay(warmPage);
  await runQuery(warmPage, COLD_QUERY, { timeoutMs: SETTLE.timeoutMs });

  // Navigate away and back so the page is rebuilt from a primed cache.
  await warmPage.goto(`${target.base}getting-started/`, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });
  const revisitTrace = traceBytes(warmCdp);
  await warmPage.goto(target.base, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });
  await openOverlay(warmPage);
  await armFirstResultClock(warmPage);
  await resetClock(warmPage);
  await runQuery(warmPage, COLD_QUERY, { timeoutMs: SETTLE.timeoutMs });
  const revisitFirstResultMs = await readFirstResultMs(warmPage);
  const revisitBytes = indexBytes(revisitTrace, target);

  // --- Keystroke latency ----------------------------------------------------
  const keystrokes = [];
  for (const query of TYPING_QUERIES) {
    keystrokes.push(...(await typeAndTime(warmPage, query)));
  }

  await warm.close();

  const row = {
    target: target.key,
    label: target.label,
    coldFirstResultMs,
    coldSettleMs: coldWall,
    warmFirstResultMs,
    // A revisit with a primed HTTP cache. The gap between this and cold is what
    // caching actually buys; the gap between this and warm is the parse and
    // restore that it does not.
    revisitFirstResultMs,
    coldIndexBytes: coldBytes,
    revisitIndexBytes: revisitBytes,
    keystrokeMedianMs: percentile(keystrokes, 0.5),
    keystrokeP95Ms: percentile(keystrokes, 0.95),
    keystrokeSamples: keystrokes.length,
    peakHeapBytes: peakHeap,
  };

  measurements.push(row);
  console.log(
    `  cold ${Math.round(coldFirstResultMs ?? -1)}ms  warm ${Math.round(
      warmFirstResultMs ?? -1
    )}ms  revisit ${Math.round(revisitFirstResultMs ?? -1)}ms  p95 keystroke ${
      row.keystrokeP95Ms
    }ms  index ${(coldBytes / 1024 / 1024).toFixed(2)}MB`
  );
}

await browser.close();
await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./perf.json', RESULTS_DIR),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      network: NETWORK,
      cpuThrottle: CPU_THROTTLE,
      measurements,
    },
    null,
    2
  )
);

console.log(`\nwritten to ${new URL('./perf.json', RESULTS_DIR).pathname}`);

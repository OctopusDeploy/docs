// What a preloaded Orama index costs a reader who never searches.
//
// Preloading on page load spends the download once per visit and the parse and
// restore on every fresh page load, cached or not. The download is arithmetic
// from the compressed size; this measures the part caching cannot remove.
//
// Both numbers are taken with the index already in the HTTP cache, so what is
// left is CPU: `JSON.parse` of the serialized index, then Orama's `load`.

import { chromium } from '@playwright/test';
import { TARGETS, CPU_THROTTLE } from './config.mjs';

const target = TARGETS.find((entry) => entry.key === 'orama');
const INDEX_URL = target.payloadUrls[0];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

await page.goto(target.base, { waitUntil: 'domcontentloaded', timeout: 120_000 });

// Warm the HTTP cache first, unthrottled, so the measured pass is CPU only.
await page.evaluate(async (url) => {
  await fetch(url);
}, INDEX_URL);

for (const rate of [1, CPU_THROTTLE]) {
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });

  const result = await page.evaluate(async (url) => {
    const text = await fetch(url).then((response) => response.text());

    const beforeParse = performance.now();
    const parsed = JSON.parse(text);
    const afterParse = performance.now();

    return {
      bytes: text.length,
      parseMs: afterParse - beforeParse,
      // Rough proxy for what `load` then walks: the index is the big structure.
      indexKeys: Object.keys(parsed).length,
    };
  }, INDEX_URL);

  console.log(
    `${rate}x CPU  JSON.parse of ${(result.bytes / 1048576).toFixed(2)}MB: ` +
      `${Math.round(result.parseMs)}ms`
  );
}

await browser.close();

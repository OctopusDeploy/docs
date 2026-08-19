// Does Pagefind's per-query cost depend on how long the query is?
//
// The proposed fix for its keystroke lag is to fire fewer queries — a longer
// debounce, and no search under three characters. That obviously reduces how
// often the reader waits. Whether it reduces how long they wait depends on
// whether a short prefix is cheaper or dearer than a finished word, and that has
// not been measured.
//
// If short prefixes are the expensive ones, skipping them helps twice. If they
// are cheap, a longer debounce only trades many small waits for fewer large ones.

import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { TARGETS, RESULTS_DIR } from './config.mjs';
import { percentile } from './lib/score.mjs';

const WORDS = ['variables', 'runbooks', 'tentacle', 'lifecycles', 'kubernetes'];
const CPU = 4;
const NETWORK = {
  downloadThroughput: (9000 * 1024) / 8,
  uploadThroughput: (1500 * 1024) / 8,
  latency: 85,
};

const browser = await chromium.launch();
const results = {};

for (const key of ['pagefind', 'orama']) {
  const target = TARGETS.find((t) => t.key === key);
  const context = await browser.newContext();
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    ...NETWORK,
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });

  await page.goto(target.base, {
    waitUntil: 'domcontentloaded',
    timeout: 180_000,
  });

  // Drive the engine directly rather than the overlay, so the 150ms debounce is
  // out of the numbers and what is left is the engine's own cost.
  if (key === 'pagefind') {
    await page.evaluate(async (base) => {
      window.__e = await import(`${base}pagefind/pagefind.js`);
      await window.__e.options({ basePath: `${base}pagefind/` });
      await window.__e.filters();
      window.__search = async (term) => {
        const r = await window.__e.search(term);
        // The engine fetches a fragment per displayed row, so that cost belongs here.
        await Promise.all(r.results.slice(0, 30).map((s) => s.data()));
        return r.results.length;
      };
    }, target.base);
  } else {
    // Orama answers from a worker; go through the overlay's own engine instead.
    await page.evaluate(() => {
      window.__search = async (term) => {
        const input = document.querySelector('[data-docs-search-input]');
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value'
        ).set;
        setter.call(input, term);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return 0;
      };
    });
  }

  // Warm the index so this measures steady state.
  await page.keyboard.press('Control+K');
  await page.waitForTimeout(500);
  if (key === 'pagefind') {
    await page.evaluate(() => window.__search('octopus deployment'));
    await page.waitForTimeout(4000);
  } else {
    await page.evaluate(() => window.__search('octopus deployment'));
    await page.waitForTimeout(12000);
  }

  const byLength = {};
  for (let length = 1; length <= 9; length++) {
    const samples = [];
    for (const word of WORDS) {
      if (word.length < length) continue;
      const prefix = word.slice(0, length);
      const ms = await page.evaluate(async (term) => {
        const started = performance.now();
        await window.__search(term);
        return performance.now() - started;
      }, prefix);
      samples.push(Math.round(ms));
    }
    if (samples.length) {
      byLength[length] = {
        median: Math.round(percentile(samples, 0.5)),
        max: Math.max(...samples),
        n: samples.length,
      };
    }
  }

  results[key] = byLength;
  await context.close();
}

await browser.close();

console.log('Engine cost per query by prefix length, debounce excluded.');
console.log(
  'Fast 4G, 4x CPU. Pagefind measured directly; Orama is worker round trip.\n'
);
console.log(
  'chars'.padEnd(7) + 'Pagefind median / max'.padEnd(26) + 'Orama median / max'
);
for (let n = 1; n <= 9; n++) {
  const p = results.pagefind[n];
  const o = results.orama[n];
  if (!p && !o) continue;
  console.log(
    String(n).padEnd(7) +
      (p ? `${p.median}ms / ${p.max}ms` : '—').padEnd(26) +
      (o ? `${o.median}ms / ${o.max}ms` : '—')
  );
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./pagefind-query-cost.json', RESULTS_DIR),
  JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2)
);

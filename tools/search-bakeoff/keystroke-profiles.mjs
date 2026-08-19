// Keystroke latency across network profiles.
//
// The recommendation in the decision document rests on one number: Pagefind costs
// 1186ms per keystroke against Orama's 324ms. That was measured on Fast 4G with a
// 4x CPU penalty. Pagefind's cost is network-bound — it fetches index chunks per
// query — while Orama's is CPU and debounce once the index is resident. So the gap
// should shrink as the connection improves, and if it collapses on a realistic
// office connection then the recommendation was resting on the throttle rather
// than on the engine.
//
// Measured rather than argued.

import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { TARGETS, CPU_THROTTLE, SETTLE, RESULTS_DIR } from './config.mjs';
import { openOverlay, runQuery, typeAndTime } from './lib/overlay.mjs';
import { percentile } from './lib/score.mjs';

const PROFILES = [
  {
    name: 'Fast 4G, 4x CPU',
    note: 'the pessimistic profile the document uses',
    download: (9000 * 1024) / 8,
    upload: (1500 * 1024) / 8,
    latency: 85,
    cpu: CPU_THROTTLE,
  },
  {
    name: 'Cable, 2x CPU',
    note: '30Mbps, 20ms — a home connection',
    download: (30000 * 1024) / 8,
    upload: (5000 * 1024) / 8,
    latency: 20,
    cpu: 2,
  },
  {
    name: 'Office, no CPU throttle',
    note: '100Mbps, 5ms — a corporate desktop',
    download: (100000 * 1024) / 8,
    upload: (20000 * 1024) / 8,
    latency: 5,
    cpu: 1,
  },
];

const TYPING = ['variables', 'runbooks', 'tentacle', 'lifecycles'];

const browser = await chromium.launch();
const rows = [];

for (const profile of PROFILES) {
  for (const target of TARGETS) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);

    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: profile.download,
      uploadThroughput: profile.upload,
      latency: profile.latency,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu });

    await page.goto(target.base, {
      waitUntil: 'domcontentloaded',
      timeout: 180_000,
    });
    await openOverlay(page);
    // Load the index before timing anything, so this measures the steady state
    // rather than the first search.
    await runQuery(page, 'octopus deployment', { timeoutMs: SETTLE.timeoutMs });

    const samples = [];
    for (const query of TYPING) {
      samples.push(...(await typeAndTime(page, query)));
    }

    rows.push({
      profile: profile.name,
      target: target.key,
      label: target.label,
      median: percentile(samples, 0.5),
      p95: percentile(samples, 0.95),
      samples: samples.length,
    });

    await context.close();
  }
}

await browser.close();

console.log(
  'The overlay debounces 150ms, so that is the floor every number here sits on.\n'
);
for (const profile of PROFILES) {
  console.log(`${profile.name} — ${profile.note}`);
  for (const row of rows.filter((r) => r.profile === profile.name)) {
    console.log(
      `  ${row.label.padEnd(22)} median ${String(row.median).padStart(5)}ms   p95 ${String(row.p95).padStart(5)}ms`
    );
  }
  console.log('');
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./keystroke-profiles.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), profiles: PROFILES, rows },
    null,
    2
  )
);

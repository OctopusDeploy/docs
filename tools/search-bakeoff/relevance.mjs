// Runs the whole query set against every target and records what came back.
//
// One browser context per target, one page load, then every query typed into
// the already-open overlay. That is deliberately the warm path: this run is
// about what the engine matches, and paying Orama's 11MB restore once keeps a
// 200-query set to a few minutes. Cold cost is `perf.mjs`.

import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { TARGETS, SETTLE, RESULTS_DIR } from './config.mjs';
import { loadQueries, withPrefixes } from './lib/queries.mjs';
import { openOverlay, runQuery } from './lib/overlay.mjs';

const only = process.argv
  .filter((argument) => argument.startsWith('--target='))
  .map((argument) => argument.slice('--target='.length));

const targets =
  only.length > 0
    ? TARGETS.filter((target) => only.includes(target.key))
    : TARGETS;

// `--limit=N` runs only the first N queries. For smoke-testing a change to the
// adapter; a real run takes the whole set.
const limitArg = process.argv.find((argument) =>
  argument.startsWith('--limit=')
);
const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity;

const queries = (await loadQueries()).slice(0, limit);
const browser = await chromium.launch();
const runs = [];
const failures = [];

for (const target of targets) {
  console.log(`\n=== ${target.label}`);

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  await page.goto(target.base, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  });
  await openOverlay(page);

  // The first query of a session pays for the whole index. Doing it before the
  // set starts keeps one arbitrary query from carrying that cost in the record.
  console.log('  warming…');
  const warmedAt = Date.now();
  await runQuery(page, 'octopus deployment', { timeoutMs: SETTLE.timeoutMs });
  console.log(`  warm after ${((Date.now() - warmedAt) / 1000).toFixed(1)}s`);

  let done = 0;
  for (const query of queries) {
    for (const { variant, text } of withPrefixes(query)) {
      try {
        const response = await runQuery(page, text, {
          timeoutMs: SETTLE.warmTimeoutMs,
        });

        runs.push({
          target: target.key,
          id: query.id,
          bucket: query.bucket,
          variant,
          query: text,
          expect: query.expect,
          note: query.note,
          ...response,
        });
      } catch (error) {
        failures.push({
          target: target.key,
          id: query.id,
          variant,
          query: text,
          error: String(error.message ?? error),
        });
        // A single query that never settles must not end the run — the report
        // needs the other 200.
        runs.push({
          target: target.key,
          id: query.id,
          bucket: query.bucket,
          variant,
          query: text,
          expect: query.expect,
          results: [],
          counts: {},
          errored: true,
        });
      }
    }

    done += 1;
    if (done % 10 === 0) console.log(`  ${done}/${queries.length}`);
  }

  await context.close();
}

await browser.close();
await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./relevance.json', RESULTS_DIR),
  JSON.stringify(
    {
      // No Date.now() in the record itself beyond this stamp — the report reads
      // it to say which run it is describing.
      ranAt: new Date().toISOString(),
      targets: targets.map((target) => target.key),
      queryCount: queries.length,
      runs,
      failures,
    },
    null,
    2
  )
);

console.log(`\n${runs.length} searches recorded, ${failures.length} failed`);
console.log(`written to ${new URL('./relevance.json', RESULTS_DIR).pathname}`);

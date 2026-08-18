// Captures what each engine actually returns for a handful of real queries.
//
// The scores say which engine is right more often. They do not say what being
// wrong looks like, and the two candidates are wrong in different ways — one
// invents a confident answer where the other admits it has nothing. That
// difference matters to a reader and no aggregate shows it.
//
// Terms are drawn from the logged search property, chosen to expose behaviour
// rather than to be representative.

import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { TARGETS, SETTLE, RESULTS_DIR } from './config.mjs';
import { openOverlay, runQuery } from './lib/overlay.mjs';

const CASES = [
  { term: 'variables', note: 'A bare section name.' },
  { term: 'tentacle', note: 'A bare section name with a deep tree under it.' },
  {
    term: 'var',
    note: 'Three characters in. Most logged terms are partial like this.',
  },
  { term: 'permiss', note: 'An unfinished word.' },
  { term: 'kubernets', note: 'A misspelling.' },
  { term: 'varibles', note: 'A misspelling of the most-searched term.' },
  { term: 'octopus.server.exe', note: 'Dotted executable name.' },
  {
    term: '#{Octopus.Environment.Name}',
    note: 'Substitution syntax, pasted from a deployment.',
  },
  {
    term: 'como eliminar clientes',
    note: 'Spanish. The corpus is English only.',
  },
  {
    term: 'sssieddqxsx',
    note: 'Keyboard mash, and the single most-logged search term.',
  },
];

const browser = await chromium.launch();
const captured = {};

for (const target of TARGETS) {
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
  await runQuery(page, 'octopus deployment', { timeoutMs: SETTLE.timeoutMs });

  captured[target.key] = {};

  for (const { term } of CASES) {
    const response = await runQuery(page, term, {
      timeoutMs: SETTLE.warmTimeoutMs,
    });
    // A page and its own matched headings are one answer, not several.
    const seen = new Set();
    const top = [];
    for (const result of response.results) {
      const path = result.url.split('#')[0].replace(/\/+$/, '');
      if (seen.has(path)) continue;
      seen.add(path);
      top.push({ url: path, title: result.title });
      if (top.length === 3) break;
    }
    captured[target.key][term] = top;
    console.log(`  ${term.padEnd(30)} ${top.length} results`);
  }

  await context.close();
}

await browser.close();
await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./qualitative.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), cases: CASES, captured },
    null,
    2
  )
);

console.log('\n--- top result per engine\n');
console.log(
  'query'.padEnd(30) + 'legacy'.padEnd(38) + 'pagefind'.padEnd(38) + 'orama'
);
for (const { term } of CASES) {
  const cell = (key) => {
    const top = captured[key]?.[term] ?? [];
    return (top[0]?.url ?? '(nothing)').slice(0, 36).padEnd(38);
  };
  console.log(
    term.padEnd(30) + cell('legacy') + cell('pagefind') + cell('orama')
  );
}

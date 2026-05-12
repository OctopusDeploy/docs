import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// These tests run against `astro preview` (built `dist/`), not `astro dev`,
// because the per-page `.md` files are written by the build-time integration.

const STABLE_PLAIN_MD_PATH = '/docs/argo-cd';
const STABLE_MDX_PATH = '/docs/kubernetes';

test('per-page .md endpoint serves clean markdown for an eligible page', async ({
  request,
}) => {
  const res = await request.get(STABLE_PLAIN_MD_PATH + '.md');
  expect(res.status()).toBe(200);
  const ct = res.headers()['content-type'] ?? '';
  expect(ct.toLowerCase()).toMatch(/^text\/markdown(?:;|$)/);
  const body = await res.text();
  expect(body.length).toBeGreaterThan(0);
  expect(body.replace(/^﻿/, '').startsWith('# ')).toBe(true);
});

test('per-page .md endpoint 404s for an MDX page with non-inlinable components', async ({
  request,
}) => {
  const res = await request.get(STABLE_MDX_PATH + '.md');
  expect(res.status()).toBe(404);
});

test('llms.txt is spec-shaped', async ({ request }) => {
  const res = await request.get('/docs/llms.txt');
  expect(res.status()).toBe(200);
  const body = await res.text();

  const h1Lines = body.split('\n').filter((l) => /^﻿?# /.test(l));
  expect(h1Lines.length, 'expected exactly one H1').toBe(1);

  const summaryLines = body.split('\n').filter((l) => /^> /.test(l));
  expect(
    summaryLines.length,
    'expected at least one `>` summary line'
  ).toBeGreaterThanOrEqual(1);

  const sectionLines = body.split('\n').filter((l) => /^## /.test(l));
  expect(
    sectionLines.length,
    'expected at least one `##` section'
  ).toBeGreaterThanOrEqual(1);

  const linkRe = /\[[^\]]+\]\((https?:\/\/[^)]+)\)/g;
  const urls = Array.from(body.matchAll(linkRe), (m) => m[1]);
  expect(
    urls.length,
    'expected at least one link in llms.txt'
  ).toBeGreaterThan(0);
  for (const u of urls) {
    expect(u, `URL ${u} should end in .md`).toMatch(/\.md(?:[#?].*)?$/);
  }
});

test('llms-full.txt is well-formed: intro, summary, page boundaries, no orphaned MDX', async ({
  request,
}) => {
  const res = await request.get('/docs/llms-full.txt');
  expect(res.status()).toBe(200);
  const body = await res.text();

  expect(body).toMatch(/^﻿?# Octopus Deploy Documentation/);
  expect(body).toMatch(/^> /m);
  expect(body).toMatch(/^Source: https?:\/\/[^\s]+\.md$/m);

  expect(body, 'unexpected literal `<Card` left in output').not.toMatch(
    /<Card[\s>]/
  );
  expect(
    body,
    'unexpected literal `<RecentlyUpdated` left in output'
  ).not.toMatch(/<RecentlyUpdated[\s>]/);
  expect(
    body,
    'unexpected literal `<Image` JSX tag (not the HTML img) left in output'
  ).not.toMatch(/<Image[\s>]/);
});

test('CopyMarkdown dropdown advertises a working .md URL on the eligible page', async ({
  page,
  request,
}) => {
  await page.goto(STABLE_PLAIN_MD_PATH);
  const url = await page.getAttribute(
    '[data-copy-md-action="copy"]',
    'data-copy-md-url'
  );
  expect(
    url,
    'expected CopyMarkdown dropdown to expose a data-copy-md-url'
  ).toBeTruthy();
  const target = await request.get(url!);
  expect(target.status()).toBe(200);
});

test('CopyMarkdown dropdown is hidden on the ineligible MDX page', async ({
  page,
}) => {
  await page.goto(STABLE_MDX_PATH);
  const count = await page.locator('[data-copy-md-menu]').count();
  expect(count, 'expected no CopyMarkdown dropdown on ineligible page').toBe(0);
});

test('HtmlHead omits `<link rel="alternate" type="text/markdown">` on the ineligible MDX page', async ({
  page,
}) => {
  await page.goto(STABLE_MDX_PATH);
  const count = await page
    .locator('link[rel="alternate"][type="text/markdown"]')
    .count();
  expect(count, 'expected no .md alternate link on ineligible page').toBe(0);
});

test('HtmlHead emits `<link rel="alternate" type="text/markdown">` on the eligible page', async ({
  page,
}) => {
  await page.goto(STABLE_PLAIN_MD_PATH);
  const count = await page
    .locator('link[rel="alternate"][type="text/markdown"]')
    .count();
  expect(
    count,
    'expected exactly one .md alternate link on eligible page'
  ).toBe(1);
});

function resolveDistDocsDir(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(here, '..');
  return path.join(projectRoot, 'dist', 'docs');
}

function collectEmittedSlugs(distDocs: string): Set<string> {
  const slugs = new Set<string>();
  const stack: string[] = [distDocs];
  while (stack.length > 0) {
    const dir = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith('.md')) continue;
      const rel = path.relative(distDocs, full).replace(/\\/g, '/');
      const slug = rel.replace(/\.md$/, '');
      slugs.add(slug);
    }
  }
  return slugs;
}

function extractSlugsFromIndex(indexBody: string): Set<string> {
  const linkRe = /\[[^\]]+\]\((https?:\/\/[^)]+\.md)(?:[#?][^)]*)?\)/g;
  const slugs = new Set<string>();
  for (const m of indexBody.matchAll(linkRe)) {
    const url = m[1];
    const docMatch = url.match(/\/docs\/(.+)\.md$/);
    if (!docMatch) continue;
    slugs.add(docMatch[1]);
  }
  return slugs;
}

function extractSlugsFromFull(fullBody: string): Set<string> {
  const sourceRe = /^Source:\s*(https?:\/\/[^\s]+\.md)\s*$/gm;
  const slugs = new Set<string>();
  for (const m of fullBody.matchAll(sourceRe)) {
    const url = m[1];
    const docMatch = url.match(/\/docs\/(.+)\.md$/);
    if (!docMatch) continue;
    slugs.add(docMatch[1]);
  }
  return slugs;
}

function diffSets(a: Set<string>, b: Set<string>): string[] {
  const out: string[] = [];
  for (const v of a) if (!b.has(v)) out.push(v);
  return out.sort();
}

test('predicate-set parity: llms.txt and llms-full.txt advertise the same slugs (bidirectional)', async ({
  request,
}) => {
  const indexRes = await request.get('/docs/llms.txt');
  expect(indexRes.status()).toBe(200);
  const indexBody = await indexRes.text();

  const fullRes = await request.get('/docs/llms-full.txt');
  expect(fullRes.status()).toBe(200);
  const fullBody = await fullRes.text();

  const indexSlugs = extractSlugsFromIndex(indexBody);
  const fullSlugs = extractSlugsFromFull(fullBody);

  expect(
    indexSlugs.size,
    'expected llms.txt to advertise at least a few /docs/*.md links'
  ).toBeGreaterThan(10);
  expect(
    fullSlugs.size,
    'expected llms-full.txt to expose at least a few `Source:` rows'
  ).toBeGreaterThan(10);

  expect(
    diffSets(indexSlugs, fullSlugs),
    'slugs in llms.txt missing from llms-full.txt `Source:` rows'
  ).toEqual([]);

  expect(
    diffSets(fullSlugs, indexSlugs),
    'slugs in llms-full.txt `Source:` rows missing from llms.txt links'
  ).toEqual([]);
});

test('predicate-set parity: emitted dist/docs/*.md files match llms.txt slug set', async ({
  request,
}) => {
  const indexRes = await request.get('/docs/llms.txt');
  expect(indexRes.status()).toBe(200);
  const indexBody = await indexRes.text();

  const indexSlugs = extractSlugsFromIndex(indexBody);
  expect(
    indexSlugs.size,
    'expected llms.txt to advertise at least a few /docs/*.md links'
  ).toBeGreaterThan(10);

  const distDocs = resolveDistDocsDir();
  expect(
    fs.existsSync(distDocs),
    `expected ${distDocs} to exist - run \`pnpm run build\` first`
  ).toBe(true);
  const emittedSlugs = collectEmittedSlugs(distDocs);

  expect(
    diffSets(indexSlugs, emittedSlugs),
    'slugs advertised in llms.txt but not emitted to dist/docs/*.md'
  ).toEqual([]);
  expect(
    diffSets(emittedSlugs, indexSlugs),
    'files emitted to dist/docs/*.md but not advertised in llms.txt'
  ).toEqual([]);
});

test('per-page .md companions advertised in llms.txt all resolve 200 (sampled)', async ({
  request,
}) => {
  const indexRes = await request.get('/docs/llms.txt');
  expect(indexRes.status()).toBe(200);
  const indexBody = await indexRes.text();

  const linkRe = /\[[^\]]+\]\((https?:\/\/[^)]+\.md)(?:[#?][^)]*)?\)/g;
  const allUrls = Array.from(indexBody.matchAll(linkRe), (m) => m[1]);
  const docMdUrls = allUrls.filter((u) => u.includes('/docs/'));
  expect(docMdUrls.length).toBeGreaterThan(10);

  // Sample to keep CI runtime bounded; full slug-set coverage is in the
  // FS-walk test above.
  const stride = Math.max(1, Math.floor(docMdUrls.length / 25));
  const sampledIndices = new Set<number>();
  sampledIndices.add(0);
  sampledIndices.add(docMdUrls.length - 1);
  for (let i = 0; i < docMdUrls.length; i += stride) sampledIndices.add(i);

  const fetchFailures: string[] = [];
  for (const i of sampledIndices) {
    const fullUrl = docMdUrls[i];
    const pathOnly = fullUrl.replace(/^https?:\/\/[^/]+/, '');
    const r = await request.get(pathOnly);
    if (r.status() !== 200) fetchFailures.push(`${pathOnly} -> ${r.status()}`);
  }
  expect(
    fetchFailures,
    'every sampled .md companion advertised in llms.txt should resolve 200'
  ).toEqual([]);
});

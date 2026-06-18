import { SITE } from '@config';
import { Accelerator } from 'astro-accelerator-utils';
import {
  compareForLlmSurfaces,
  eligibleForMarkdown,
  normalizeSubtitle,
  resolveMdxIncludes,
  sanitizeTitle,
  stripFrontmatter,
} from '@util/mdxContent';

const PROJECT_TITLE = 'Octopus Deploy Documentation - Full Export';
const PROJECT_SUMMARY =
  'All eligible documentation pages as plain markdown, ordered by navigation section then page order.';

const articles = import.meta.glob<any>(['./**/*.md', './**/*.mdx']);
const raws = import.meta.glob<string>(['./**/*.md', './**/*.mdx'], {
  query: '?raw',
  import: 'default',
});

const subfolderPrefix = SITE.subfolder.replace(/\/$/, '') + '/';

async function getData() {
  const accelerator = new Accelerator(SITE);
  const entries: {
    body: string;
    slug: string;
    navOrder: number;
    navSection: string;
  }[] = [];

  for (const path in articles) {
    const article: any = await articles[path]();
    const fm = article.frontmatter ?? {};

    const raw = await raws[path]();
    const verdict = eligibleForMarkdown({ path, frontmatter: fm, raw });
    if (!verdict.eligible) continue;

    const url = accelerator.urlFormatter.formatAddress(article.url);
    if (!url.startsWith(subfolderPrefix)) continue;
    if (url.endsWith('/')) continue;
    const slug = url.slice(subfolderPrefix.length);
    if (slug.length === 0) continue;

    const body = resolveMdxIncludes(stripFrontmatter(raw), 0, path).trim();
    const title = sanitizeTitle(fm.title);
    const subtitle = normalizeSubtitle(fm.subtitle);
    const fullUrl = SITE.url + url + '.md';

    let section = '# ' + title + '\n';
    section += 'Source: ' + fullUrl + '\n\n';
    if (subtitle) section += '> ' + subtitle + '\n\n';
    section += body;

    entries.push({
      body: section,
      slug,
      navOrder: fm.navOrder ?? 999999,
      navSection: fm.navSection ?? '',
    });
  }

  entries.sort(compareForLlmSurfaces);

  // UTF-8 BOM so files self-declare encoding when served without charset.
  let content = '﻿# ' + PROJECT_TITLE + '\n\n';
  content += '> ' + PROJECT_SUMMARY + '\n\n';
  for (const entry of entries) {
    content += entry.body + '\n\n';
  }

  return new Response(content, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export const GET = getData;

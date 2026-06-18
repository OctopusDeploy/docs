// Generates llms.txt per https://llmstxt.org

import { SITE } from '@config';
import { Accelerator } from 'astro-accelerator-utils';
import {
  compareForLlmSurfaces,
  eligibleForMarkdown,
  sanitizeTitle,
} from '@util/mdxContent';

const PROJECT_TITLE = 'Octopus Deploy Documentation';
const PROJECT_SUMMARY =
  'Official documentation for Octopus Deploy: deployment, runbooks, infrastructure, configuration, integrations, and operations guidance.';

const allPages = import.meta.glob<any>(['./**/*.md', './**/*.mdx']);
const allRaws = import.meta.glob<string>(['./**/*.md', './**/*.mdx'], {
  query: '?raw',
  import: 'default',
});

async function getData() {
  const accelerator = new Accelerator(SITE);
  const subfolderPrefix = SITE.subfolder.replace(/\/$/, '') + '/';

  type Page = {
    title: string;
    description: string;
    url: string;
    slug: string;
    navOrder: number;
    navSection: string;
  };
  const pages: Page[] = [];

  for (const path in allPages) {
    const article: any = await allPages[path]();
    const fm = article.frontmatter ?? {};

    const raw = await allRaws[path]();
    const verdict = eligibleForMarkdown({ path, frontmatter: fm, raw });
    if (!verdict.eligible) continue;

    const url = accelerator.urlFormatter.formatAddress(article.url);
    if (!url.startsWith(subfolderPrefix)) continue;
    if (url.endsWith('/')) continue;
    const slug = url.slice(subfolderPrefix.length);
    if (slug.length === 0) continue;

    const fullUrl = SITE.url + url + '.md';
    const title = sanitizeTitle(fm.title);
    const description =
      typeof fm.description === 'string' && fm.description.trim().length > 0
        ? fm.description
        : 'Documentation page for Octopus Deploy';

    // `??` so navOrder=0 and navSection='' aren't promoted to defaults.
    pages.push({
      title,
      description,
      url: fullUrl,
      slug,
      navOrder: fm.navOrder ?? 999999,
      navSection: fm.navSection ?? '',
    });
  }

  pages.sort(compareForLlmSurfaces);

  // UTF-8 BOM so files self-declare encoding when served without charset.
  let content = '﻿# ' + PROJECT_TITLE + '\n\n';
  content += '> ' + PROJECT_SUMMARY + '\n\n';

  let lastSection: string | null = null;
  for (const page of pages) {
    if (page.navSection !== lastSection) {
      if (lastSection !== null) content += '\n';
      const heading =
        page.navSection.trim().length > 0 ? page.navSection : 'Other';
      content += '## ' + heading + '\n\n';
      lastSection = page.navSection;
    }
    content +=
      '- [' + page.title + '](' + page.url + '): ' + page.description + '\n';
  }

  return new Response(content, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export const GET = getData;

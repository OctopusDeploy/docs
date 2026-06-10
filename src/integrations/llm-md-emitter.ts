// Emits per-page `.md` files into `dist/docs/` after the main build, so
// LLM tools can fetch any eligible page as plain markdown.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { globSync } from 'glob';
import matter from 'gray-matter';
import {
  eligibleForMarkdownWithLookup,
  normalizeSubtitle,
  pathToSlug,
  resolveMdxIncludesWithLookup,
  sanitizeTitle,
  stripFrontmatter,
  type SharedContentLookup,
} from '../themes/octopus/utilities/mdxContentCore';

const PROJECT_ROOT = path.resolve(
  fileURLToPath(import.meta.url),
  '..',
  '..',
  '..'
);
const PAGES_ROOT = path.join(PROJECT_ROOT, 'src', 'pages', 'docs');
const SHARED_CONTENT_ROOT = path.join(PROJECT_ROOT, 'src', 'shared-content');

function buildSharedContentLookup(): SharedContentLookup {
  const cache = new Map<string, string>();
  const files = globSync('**/*.{md,mdx}', {
    cwd: SHARED_CONTENT_ROOT,
    nodir: true,
  });
  for (const f of files) {
    const abs = path.join(SHARED_CONTENT_ROOT, f);
    cache.set('/' + path.posix.join('src', 'shared-content', f), abs);
  }
  return (lookupPath: string) => {
    const abs = cache.get(lookupPath);
    if (!abs) return undefined;
    try {
      return fs.readFileSync(abs, 'utf8');
    } catch {
      return undefined;
    }
  };
}

type EmittedPage = {
  slug: string;
  title: string;
  subtitle: string | null;
  body: string;
};

export default function llmMdEmitter(): AstroIntegration {
  return {
    name: 'llm-md-emitter',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const docsOutDir = path.join(distDir, 'docs');

        const lookup = buildSharedContentLookup();
        const files = globSync('**/*.{md,mdx}', {
          cwd: PAGES_ROOT,
          nodir: true,
        });

        const seenSlugs = new Map<string, string>();
        const emitted: EmittedPage[] = [];
        let skippedCount = 0;
        let failureCount = 0;

        for (const rel of files) {
          const abs = path.join(PAGES_ROOT, rel);
          const globKey = '/' + path.posix.join('src', 'pages', 'docs', rel);

          let raw: string;
          try {
            raw = fs.readFileSync(abs, 'utf8');
          } catch (err) {
            logger.warn(
              `[llm-md-emitter] could not read ${rel}: ${(err as Error).message}`
            );
            failureCount++;
            continue;
          }

          let parsed;
          try {
            parsed = matter(raw);
          } catch (err) {
            logger.warn(
              `[llm-md-emitter] frontmatter parse failed for ${rel}: ${(err as Error).message}`
            );
            failureCount++;
            continue;
          }
          const fm = parsed.data ?? {};

          const verdict = eligibleForMarkdownWithLookup(
            { path: globKey, frontmatter: fm, raw },
            lookup
          );
          if (!verdict.eligible) {
            skippedCount++;
            continue;
          }

          const slug = pathToSlug(rel);
          if (!slug) continue;
          const winner = seenSlugs.get(slug);
          if (winner !== undefined) {
            logger.warn(
              `[llm-md-emitter] slug collision on '${slug}': keeping '${winner}', skipping '${rel}'`
            );
            continue;
          }
          seenSlugs.set(slug, rel);

          const body = resolveMdxIncludesWithLookup(
            stripFrontmatter(raw),
            lookup,
            0,
            globKey
          ).trim();

          emitted.push({
            slug,
            title: sanitizeTitle(fm.title),
            subtitle: normalizeSubtitle(fm.subtitle),
            body,
          });
        }

        let writeFailures = 0;
        for (const page of emitted) {
          // UTF-8 BOM so files self-declare encoding when served without charset.
          let out = '﻿# ' + page.title + '\n\n';
          if (page.subtitle) out += '> ' + page.subtitle + '\n\n';
          out += page.body + '\n';

          const target = path.join(docsOutDir, page.slug + '.md');
          try {
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, out, 'utf8');
          } catch (err) {
            logger.warn(
              `[llm-md-emitter] write failed for ${page.slug}.md: ${(err as Error).message}`
            );
            writeFailures++;
          }
        }

        logger.info(
          `[llm-md-emitter] emitted ${emitted.length} .md files, skipped ${skippedCount} ineligible, ${failureCount} parse failures, ${writeFailures} write failures`
        );
      },
    },
  };
}

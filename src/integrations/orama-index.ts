// Builds an Orama index and serialises it for the browser to restore.
//
// The corpus is the `.md` files `llm-md-emitter.ts` has already written into
// `dist/docs/`. That emitter runs the same eligibility predicate search uses, so
// redirect stubs and `navSearch: false` pages are already gone and there is no
// second extraction pipeline to keep in step with the first. This has to be
// registered after `llmMdEmitter()` and before `pruneDist()`, which would delete
// anything written outside `dist/docs/`.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { globSync } from 'glob';
// Core `save` rather than @orama/plugin-data-persistence: the plugin reaches for
// Node's filesystem and buffers, and bundling it for the browser worker that has
// to restore this fails outright. `save` returns a plain object, which is all
// the JSON format ever was.
import { create, insertMultiple, save } from '@orama/orama';

// Roughly the number of pages that pass the search predicate. Well under it and
// the corpus has moved, which is a silent failure otherwise.
const EXPECTED_PAGES = 1000;

// Long pages cost index size for very little relevance — the terms that matter
// are near the top, and a result excerpt never reaches further than this.
const BODY_LIMIT = 4000;

const SECTIONS: [string, RegExp][] = [
  [
    'cli',
    /^\/docs\/octopus-rest-api\/(cli|octopus-cli|[a-z.]+-command-line)(\/|$)/,
  ],
  ['api', /^\/docs\/octopus-rest-api(\/|$)/],
  ['integrations', /^\/docs\/api-and-integration(\/|$)/],
];

function sectionFor(url: string) {
  return SECTIONS.find(([, prefix]) => prefix.test(url))?.[0] ?? 'docs';
}

function trailFor(url: string) {
  return url
    .split('/')
    .filter(Boolean)
    .slice(1, -1)
    .map((segment) =>
      segment.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())
    )
    .join(' / ');
}

/** Strips the markup that would otherwise be indexed as words in its own right:
 *  fences, link syntax, heading markers and emphasis. */
function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^[#>\s-]+/gm, ' ')
    .replace(/[*_]{1,3}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function oramaIndex(): AstroIntegration {
  return {
    name: 'orama-index',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const docsDir = path.join(distDir, 'docs');

        const files = globSync('**/*.md', {
          cwd: docsDir,
          nodir: true,
          posix: true,
        });

        const documents = files.map((file) => {
          const raw = fs
            .readFileSync(path.join(docsDir, file), 'utf8')
            .replace(/^﻿/, '');

          // The emitter writes `# Title`, an optional `> subtitle`, then body.
          const [, title = ''] = raw.match(/^#\s+(.*)$/m) ?? [];
          const [, subtitle = ''] = raw.match(/^>\s+(.*)$/m) ?? [];
          const url = '/docs/' + file.replace(/\.md$/, '');

          return {
            url,
            title,
            description: subtitle,
            body: toPlainText(raw).slice(0, BODY_LIMIT),
            trail: trailFor(url),
            section: sectionFor(url),
          };
        });

        const db = create({
          schema: {
            url: 'string',
            title: 'string',
            description: 'string',
            body: 'string',
            trail: 'string',
            section: 'enum',
          } as const,
          components: {
            tokenizer: { stemming: true, language: 'english' },
          },
        });

        await insertMultiple(db, documents);

        const serialised = JSON.stringify(save(db));
        const target = path.join(docsDir, 'search-index.json');
        fs.writeFileSync(target, serialised, 'utf8');

        const megabytes = (serialised.length / 1024 / 1024).toFixed(1);
        logger.info(
          `indexed ${documents.length} pages into docs/search-index.json (${megabytes}MB)`
        );

        if (documents.length < EXPECTED_PAGES) {
          logger.warn(
            `only ${documents.length} pages were indexed, expected at least ${EXPECTED_PAGES} — check llm-md-emitter still runs before this`
          );
        }
      },
    },
  };
}

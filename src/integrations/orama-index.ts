// Builds an Orama index and serializes it for the browser to restore.
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
// Orama defaults `stopWords` to an empty list, so without this `how`, `do`,
// `the` and 177 others are live search terms.
import { stopwords as englishStopwords } from '@orama/stopwords/english';

// Roughly the number of pages that pass the search predicate. Well under it and
// the corpus has moved, which is a silent failure otherwise.
const EXPECTED_PAGES = 1000;

// Long pages cost index size for very little relevance — the terms that matter
// are near the top, and a result excerpt never reaches further than this.
const BODY_LIMIT = 4000;

// How much of each page's text is kept in the stored copy. The inverted index
// is a separate structure and keeps every term, so this only bounds the text an
// excerpt can be cut from, and `excerptFrom` never shows more than 180.
const EXCERPT_LIMIT = 200;

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
          // Nothing sorts, and a sort store is built and serialized for every
          // sortable field unless it is turned off. It was 2.69MB of the index.
          sort: { enabled: false },
          // `orama-worker.ts` has to create its database with this same
          // tokenizer before it restores the index, or query terms are matched
          // unstemmed against stemmed index terms and recall collapses quietly.
          components: {
            tokenizer: {
              stemming: true,
              language: 'english',
              stopWords: englishStopwords,
            },
          },
        });

        await insertMultiple(db, documents);

        // Reaches into the shape `save()` returns, so an Orama release that
        // changes it breaks here rather than silently shipping the whole corpus
        // again. Each document is otherwise stored whole, which put 2.2MB of
        // page text on the wire purely to cut a 180-character excerpt from.
        const stored = save(db) as {
          docs: { docs: Record<string, { body?: string } | undefined> };
        };
        for (const document of Object.values(stored.docs.docs)) {
          if (document?.body)
            document.body = document.body.slice(0, EXCERPT_LIMIT);
        }

        const serialized = JSON.stringify(stored);
        const target = path.join(docsDir, 'search-index.json');
        fs.writeFileSync(target, serialized, 'utf8');

        const megabytes = (serialized.length / 1024 / 1024).toFixed(1);
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

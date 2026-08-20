// Builds the Pagefind index from the HTML the site just emitted. `rootSelector`
// and `excludeSelectors` below decide what gets indexed, for every layout at
// once; the `data-pagefind-*` attributes a layout adds only describe what is
// different about its pages.
//
// The index has to land inside `dist/docs/`, because `prune-dist.ts` deletes
// every top-level entry outside its allowlist, and this has to be registered
// before `pruneDist()` — hooks run in the order they are listed.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import { gunzipSync } from 'node:zlib';
import { readdir, readFile, writeFile } from 'node:fs/promises';
// Statically, because `astro:build:done` fires after Vite's module runner has
// closed and a dynamic import from inside the hook cannot be resolved.
import { createIndex, close } from 'pagefind';

export default function pagefindIndex(): AstroIntegration {
  return {
    name: 'pagefind-index',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);

        const { index, errors } = await createIndex({
          keepIndexUrl: false,
          // Pagefind strips punctuation from both the index and the query, which
          // left `<head>` matching nothing at all. Keeping these characters
          // indexes both forms — `head` *and* `<head>` — so ordinary searches are
          // unaffected and a reader pasting real syntax gets the page about it.
          //
          // Each character earns its place: `.` for dotted variable and
          // executable names, `#{}` for substitution syntax, `<>` for tags, `+`
          // for C++, and `$_` for shell variables.
          includeCharacters: '.#{}<>+$_',
          // The article, so a layout does not have to opt in to being indexed:
          // a new one added without a thought for search still gets found. The
          // article rather than `.page-content`, because Pagefind takes a
          // result's title from the first heading inside the indexed element.
          //
          // A layout with no `<article>` therefore indexes nothing. The count
          // logged at the end of this hook is of files scanned, so it says
          // nothing about that: `tests/docs-search.spec.ts` is what would catch
          // it.
          rootSelector: 'article',
          // Sits inside the article and on every page, so its words would
          // otherwise match every query.
          excludeSelectors: ['.page-actions'],
        });

        if (!index) {
          throw new Error(`could not start Pagefind: ${errors.join(', ')}`);
        }

        // `close()` stops the Pagefind binary. Without the `finally` a thrown
        // error leaves that child process running and the build never exits.
        try {
          // `dist/docs` rather than `dist`: the client points Pagefind at
          // `/docs/pagefind/`, from which it derives a `/docs/` prefix for every
          // result URL, so indexing from `dist` would put the prefix on twice.
          const added = await index.addDirectory({
            path: path.join(distDir, 'docs'),
            glob: '**/*.html',
          });

          if (added.errors.length > 0) {
            throw new Error(
              `Pagefind indexing failed: ${added.errors.join(', ')}`
            );
          }

          const written = await index.writeFiles({
            outputPath: path.join(distDir, 'docs', 'pagefind'),
          });

          if (written.errors.length > 0) {
            throw new Error(
              `Pagefind write failed: ${written.errors.join(', ')}`
            );
          }

          // Files scanned, not pages indexed: the redirect stubs are counted
          // here and then dropped for having no article.
          logger.info(`scanned ${added.page_count} pages into docs/pagefind`);

          const titles = await writeTitleMap(
            path.join(distDir, 'docs', 'pagefind')
          );
          logger.info(`wrote ${titles} titles to ${TITLE_MAP}`);
        } finally {
          await close();
        }
      },
    },
  };
}

/** Where the map lands, and the name the client fetches it by. */
const TITLE_MAP = 'docs-titles.json';

// Pagefind prefixes every decompressed chunk with this before the JSON.
const FRAGMENT_MAGIC = 'pagefind_dcd';

/**
 * Writes what the overlay needs to rank a result without fetching it.
 *
 * Ranking needs a URL and a title, and Pagefind keeps both in the per-page
 * fragment — so ranking thirty results meant fetching thirty files, and a
 * landing page ranked past that could not be reached at all. A search result
 * stub carries the id of its own fragment, so one map from id to url and title
 * lets the whole result set be ranked from a single file.
 *
 * Read back out of the fragments rather than collected during indexing, because
 * the ids are assigned by Pagefind as it writes them.
 */
async function writeTitleMap(pagefindDir: string): Promise<number> {
  const dir = path.join(pagefindDir, 'fragment');
  const files = (await readdir(dir)).filter((name) =>
    name.endsWith('.pf_fragment')
  );

  const map: Record<string, [url: string, title: string]> = {};

  for (const file of files) {
    const raw = gunzipSync(await readFile(path.join(dir, file))).toString(
      'utf8'
    );

    // Checked before parsing: a Pagefind release that changes the chunk format
    // has to fail the build here, rather than write a map the overlay silently
    // cannot join against.
    if (!raw.startsWith(FRAGMENT_MAGIC)) {
      throw new Error(
        `unexpected fragment format in ${file}: Pagefind's own prefix is missing, so ${TITLE_MAP} cannot be trusted`
      );
    }

    const fragment = JSON.parse(raw.slice(raw.indexOf('{'))) as {
      url: string;
      meta?: Record<string, string>;
    };

    // The stub's `id` is the filename without its extension, which is the join.
    map[path.basename(file, '.pf_fragment')] = [
      fragment.url,
      fragment.meta?.title ?? '',
    ];
  }

  await writeFile(
    path.join(pagefindDir, TITLE_MAP),
    JSON.stringify(map),
    'utf8'
  );

  return files.length;
}

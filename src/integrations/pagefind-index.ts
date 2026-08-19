// Builds the Pagefind index from the HTML the site just emitted. What gets
// indexed is decided by the `data-pagefind-*` attributes in `Default.astro`.
//
// The index has to land inside `dist/docs/`, because `prune-dist.ts` deletes
// every top-level entry outside its allowlist, and this has to be registered
// before `pruneDist()` — hooks run in the order they are listed.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
// Statically, because `astro:build:done` fires after Vite's module runner has
// closed and a dynamic import from inside the hook cannot be resolved.
import { createIndex, close } from 'pagefind';

// Roughly the number of pages that pass the search predicate. Well under it means
// the body scoping has broken, which is otherwise a silent failure: search still
// works, it is just full of the wrong pages.
const EXPECTED_PAGES = 1000;

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
        });

        if (!index) {
          logger.error(`could not start Pagefind: ${errors.join(', ')}`);
          return;
        }

        // `dist/docs` rather than `dist`: the client sets a `basePath` of
        // `/docs/` which Pagefind prepends at query time, so indexing from `dist`
        // would put the prefix on twice.
        const added = await index.addDirectory({
          path: path.join(distDir, 'docs'),
          glob: '**/*.html',
        });

        if (added.errors.length > 0) {
          logger.error(added.errors.join(', '));
        }

        const written = await index.writeFiles({
          outputPath: path.join(distDir, 'docs', 'pagefind'),
        });

        if (written.errors.length > 0) {
          logger.error(written.errors.join(', '));
        }

        await close();

        // `page_count` is files scanned, not files indexed — it counts the
        // redirect stubs that `data-pagefind-body` then drops. One fragment is
        // written per indexed page, so that is the number worth checking.
        //
        // No fragment directory at all is the worst version of the failure the
        // warning below exists to report, so it must not throw ahead of it.
        const fragments = path.join(distDir, 'docs', 'pagefind', 'fragment');
        const indexed = fs.existsSync(fragments)
          ? (await fs.promises.readdir(fragments)).length
          : 0;

        logger.info(
          `indexed ${indexed} of ${added.page_count} pages into docs/pagefind`
        );

        // Nothing indexed at all means every query returns nothing. That must
        // not ship behind a green build.
        if (indexed === 0) {
          throw new Error(
            'Pagefind indexed no pages — check data-pagefind-body is still on the article in Default.astro'
          );
        }

        if (indexed < EXPECTED_PAGES) {
          logger.warn(
            `only ${indexed} pages were indexed, expected at least ${EXPECTED_PAGES} — check data-pagefind-body is still on the article`
          );
        }
      },
    },
  };
}

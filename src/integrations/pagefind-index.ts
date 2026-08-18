// Builds the Pagefind index from the HTML the site just emitted.
//
// Two things about this repo shape the setup. The index has to land inside
// `dist/docs/`, because `prune-dist.ts` deletes every top-level entry outside
// its allowlist and only `/docs/` is served on octopus.com. And this has to be
// registered before `pruneDist()` in `astro.config.mjs`, since integration hooks
// run in the order they are listed.
//
// What gets indexed is decided in `Default.astro` by `data-pagefind-body`,
// `data-pagefind-ignore` and `data-pagefind-filter`, not here.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
// Statically, because `astro:build:done` fires after Vite's module runner has
// closed and a dynamic import from inside the hook cannot be resolved.
import { createIndex, close } from 'pagefind';

// Roughly the number of pages that pass the search predicate. Well under it
// means the body scoping or the exclusions have broken, which is a silent
// failure otherwise — search still works, it is just full of the wrong pages.
const EXPECTED_PAGES = 1000;

export default function pagefindIndex(): AstroIntegration {
  return {
    name: 'pagefind-index',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);

        const { index, errors } = await createIndex({
          keepIndexUrl: false,
          // Pagefind strips punctuation from both the index and the query, so
          // `Octopus.Action.Package` and `#{Octopus.Environment.Name}` are stored
          // as their bare words and cannot be told apart from prose using the same
          // words. `<head>` matched nothing at all. Keeping these characters
          // indexes both forms — `head` *and* `<head>` — so ordinary searches are
          // unaffected and a reader pasting real syntax gets the page about it.
          //
          // Limited to punctuation that shows up in this corpus and in the search
          // logs: dotted variable and executable names, substitution syntax,
          // angle brackets, C++, and shell variables.
          includeCharacters: '.#{}<>+$_',
        });

        if (!index) {
          logger.error(`could not start Pagefind: ${errors.join(', ')}`);
          return;
        }

        // `dist/docs` rather than `dist`, so stored URLs are relative to the
        // /docs/ prefix the site is proxied under. The client sets a `basePath`
        // of `/docs/`, which Pagefind prepends back on at query time — indexing
        // from `dist` would put `/docs/` on twice.
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
        const outDir = path.join(distDir, 'docs', 'pagefind');
        const indexed = (
          await fs.promises.readdir(path.join(outDir, 'fragment'))
        ).length;

        logger.info(
          `indexed ${indexed} of ${added.page_count} pages into docs/pagefind`
        );

        if (indexed < EXPECTED_PAGES) {
          logger.warn(
            `only ${indexed} pages were indexed, expected at least ${EXPECTED_PAGES} — check data-pagefind-body is still on the article`
          );
        }
      },
    },
  };
}

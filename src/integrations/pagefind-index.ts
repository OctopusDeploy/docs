// Builds the Pagefind index from the HTML the site just emitted. What gets
// indexed is decided by the `data-pagefind-*` attributes in `Default.astro`.
//
// The index has to land inside `dist/docs/`, because `prune-dist.ts` deletes
// every top-level entry outside its allowlist, and this has to be registered
// before `pruneDist()` — hooks run in the order they are listed.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
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
        });

        if (!index) {
          throw new Error(`could not start Pagefind: ${errors.join(', ')}`);
        }

        // `dist/docs` rather than `dist`: the client sets a `basePath` of
        // `/docs/` which Pagefind prepends at query time, so indexing from `dist`
        // would put the prefix on twice.
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

        await close();

        // Files scanned, not pages indexed: the redirect stubs are counted here
        // and then dropped by `data-pagefind-body`.
        logger.info(`scanned ${added.page_count} pages into docs/pagefind`);
      },
    },
  };
}

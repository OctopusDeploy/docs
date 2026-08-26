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
          logger.info(`wrote ${titles.pages} titles to ${titles.file}`);
        } finally {
          await close();
        }
      },
    },
  };
}

/**
 * The map's name, carrying the index's own hash. Pagefind hashes its chunks so a
 * cache cannot serve one build's index against another's, and a map read against
 * the wrong index joins against nothing. The client reads the hash out of
 * `pagefind-entry.json` to build the same name.
 *
 * A module rather than JSON, because Front Door caches `.js` for a week as
 * immutable and compressed, and gives anything unrecognised `no-cache`. An
 * ETag-less revalidation is a full re-download, and this loads on every page.
 */
const titleMapName = (hash: string) => `docs-titles.${hash}.js`;

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
async function writeTitleMap(
  pagefindDir: string
): Promise<{ pages: number; file: string }> {
  const entry = JSON.parse(
    await readFile(path.join(pagefindDir, 'pagefind-entry.json'), 'utf8')
  ) as { languages: Record<string, { hash: string }> };

  const languages = Object.keys(entry.languages ?? {});
  // One map covers every fragment, so it can only carry one language's hash. A
  // second language would need one map each, keyed the way Pagefind keys its own
  // chunks — worth failing loudly over rather than shipping a map the client
  // looks for under the wrong name.
  if (languages.length !== 1) {
    throw new Error(
      `expected one indexed language, found ${languages.length || 'none'}: the title map is named after the index hash and cannot cover several`
    );
  }

  const file = titleMapName(entry.languages[languages[0]].hash);
  const dir = path.join(pagefindDir, 'fragment');
  const names = (await readdir(dir)).filter((name) =>
    name.endsWith('.pf_fragment')
  );

  const map: Record<string, [url: string, title: string]> = {};

  for (const name of names) {
    const raw = gunzipSync(await readFile(path.join(dir, name))).toString(
      'utf8'
    );

    // Checked before parsing: a Pagefind release that changes the chunk format
    // has to fail the build here, rather than write a map the overlay silently
    // cannot join against.
    if (!raw.startsWith(FRAGMENT_MAGIC)) {
      throw new Error(
        `unexpected fragment format in ${name}: Pagefind's own prefix is missing, so the title map cannot be trusted`
      );
    }

    const fragment = JSON.parse(raw.slice(raw.indexOf('{'))) as {
      url: string;
      meta?: Record<string, string>;
    };

    // The stub's `id` is the filename without its extension, which is the join.
    map[path.basename(name, '.pf_fragment')] = [
      fragment.url,
      fragment.meta?.title ?? '',
    ];
  }

  await writeFile(
    path.join(pagefindDir, file),
    `export default ${JSON.stringify(map)};
`,
    'utf8'
  );

  return { pages: names.length, file };
}

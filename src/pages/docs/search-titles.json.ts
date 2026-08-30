// Every indexed page's URL and title, for the search overlay to find the page a
// query names.
//
// `claimsName` in the overlay compares a query against a page's title and the
// last segment of its URL. Pagefind holds both, but only inside a result's
// fragment — one fetch per result — so a page ranked past the rows the overlay
// draws could not be reached at all. Both are known here at build time, from the
// same glob llms.txt.ts and sitemap.xml.ts walk.

import { accelerator } from '@lib/accelerator';
import { flattenGeneratedApiPath } from '@lib/generatedApiPaths';
import { isSearchIndexable } from '@lib/searchIndexing';

const allPages = import.meta.glob<any>(['./**/*.md', './**/*.mdx']);

async function getData() {
  // Pairs rather than objects: this is a row per page across the whole site, and
  // repeated keys would be most of the bytes. No description — a promoted row
  // shows no excerpt, which the overlay's CSS already collapses, and carrying one
  // per page would roughly triple this file.
  const pages: [url: string, title: string][] = [];

  for (const path in allPages) {
    const article: any = await allPages[path]();
    const frontmatter = article.frontmatter ?? {};

    // A redirect stub is built and served but has no article, so Pagefind drops
    // it and a promoted row for one would lead somewhere the search itself
    // cannot go.
    if (frontmatter.redirect) continue;

    const address = accelerator.urlFormatter.formatAddress(
      flattenGeneratedApiPath(article.url ?? '')
    );
    if (!address) continue;
    if (!isSearchIndexable(address, frontmatter)) continue;

    // Pagefind returns every URL with a trailing slash and `formatAddress`
    // returns none, and these are compared against each other by string: an
    // unslashed URL here silently matches no result and is promoted a second
    // time when its own row is reached.
    const url = address.endsWith('/') ? address : `${address}/`;

    // Pagefind takes a result's title from the first heading in the body and
    // only falls back to this one, so the two can differ. `claimsName` also
    // matches on the URL's last segment, which covers the pages where they do.
    const title =
      typeof frontmatter.title === 'string' ? frontmatter.title.trim() : '';
    if (!title) continue;

    pages.push([url, title]);
  }

  return new Response(JSON.stringify(pages), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const GET = getData;

// The per-page half of the Pagefind setup. The site-wide half — which element is
// indexed, and which blocks inside it are skipped — lives in
// `src/integrations/pagefind-index.ts`, so a layout only has to describe what is
// different about its pages.

import type { Frontmatter } from 'astro-accelerator-utils/types/Frontmatter';
import { classify } from '../scripts/search-engine';
import { isUnderConstructionUrl } from './underConstruction';

type ArticleAttributes = {
  'data-pagefind-ignore'?: string;
  'data-pagefind-filter'?: string;
  'data-pagefind-default-meta'?: string;
};

type IndexAttributes = {
  article: ArticleAttributes;
};

/**
 * Whether a page is in the search index at all.
 *
 * `navSearch` rather than `PostFiltering.showInSearch`, which also hides a page
 * with a future `pubDate`, a `draft: true` and a `listable: false`: a page that
 * is built and served is a page worth finding. No docs page carries any of the
 * three today, so this is the same set either way — decide again if one starts
 * being used to hold a page back.
 *
 * Exported because `/docs/search-titles.json` has to describe the same set. A
 * title in that list with no page behind it in the index would promote a row the
 * search itself has no answer for.
 */
export function isSearchIndexable(
  pathname: string,
  frontmatter: Frontmatter
): boolean {
  return frontmatter.navSearch !== false && !isUnderConstructionUrl(pathname);
}

/**
 * The `data-pagefind-*` attributes for a page, to spread onto the `<article>`.
 */
export function searchIndexAttributes(
  pathname: string,
  frontmatter: Frontmatter
): IndexAttributes {
  // `all` rather than the default `index`: a bare ignore still lets Pagefind
  // read a title or metadata out of the block.
  if (!isSearchIndexable(pathname, frontmatter))
    return { article: { 'data-pagefind-ignore': 'all' } };

  return {
    article: {
      // Which tab a result lands under. `classify` is the same function the
      // overlay uses at query time, so a filter value and a result's tab cannot
      // disagree.
      'data-pagefind-filter': `section:${classify(pathname).facet}`,
      // Pagefind takes a result's title from the first heading inside the indexed
      // body, so a page whose h1 renders as an image would show its URL in the
      // result row. A real heading still wins; this is only consulted when there
      // is none.
      ...(frontmatter.title
        ? { 'data-pagefind-default-meta': `title:${frontmatter.title}` }
        : {}),
    },
  };
}

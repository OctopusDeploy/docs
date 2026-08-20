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

/**
 * A second filter, on an element inside the article rather than on the article
 * itself: Pagefind reads one `key:value` per `data-pagefind-filter`, and a
 * comma-separated pair is taken as a single value.
 */
type ContentAttributes = {
  'data-pagefind-filter'?: string;
};

type IndexAttributes = {
  article: ArticleAttributes;
  content: ContentAttributes;
};

/**
 * How shallow a page has to be to count as one a reader might name. Two segments
 * past `/docs/`, which covers `/docs/deployments/` and
 * `/docs/infrastructure/deployment-targets/` but not the pages inside them.
 */
const LANDING_DEPTH = 3;

/**
 * The `data-pagefind-*` attributes for a page: `article` spreads onto the
 * `<article>`, `content` onto the page content inside it.
 *
 * `navSearch` rather than `PostFiltering.isListable`, which also hides a page
 * with a future `pubDate`: a page that is built and served is a page worth
 * finding.
 */
export function searchIndexAttributes(
  pathname: string,
  frontmatter: Frontmatter
): IndexAttributes {
  const indexable =
    frontmatter.navSearch !== false && !isUnderConstructionUrl(pathname);

  // `all` rather than the default `index`: a bare ignore still lets Pagefind
  // read a title or metadata out of the block.
  if (!indexable)
    return { article: { 'data-pagefind-ignore': 'all' }, content: {} };

  // Marks the pages the overlay's second, narrowed search looks through. Only
  // the shallow pages carry it, so the filter chunk stays small and that search
  // has a few hundred candidates rather than the whole site.
  const isLanding = pathname.split('/').filter(Boolean).length <= LANDING_DEPTH;

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
    content: isLanding ? { 'data-pagefind-filter': 'landing:true' } : {},
  };
}

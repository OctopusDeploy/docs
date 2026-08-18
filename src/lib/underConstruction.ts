// TEMPORARY - delete this file when the API reference goes live.
//
// The generated API reference under src/pages/docs/api is published, but the
// section is still under construction: there is no landing page, the existing
// /docs/octopus-rest-api content has not been folded in, and nothing links to
// it. Until that work lands we keep it out of the site search index and out of
// sitemap.xml, so neither readers nor Google arrive at it ahead of the pages
// that explain it.
//
// Call sites are src/pages/docs/search.json.ts and src/pages/docs/sitemap.xml.ts.
// Both take their page list from an `import.meta.glob` rooted at
// src/pages/docs, so the paths they pass in look like './api/feeds.md'.

const UNDER_CONSTRUCTION = [/^api(\/|$)/];

/** True for a page that is built and published, but deliberately not indexed. */
export function isUnderConstruction(globPath: string): boolean {
  const path = globPath.replace(/^\.?\//, '');
  return UNDER_CONSTRUCTION.some((pattern) => pattern.test(path));
}

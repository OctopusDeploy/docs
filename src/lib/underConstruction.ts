// TEMPORARY - delete this file when the API reference goes live.
//
// The generated API reference under src/pages/docs/api is published, but the
// section is still under construction: there is no landing page, the existing
// /docs/octopus-rest-api content has not been folded in, and nothing links to
// it. Until that work lands we keep it out of the site search index and out of
// sitemap.xml, so neither readers nor Google arrive at it ahead of the pages
// that explain it.
//
// Two call sites, which is why there are two entry points. sitemap.xml.ts takes
// its page list from an `import.meta.glob` rooted at src/pages/docs, so the paths
// it passes in look like './api/feeds.md'; `searchIndexAttributes` has the
// rendered URL.

const UNDER_CONSTRUCTION = [/^api(\/|$)/];

/** True for a page that is built and published, but deliberately not indexed. */
export function isUnderConstruction(globPath: string): boolean {
  const path = globPath.replace(/^\.?\//, '');
  return UNDER_CONSTRUCTION.some((pattern) => pattern.test(path));
}

/** The same test against a rendered page's URL. */
export function isUnderConstructionUrl(pathname: string): boolean {
  return isUnderConstruction(pathname.replace(/^\/docs\//, ''));
}

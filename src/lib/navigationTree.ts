import type { NavPage } from 'astro-accelerator-utils/types/NavPage';
import { SITE } from '@config';
import { menu } from '@data/navigation';
import { accelerator } from './accelerator';
import { apiPageUrls } from './apiNavigation';

// Navigation.autoMenu() rebuilds the whole site nav tree from all ~2,700 pages
// on every page render, and its getChildren() runs a full scan of that page
// list at every node - O(n^2) per page. That measured at ~82s of a ~196s
// build, by far the single largest cost.
//
// The tree itself is identical for every page. Only the isOpen / ariaCurrent
// flags vary, and those are cheap to recompute. So build the tree once per
// process and let callers derive their own view of it.
//
// Built against a URL that matches no page so the template starts neutral;
// callers overwrite every flag anyway via applyCurrentPage().
const TEMPLATE_URL = new URL('https://octopus.com/__nav-template__');

let template: NavPage[] | null = null;

// The API reference is navigated by its own tree (lib/apiNavigation.ts), so
// its pages are dropped here rather than listed in both. Dropping a node drops
// its children with it, which is what takes the whole section out in one go.
function withoutApiPages(pages: NavPage[]): NavPage[] {
  const apiUrls = apiPageUrls();
  const prune = (nodes: NavPage[]): NavPage[] =>
    nodes
      .filter((node) => !apiUrls.has((node.url ?? '').replace(/\/$/, '')))
      .map((node) => ({ ...node, children: prune(node.children ?? []) }));
  return prune(pages);
}

function buildMenu(): NavPage[] {
  return withoutApiPages(
    accelerator.navigation.menu(TEMPLATE_URL, SITE.subfolder, menu)
  );
}

export function menuTemplate(): NavPage[] {
  // Builds only. In dev, rebuild every time so a new or renamed page shows up
  // in the nav without restarting the server.
  if (!import.meta.env.PROD) {
    return buildMenu();
  }
  if (template === null) {
    template = buildMenu();
  }
  return template;
}

// Mirrors Navigation.setCurrentPage() in astro-accelerator-utils. Assigns
// unconditionally, so it is safe to run over cloned nodes carrying stale flags.
//
// Both sides are compared without a trailing slash, because whether the reader
// arrived at /docs/installation/requirements or .../requirements/ is not
// supposed to decide which row is highlighted. A page only counts as inside
// another when the prefix ends on a path boundary, or /docs/installation/require
// would open .../requirements.
export function applyCurrentPage(pages: NavPage[], currentUrl: URL): void {
  const trimSlash = (path: string) => path.replace(/\/$/, '');
  const currentPath = trimSlash(currentUrl.pathname);

  for (const page of pages) {
    const pagePath = trimSlash(page.url ?? '');
    page.isOpen =
      pagePath !== '' &&
      (currentPath === pagePath || currentPath.startsWith(pagePath + '/'));
    page.ariaCurrent =
      pagePath !== '' && currentPath === pagePath ? 'page' : false;
    if (page.children) applyCurrentPage(page.children, currentUrl);
  }
}

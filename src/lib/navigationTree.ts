import type { NavPage } from 'astro-accelerator-utils/types/NavPage';
import { SITE } from '@config';
import { menu } from '@data/navigation';
import { accelerator } from './accelerator';

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

export function menuTemplate(): NavPage[] {
  // Builds only. In dev, rebuild every time so a new or renamed page shows up
  // in the nav without restarting the server.
  if (!import.meta.env.PROD) {
    return accelerator.navigation.menu(TEMPLATE_URL, SITE.subfolder, menu);
  }
  if (template === null) {
    template = accelerator.navigation.menu(TEMPLATE_URL, SITE.subfolder, menu);
  }
  return template;
}

// The prev/next "article journey" is the nav tree flattened to its leaves in
// menu order. Like the tree itself this is the same for every page - only the
// reader's position in it changes - so build it once. Cloned first because
// flattening sorts each level in place and the template must stay untouched.
let journey: NavPage[] | null = null;

export function journeyOrder(): NavPage[] {
  if (journey !== null && import.meta.env.PROD) return journey;

  const leaves: NavPage[] = [];
  const flatten = (nodes: NavPage[]) => {
    nodes.sort((a, b) => a.order - b.order);
    for (const node of nodes) {
      if (node.children.length === 0) leaves.push(node);
      else flatten(node.children);
    }
  };
  flatten(structuredClone(menuTemplate()));

  if (import.meta.env.PROD) journey = leaves;
  return leaves;
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

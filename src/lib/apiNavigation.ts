import type { MarkdownInstance } from 'astro-accelerator-utils/types/Astro';
import { accelerator } from './accelerator';
import { SITE } from '@config';
import { buildCrumbs, type Crumb } from '@util/breadcrumbs';

// The API reference carries its own left nav, built here from the pages that
// opt into src/layouts/Api.astro. Those same pages are pruned out of the main
// site nav in navigationTree.ts, so the two trees never overlap.
//
// Unlike the site nav, this one is flat: an entry per page, and under the page
// the reader is on, an entry per endpoint. The endpoints come from the layout's
// own headings rather than from here — Posts.all() reads the page set back from
// a JSON cache, which leaves the frontmatter intact but drops getHeadings().

const API_LAYOUT = '/Api.astro';

const PAGES_ROOT = '/src/pages';

const API_SECTION_TITLE = 'Api';

function urlFromSourcePath(path: string): string {
  return path
    .slice(PAGES_ROOT.length)
    .replace(/\.md$/, '')
    .replace(/\/index$/, '');
}

// Astro only gives a page module a `url` when its file resolves inside
// src/pages. The generated pages are usually copied in, but they are symlinked
// in during local development, and a symlink resolves to wherever the generator
// wrote it — so those modules arrive with a file outside the site and no url at
// all. The glob keys are the paths the site routes on either way, so the url is
// rebuilt from them and the module's own url is only a fallback.
function urlsByFile(): Map<string, string> {
  // The glob call stays inside the function on purpose. These pages render
  // through src/layouts/Api.astro, which imports ApiNavigation.astro, which
  // imports this module — so the eager glob closes a cycle back onto itself.
  // Vite hoists the imports but builds the map object where the call sits, so
  // at module load the first page in the cycle is still initializing and a
  // top-level call captures `undefined` for it permanently. Called from in here
  // the object is built on the way past, once everything has settled.
  const source = import.meta.glob<{ file?: string }>(
    '/src/pages/docs/api/**/*.md',
    { eager: true }
  );

  return new Map(
    Object.entries(source)
      .filter(([, post]) => post?.file != null)
      .map(([path, post]) => [post.file as string, urlFromSourcePath(path)])
  );
}

export type ApiNavPage = {
  title: string;
  url: string;
  order: number;
};

export function isApiPage(post: MarkdownInstance): boolean {
  return (post?.frontmatter?.layout ?? '').includes(API_LAYOUT);
}

// Same deal as menuTemplate(): the list is identical for every page in the
// section, so it is built once and read by all of them.
let pages: ApiNavPage[] | null = null;

export function apiMenu(): ApiNavPage[] {
  // Builds only. In dev, rebuild every time so a new or edited page shows up
  // in the nav without restarting the server.
  if (pages !== null && import.meta.env.PROD) return pages;

  const urls = urlsByFile();

  const menu = accelerator.posts
    .all()
    .filter(isApiPage)
    .map((post) => ({
      title: post.frontmatter.navTitle ?? post.frontmatter.title,
      url: accelerator.urlFormatter.addSlashToAddress(
        post.url ?? urls.get(post.file) ?? '/'
      ),
      order: post.frontmatter.navOrder ?? Number.MAX_SAFE_INTEGER,
    }))
    // The pages are generated one per API area and carry no navOrder, so the
    // fallback is the alphabetical order the index page already lists them in.
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  if (import.meta.env.PROD) pages = menu;
  return menu;
}

/**
 * Every API page URL, trailing slash trimmed, for the site nav to prune
 * against.
 */
export function apiPageUrls(): Set<string> {
  return new Set(apiMenu().map((page) => page.url.replace(/\/$/, '')));
}

// The API reference has no page of its own at /docs/api yet - `_index.md` is
// underscore-prefixed so Astro does not route it - so the generic breadcrumb
// walk, which builds a crumb per path segment that resolves to a page, skips
// straight from Docs to the endpoint page. Splice the section in by hand so an
// API page reads "Docs / Api / Feeds".
//
// The crumb carries no url on purpose: there is nothing to link to until the
// landing page lands.
export function buildApiCrumbs(
  currentUrl: URL,
  extraCrumbs?: ReadonlyArray<Crumb> | null
): Crumb[] {
  const crumbs = buildCrumbs(currentUrl, extraCrumbs);
  const sectionPath = SITE.subfolder + '/api';

  if (!currentUrl.pathname.startsWith(sectionPath)) return crumbs;
  if (crumbs.some((crumb) => crumb.title === API_SECTION_TITLE)) return crumbs;

  // After the /docs crumb, which is the only one the walk finds above us.
  const insertAt = crumbs.findIndex(
    (crumb) => crumb.url.replace(/\/$/, '') === SITE.subfolder
  );

  const section: Crumb = { url: '', title: API_SECTION_TITLE };
  crumbs.splice(insertAt + 1, 0, section);
  return crumbs;
}

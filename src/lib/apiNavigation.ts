import type { MarkdownInstance } from 'astro-accelerator-utils/types/Astro';
import { accelerator } from './accelerator';
import { pageArea } from './areas';

// The API reference carries its own left nav, built here from the pages in the
// API area (see lib/areas.ts — the section they live in, not the layout they
// render with). Those same pages are pruned out of the main site nav in
// navigationTree.ts, so the two trees never overlap.
//
// Unlike the site nav, this one is flat: an entry per page, and under the page
// the reader is on, an entry per endpoint. The endpoints come from the layout's
// own headings rather than from here — Posts.all() reads the page set back from
// a JSON cache, which leaves the frontmatter intact but drops getHeadings().

const PAGES_ROOT = '/src/pages';

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

export function isApiPage(post: MarkdownInstance, urlHint?: string): boolean {
  return pageArea(post, urlHint) === 'api';
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
    // The recovered url is what decides the area for a page Astro gave none, so
    // it is worked out before the filter rather than inside the map.
    .map((post) => ({ post, url: post.url ?? urls.get(post.file) ?? '/' }))
    .filter(({ post, url }) => isApiPage(post, url))
    .map(({ post, url }) => ({
      title: post.frontmatter.navTitle ?? post.frontmatter.title,
      url: accelerator.urlFormatter.addSlashToAddress(url),
      order: post.frontmatter.navOrder ?? Number.MAX_SAFE_INTEGER,
    }))
    // The pages are generated one per API resource and carry no navOrder, so the
    // fallback is the alphabetical order the index page already lists them in.
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  if (import.meta.env.PROD) pages = menu;
  return menu;
}

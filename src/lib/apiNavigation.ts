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

export type ApiNavPage = {
  title: string;
  url: string;
  order: number;
};

export function isApiPage(post: MarkdownInstance): boolean {
  return pageArea(post) === 'api';
}

// Same deal as menuTemplate(): the list is identical for every page in the
// section, so it is built once and read by all of them.
let pages: ApiNavPage[] | null = null;

export function apiMenu(): ApiNavPage[] {
  // Builds only. In dev, rebuild every time so a new or edited page shows up
  // in the nav without restarting the server.
  if (pages !== null && import.meta.env.PROD) return pages;

  const menu = accelerator.posts
    .all()
    .filter(isApiPage)
    .map((post) => ({
      title: post.frontmatter.navTitle ?? post.frontmatter.title,
      url: accelerator.urlFormatter.addSlashToAddress(post.url ?? '/'),
      order: post.frontmatter.navOrder ?? Number.MAX_SAFE_INTEGER,
    }))
    // The pages are generated one per API resource and carry no navOrder, so the
    // fallback is the alphabetical order the index page already lists them in.
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  if (import.meta.env.PROD) pages = menu;
  return menu;
}

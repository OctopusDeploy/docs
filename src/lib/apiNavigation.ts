import type { MarkdownInstance } from 'astro-accelerator-utils/types/Astro';
import { accelerator } from './accelerator';

// The API reference carries its own left nav, built here from the pages that
// opt into src/layouts/Api.astro. Those same pages are pruned out of the main
// site nav in navigationTree.ts, so the two trees never overlap.
//
// Unlike the site nav, this one is flat: an entry per page, and under the page
// the reader is on, an entry per endpoint. The endpoints come from the layout's
// own headings rather than from here — Posts.all() reads the page set back from
// a JSON cache, which leaves the frontmatter intact but drops getHeadings().

const API_LAYOUT = '/Api.astro';

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

  const menu = accelerator.posts
    .all()
    .filter(isApiPage)
    .map((post) => ({
      title: post.frontmatter.navTitle ?? post.frontmatter.title,
      url: accelerator.urlFormatter.addSlashToAddress(post.url ?? '/'),
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

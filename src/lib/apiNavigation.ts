import type { MarkdownInstance } from 'astro-accelerator-utils/types/Astro';
import { PostFiltering } from 'astro-accelerator-utils';
import { SITE } from '@config';
import { accelerator } from './accelerator';
import { AREAS, pageArea } from './areas';
import { isGeneratedApiPath } from './generatedApiPaths';

// The API reference carries its own left nav, built here from the pages in the
// API area (see lib/areas.ts — the section they live in, not the layout they
// render with). Those same pages are pruned out of the main site nav in
// navigationTree.ts, so the two trees never overlap.
//
// The tree follows the folders the pages live in, the same way the docs nav
// does: /docs/api/octopus.client/using-resources sits under Octopus.Client
// rather than beside it. Under the page the reader is on there is one more
// level the docs nav has no equivalent of — an entry per endpoint. Those come
// from the layout's own headings rather than from here: Posts.all() reads the
// page set back from a JSON cache, which leaves the frontmatter intact but
// drops getHeadings().
//
// The menu comes back in two halves. The hand-written pages are one, the ~100
// generated ones under _generated are the other, and ApiNavigation.astro draws
// a rule between them.

export type ApiNavPage = {
  /** The row's label. */
  title: string;
  /** null for a folder that has no page of its own, so the row is not a link. */
  url: string | null;
  /** The url without its trailing slash, and the one thing a folder with no
      page still has: it is what decides whether the branch is open. */
  path: string;
  order: number;
  children: ApiNavPage[];
};

export type ApiMenu = {
  /** The pages under /docs/api that somebody wrote. */
  authored: ApiNavPage[];
  /** The pages generated into /docs/api/_generated. */
  generated: ApiNavPage[];
};

export function isApiPage(post: MarkdownInstance): boolean {
  return pageArea(post) === 'api';
}

// Where the area's tree is rooted. The pages hang off this, and the segments
// below it are the folders the tree is built out of.
const API_ROOT = SITE.subfolder + (AREAS.api.path ?? '');

const trimSlash = (path: string) => path.replace(/\/$/, '');

// A generated page is one whose source file sits under _generated. The url does
// not say so — [...generatedFileName].astro serves them from /docs/api as if
// the folder were not there — so the file is what has to be asked.
function isGenerated(post: MarkdownInstance): boolean {
  return isGeneratedApiPath(post.file ?? '');
}

// A folder with no index page of its own still needs a label. "openid-connect"
// reads as "Openid Connect", which is a stand-in: a folder that wants a better
// name gets an index.md, and its frontmatter names it.
function titleFromSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// The tree under construction. One node per url segment, whether or not a page
// lives at it, which is what keeps /docs/api/authentication/create-an-api-key
// in the nav while /docs/api/authentication has no page.
type TreeNode = {
  segment: string;
  path: string;
  post: MarkdownInstance | null;
  children: Map<string, TreeNode>;
};

function newNode(segment: string, path: string): TreeNode {
  return { segment, path, post: null, children: new Map() };
}

function insert(root: TreeNode, post: MarkdownInstance): void {
  const path = trimSlash(post.url ?? '');
  const rest = path.slice(API_ROOT.length).replace(/^\//, '');
  const segments = rest === '' ? [] : rest.split('/');

  let node = root;
  let walked = API_ROOT;
  for (const segment of segments) {
    walked += '/' + segment;
    let child = node.children.get(segment);
    if (child === undefined) {
      child = newNode(segment, walked);
      node.children.set(segment, child);
    }
    node = child;
  }

  node.post = post;
}

// Mirrors astro-accelerator's mapNavPage(): `navSection` names the branch,
// `navTitle` names the row, and the title covers for both when neither is set.
const rowTitle = (post: MarkdownInstance) =>
  post.frontmatter.navTitle ?? post.frontmatter.title;
const branchTitle = (post: MarkdownInstance) =>
  post.frontmatter.navSection ?? rowTitle(post);
const navOrder = (post: MarkdownInstance) =>
  post.frontmatter.navOrder ?? Number.MAX_SAFE_INTEGER;

const byOrderThenTitle = (a: ApiNavPage, b: ApiNavPage) =>
  a.order - b.order || a.title.localeCompare(b.title);

function toNavPage(node: TreeNode): ApiNavPage {
  const url = node.post
    ? accelerator.urlFormatter.addSlashToAddress(node.post.url ?? '/')
    : null;
  const children = [...node.children.values()].map(toNavPage);

  // A branch with a page of its own lists that page first, the way the docs nav
  // does: the summary opens the branch rather than linking, so without this row
  // there is no way in to the section's own page.
  if (children.length > 0 && node.post) {
    children.push({
      title: rowTitle(node.post),
      url,
      path: node.path,
      // Ahead of anything an author can set, so the section's own page stays at
      // the top of its section.
      order: Number.MIN_SAFE_INTEGER,
      children: [],
    });
  }

  children.sort(byOrderThenTitle);

  return {
    title: node.post
      ? children.length > 0
        ? branchTitle(node.post)
        : rowTitle(node.post)
      : titleFromSegment(node.segment),
    // A branch is opened by its summary, not by a link on it; the row for its
    // own page is in `children`.
    url: children.length > 0 ? null : url,
    path: node.path,
    // A folder with no page of its own sits where its earliest child would.
    order: node.post
      ? navOrder(node.post)
      : Math.min(...children.map((child) => child.order)),
    children,
  };
}

function buildTree(posts: MarkdownInstance[]): ApiNavPage[] {
  const root = newNode('', API_ROOT);
  for (const post of posts) insert(root, post);

  const pages = [...root.children.values()].map(toNavPage);

  // /docs/api itself is a page, and a sibling of the sections rather than a
  // branch over them: the tree is already rooted there.
  if (root.post) {
    pages.push({
      title: rowTitle(root.post),
      url: accelerator.urlFormatter.addSlashToAddress(root.post.url ?? '/'),
      path: API_ROOT,
      order: navOrder(root.post),
      children: [],
    });
  }

  return pages.sort(byOrderThenTitle);
}

// Same deal as menuTemplate(): the menu is identical for every page in the
// section, so it is built once and read by all of them.
let menu: ApiMenu | null = null;

export function apiMenu(): ApiMenu {
  // Builds only. In dev, rebuild every time so a new or edited page shows up
  // in the nav without restarting the server.
  if (menu !== null && import.meta.env.PROD) return menu;

  // navMenu: false keeps a page out of the nav, and the redirect stubs left
  // behind by moved pages all carry it. Without this they arrive as rows
  // titled "Redirect", each one a section of its own.
  const pages = accelerator.posts
    .all()
    .filter(isApiPage)
    .filter(PostFiltering.showInMenu);

  const built: ApiMenu = {
    authored: buildTree(pages.filter((post) => !isGenerated(post))),
    // The generated pages carry no navOrder — there is nobody to write one —
    // so they fall back to the alphabetical order the index page lists them in.
    generated: buildTree(pages.filter(isGenerated)),
  };

  if (import.meta.env.PROD) menu = built;
  return built;
}

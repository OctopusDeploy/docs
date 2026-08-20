import type { MarkdownInstance } from 'astro-accelerator-utils/types/Astro';
import { SITE } from '@config';
import { buildCrumbs, type Crumb } from '@util/breadcrumbs';
import { accelerator } from './accelerator';

// An "area" is a slice of the site with its own navigation tree: the docs, the
// API reference, and — as they arrive — Learn and the CLI reference. It is
// deliberately not the layout. The layout decides what the middle column looks
// like; the area decides which nav sits beside it and how the breadcrumbs read,
// so a page can be in the API area and still be laid out like a docs page.
//
// A page's area comes from where it lives, which is what the section already
// encodes: every page under /docs/api is in the API area without being told so,
// including the ~100 generated ones. A page that needs to say otherwise puts
// `area:` in its frontmatter and that wins.
//
// Adding an area takes four things, and this list is the only copy of it:
//   1. an entry in AREAS below, and the area's name in the Area union
//   2. the nav component it will render
//   3. a line for it in components/AreaNavigation.astro
//   4. its name in the `area` field's `choices` in frontmatter.json - miss this
//      one and the build still passes while authors cannot pick the area in
//      Front Matter CMS, with nothing on screen to say why

export type Area = 'docs' | 'api';

type AreaDefinition = {
  // The path the area occupies, under SITE.subfolder. The docs area is
  // everything left over, so it claims no path of its own.
  path: string | null;
  // A crumb to splice in for the section, for an area with no landing page for
  // the generic breadcrumb walk to find. null when the walk finds one.
  sectionCrumb: string | null;
};

export const AREAS = {
  docs: { path: null, sectionCrumb: null },
  // /docs/api has no page of its own yet: `_index.md` is underscore-prefixed so
  // Astro does not route it, which is why the crumb has to be spliced in.
  api: { path: '/api', sectionCrumb: 'Api' },
} as const satisfies Record<Area, AreaDefinition>;

const DEFAULT_AREA: Area = 'docs';

// Longest path first, so an area nested inside another one still wins.
const PATH_AREAS = (Object.entries(AREAS) as [Area, AreaDefinition][])
  .filter(([, definition]) => definition.path !== null)
  .sort((a, b) => (b[1].path as string).length - (a[1].path as string).length);

const trimSlash = (path: string) => path.replace(/\/$/, '');

function isArea(value: unknown): value is Area {
  // hasOwn, not `in`: `in` also finds Object.prototype's keys, so `area:
  // constructor` would validate and then resolve to a function, taking the page
  // out of every nav on the site - the outcome resolveArea() promises to avoid.
  return typeof value === 'string' && Object.hasOwn(AREAS, value);
}

/**
 * Whether a path sits inside an area's own path, on a path boundary.
 *
 * The boundary is the whole point: /docs/api-and-integration is not part of
 * /docs/api. Everything that compares a path against an area goes through here
 * so the rule cannot be applied in one place and skipped in another.
 */
function isUnderAreaPath(pathname: string, areaPath: string): boolean {
  const prefix = SITE.subfolder + areaPath;
  return pathname === prefix || pathname.startsWith(prefix + '/');
}

/**
 * The area a path falls in, before any frontmatter has its say.
 *
 * The prefix has to end on a path boundary, or /docs/api-and-integration would
 * read as part of the API reference.
 */
export function areaFromPath(path: string): Area {
  const pathname = trimSlash(path);

  for (const [area, definition] of PATH_AREAS) {
    if (isUnderAreaPath(pathname, definition.path as string)) return area;
  }

  return DEFAULT_AREA;
}

/**
 * The area for a page, given whatever its frontmatter declared and the path it
 * is served from. An unrecognized `area:` falls back to the path rather than
 * dropping the page out of every nav on the site.
 */
export function resolveArea(declared: unknown, path: string): Area {
  if (declared != null) {
    if (isArea(declared)) return declared;
    console.warn(
      `Unknown area "${String(declared)}" on ${path}. Falling back to the area its path implies. Known areas: ${Object.keys(AREAS).join(', ')}.`
    );
  }

  return areaFromPath(path);
}

// astro-accelerator-utils rewrites a redirect page's nav url to point at
// whatever it redirects to (mapNavPage in navigation.mjs), so the page has no
// nav node of its own for an area to move. Honouring `area:` on one would put
// it in the API nav via pageArea() while the site nav kept it, landing it in
// both trees - so it is not honoured anywhere, and says so out loud.
const REDIRECT_LAYOUT = 'src/layouts/Redirect.astro';

function declaredArea(post: MarkdownInstance): unknown {
  const declared = post?.frontmatter?.area;
  if (declared == null) return null;

  if (post?.frontmatter?.layout === REDIRECT_LAYOUT) {
    console.warn(
      `area: "${String(declared)}" on ${post.url ?? post.file} has no effect: the page redirects, so its nav entry belongs to ${String(post.frontmatter.redirect)}. Set the area on the page it redirects to.`
    );
    return null;
  }

  return declared;
}

/**
 * The url the nav tree will carry for a page, which is not always the url the
 * page is served from: mapNavPage() sends a paged page straight to its first
 * page. Overrides are looked up by what the tree holds, so they are keyed the
 * same way. Keep in step with astro-accelerator-utils navigation.mjs.
 */
function navUrl(post: MarkdownInstance): string {
  const url = post.url ?? '';
  return post.frontmatter?.paged ? trimSlash(url) + '/1' : url;
}

/**
 * The area for a page read back from the post list.
 *
 * Astro only gives a page module a `url` when its file resolves inside
 * src/pages, and the generated API pages are symlinked in during local
 * development — so those modules arrive with no url at all. `urlHint` is for
 * the caller that can rebuild it (see apiNavigation.urlsByFile).
 */
export function pageArea(post: MarkdownInstance, urlHint?: string): Area {
  return resolveArea(declaredArea(post), post?.url ?? urlHint ?? '');
}

// Pages whose frontmatter puts them in a different area than their path would.
// The site nav works from a tree of urls with no frontmatter attached, so the
// exceptions are collected up front and it looks them up by url.
//
// Only pages Astro gave a url — every hand-written one — can be listed here,
// which is the same set that can carry an `area:` of its own.
let overrides: Map<string, Area> | null = null;

function areaOverrides(): Map<string, Area> {
  if (overrides !== null && import.meta.env.PROD) return overrides;

  const map = new Map<string, Area>();
  for (const post of accelerator.posts.all()) {
    const declared = declaredArea(post);
    if (declared == null || post.url == null) continue;

    // The area is decided by the url the page is served from; the key is the
    // url the nav tree will look it up by. For most pages these are the same.
    const area = resolveArea(declared, post.url);
    if (area !== areaFromPath(post.url)) map.set(trimSlash(navUrl(post)), area);
  }

  // Builds only. In dev the page set changes under you, so rebuild each call.
  if (import.meta.env.PROD) overrides = map;
  return map;
}

/**
 * A resolver for a caller that has urls and nothing else; anything holding the
 * page itself should use pageArea() and skip the lookup.
 *
 * One resolver per pass over a set of urls, and that is the whole point of it:
 * collecting the overrides walks the entire page set, which in dev is re-read
 * from disk every call, so looking them up a url at a time turns one tree walk
 * into thousands of reads. It measured at 2.0s against 0.22s on a dev page
 * render before this existed.
 */
export function areaResolver(): (url: string) => Area {
  const overridesForPass = areaOverrides();

  return (url) => overridesForPass.get(trimSlash(url)) ?? areaFromPath(url);
}

/**
 * Breadcrumbs for a page, with the area's own section crumb spliced in where
 * the section has no page for the generic walk to land on. For an area that
 * needs no splice this is buildCrumbs().
 */
export function buildAreaCrumbs(
  currentUrl: URL,
  area: Area,
  extraCrumbs?: ReadonlyArray<Crumb> | null
): Crumb[] {
  const crumbs = buildCrumbs(currentUrl, extraCrumbs);
  const { path, sectionCrumb } = AREAS[area];

  if (path === null || sectionCrumb === null) return crumbs;
  // The crumbs follow the url, not the area: a page at /docs/guides/api-tour
  // that declares `area: api` shows the API nav but still sits under Docs >
  // Guides, so it gets no crumb from here. isUnderAreaPath, not a bare
  // startsWith, or /docs/api-and-integration would collect an "Api" crumb.
  if (!isUnderAreaPath(trimSlash(currentUrl.pathname), path)) return crumbs;
  if (crumbs.some((crumb) => crumb.title === sectionCrumb)) return crumbs;

  // After the /docs crumb, which is the only one the walk finds above us. The
  // crumb carries no url on purpose: there is nothing to link to until the
  // section has a landing page.
  const insertAt = crumbs.findIndex(
    (crumb) => trimSlash(crumb.url) === SITE.subfolder
  );
  crumbs.splice(insertAt + 1, 0, { url: '', title: sectionCrumb });

  return crumbs;
}

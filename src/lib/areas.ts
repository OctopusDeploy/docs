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
// Adding an area takes three things: an entry below, a case in
// components/AreaNavigation.astro, and the nav component it points at.

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
  return typeof value === 'string' && value in AREAS;
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
    const prefix = SITE.subfolder + definition.path;
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return area;
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

/**
 * The area for a page read back from the post list.
 *
 * Astro only gives a page module a `url` when its file resolves inside
 * src/pages, and the generated API pages are symlinked in during local
 * development — so those modules arrive with no url at all. `urlHint` is for
 * the caller that can rebuild it (see apiNavigation.urlsByFile).
 */
export function pageArea(post: MarkdownInstance, urlHint?: string): Area {
  return resolveArea(post?.frontmatter?.area, post?.url ?? urlHint ?? '');
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
    const declared = post.frontmatter?.area;
    if (declared == null || post.url == null) continue;

    const area = resolveArea(declared, post.url);
    if (area !== areaFromPath(post.url)) map.set(trimSlash(post.url), area);
  }

  // Builds only. In dev the page set changes under you, so rebuild each call.
  if (import.meta.env.PROD) overrides = map;
  return map;
}

/**
 * A resolver for a caller that has urls and nothing else; anything holding the
 * page itself should use pageArea() and skip the lookup.
 *
 * One resolver per pass over a set of urls. The overrides behind it are read
 * once per resolver, which is the point: collecting them walks the whole page
 * set, and in dev that set is re-read from disk every time, so a url-at-a-time
 * lookup turns a tree walk into thousands of them.
 *
 * They are collected on first use rather than up front, because reading the
 * page set is also what pulls the nav tree's lazy children into being, and
 * doing that before the caller's first lookup reorders the siblings that tie
 * on navOrder. A resolver that is only meant to be faster has no business
 * moving nav rows around.
 */
export function areaResolver(): (url: string) => Area {
  let overridesForPass: Map<string, Area> | null = null;

  return (url) => {
    overridesForPass ??= areaOverrides();
    return overridesForPass.get(trimSlash(url)) ?? areaFromPath(url);
  };
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
  if (!currentUrl.pathname.startsWith(SITE.subfolder + path)) return crumbs;
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

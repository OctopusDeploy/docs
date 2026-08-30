import matter from 'gray-matter';
import { SITE } from '@config';
import {
  eligibleForMarkdownWithLookup,
  pathToSlug as relPathToSlug,
  resolveMdxIncludesWithLookup,
  stripFrontmatter,
  type EligibilityInput,
  type MarkdownEligibility,
  type SharedContentLookup,
} from './mdxContentCore';

export {
  stripFrontmatter,
  sanitizeTitle,
  normalizeSubtitle,
  compareForLlmSurfaces,
  type NavSortable,
  type MarkdownEligibility,
  type SharedContentLookup,
} from './mdxContentCore';

const sharedContent = import.meta.glob<string>(
  ['/src/shared-content/**/*.md', '/src/shared-content/**/*.mdx'],
  { query: '?raw', import: 'default', eager: true }
);

const defaultLookup: SharedContentLookup = (path) => sharedContent[path];

export function resolveMdxIncludes(
  text: string,
  depth = 0,
  source = '<unknown>'
): string {
  return resolveMdxIncludesWithLookup(text, defaultLookup, depth, source);
}

export function eligibleForMarkdown(
  input: EligibilityInput
): MarkdownEligibility {
  return eligibleForMarkdownWithLookup(input, defaultLookup);
}

const docPageRaws = import.meta.glob<string>(
  ['/src/pages/docs/**/*.md', '/src/pages/docs/**/*.mdx'],
  { query: '?raw', import: 'default', eager: true }
);

function parseDocFrontmatter(raw: string): Record<string, unknown> {
  try {
    return (matter(raw).data ?? {}) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function globKeyToSlug(globKey: string): string | null {
  const m = globKey.match(/^\/src\/pages\/docs\/(.+\.(?:md|mdx))$/);
  if (!m) return null;
  return relPathToSlug(m[1]);
}

// Memoized for builds only: getPageMarkdownPath runs on every page, and
// the walk re-parses frontmatter for all ~2,660 docs pages each time (~23ms x
// ~1,270 pages ≈ 29s of build time). During a build the corpus cannot change,
// so one pass is enough. In dev it stays uncached so edits to docs frontmatter
// are reflected without a server restart.
let eligibleSlugsCache: Set<string> | null = null;

export function getEligibleSlugs(): Set<string> {
  if (import.meta.env.PROD && eligibleSlugsCache !== null) {
    return eligibleSlugsCache;
  }

  const slugs = new Set<string>();
  for (const path in docPageRaws) {
    const raw = docPageRaws[path];
    const fm = parseDocFrontmatter(raw);
    const verdict = eligibleForMarkdown({ path, frontmatter: fm, raw });
    if (!verdict.eligible) continue;

    const slug = globKeyToSlug(path);
    if (!slug) continue;
    slugs.add(slug);
  }

  if (import.meta.env.PROD) eligibleSlugsCache = slugs;

  return slugs;
}

export function getPageMarkdownPath(pathname: string): string | null {
  const docsPath = pathname.replace(/\/$/, '');
  const subfolderPrefix = SITE.subfolder.replace(/\/$/, '') + '/';
  if (!docsPath.startsWith(subfolderPrefix)) return null;

  const docsSlug = docsPath.slice(subfolderPrefix.length);
  return getEligibleSlugs().has(docsSlug) ? docsPath + '.md' : null;
}

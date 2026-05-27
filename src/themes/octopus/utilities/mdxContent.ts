import matter from 'gray-matter';
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

// No memoization: dev edits to docs frontmatter must be reflected without
// a server restart. The walk is sub-second on the current corpus.
export function getEligibleSlugs(): Set<string> {
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

  return slugs;
}

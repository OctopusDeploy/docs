import type { Frontmatter } from 'astro-accelerator-utils/types/Frontmatter';
import { SITE, STRUCTURED_DATA } from '@config';

export type ArticleType = 'Article' | 'TechArticle';

// Adds fields not on upstream Frontmatter. Re-declaring upstream fields
// would silently widen their optionality.
type StructuredDataFrontmatter = Frontmatter & {
  articleType?: ArticleType;
  draft?: boolean;
  // Per-page opt-out for an otherwise-eligible page.
  jsonLd?: boolean;
};

type ImageObjectNode = {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
};
export type PersonNode = {
  '@type': 'Person';
  name: string;
  url?: string;
};
type OrganizationNode = {
  '@type': 'Organization';
  '@id': string;
  name: string;
  url: string;
  logo: ImageObjectNode;
};
type WebSiteNode = {
  '@type': 'WebSite';
  '@id': string;
  name: string;
  url: string;
  inLanguage: string;
  publisher: { '@id': string };
};
type ArticleNode = {
  '@type': ArticleType;
  '@id': string;
  headline: string;
  description?: string;
  url: string;
  image?: string;
  mainEntityOfPage: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage: string;
  publisher: { '@id': string };
  isPartOf: { '@id': string };
  author?: PersonNode | PersonNode[];
  contributor?: PersonNode | PersonNode[];
};

export type GraphNode = OrganizationNode | WebSiteNode | ArticleNode;

// Frontmatter values can drift from declared types at runtime (YAML parses
// invalid dates as strings). Helpers take unknown and validate.

const SITE_ROOT = SITE.url + SITE.subfolder;
const SUBFOLDER = SITE.subfolder.replace(/\/$/, '');

const ORG_ID = `${SITE_ROOT}#organization`;
const WEBSITE_ID = `${SITE_ROOT}#website`;
const ORG_LOGO_URL = SITE.url + STRUCTURED_DATA.organizationLogo.src;
const ORG_LOGO_WIDTH = STRUCTURED_DATA.organizationLogo.width;
const ORG_LOGO_HEIGHT = STRUCTURED_DATA.organizationLogo.height;

const TECH_ARTICLE_PREFIXES = ['/installation', '/getting-started'].map(
  (p) => SUBFOLDER + p
);

// frontmatter.layout is absent at this stage, so no layout check.
// Add one if a Search-layout page appears without navSitemap: false.

// Safe inline serialization for <script type="application/ld+json">.
// Escapes </script>, <!--, and U+2028/U+2029 (JS line terminators).
// Returns "" for undefined to avoid throwing on .replace().
export function escapeJsonForScript(value: unknown): string {
  if (value === undefined) return '';
  return JSON.stringify(value)
    .replace(/<\//g, '<\\/')
    .replace(/<!/g, '<\\u0021')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function toDate(val: unknown): Date | null {
  if (val == null || val === '') return null;
  const date =
    val instanceof Date
      ? val
      : typeof val === 'string' || typeof val === 'number'
        ? new Date(val)
        : null;
  if (date === null || Number.isNaN(date.getTime())) return null;
  return date;
}

function toIsoDate(val: unknown): string | undefined {
  const date = toDate(val);
  return date ? date.toISOString() : undefined;
}

function isFuturePubDate(pubDate: unknown): boolean {
  const date = toDate(pubDate);
  return date !== null && date.getTime() > Date.now();
}

// Strips [, ], `, * that accelerator.markdown.getTextFrom doesn't strip,
// then caps at 110 chars on a word boundary.
export function cleanHeadline(text: unknown): string {
  if (typeof text !== 'string') return '';
  const stripped = text.replace(/[\[\]*`]/g, '').trim();
  if (stripped.length <= 110) return stripped;
  const window = stripped.slice(0, 110);
  const lastSpace = window.lastIndexOf(' ');
  return lastSpace > 0 ? window.slice(0, lastSpace) : window;
}

function cleanDescription(desc: unknown): string | undefined {
  if (typeof desc !== 'string') return undefined;
  const trimmed = desc.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// Canonicalize via Intl.Locale; toString() preserves extensions that
// baseName drops.
function pickLang(val: unknown): string {
  if (typeof val !== 'string' || val.length === 0) return SITE.default.lang;
  try {
    return new Intl.Locale(val).toString();
  } catch {
    return SITE.default.lang;
  }
}

function normalizePathname(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
}

// Same exclusion axes as the sitemap filter, minus layout (absent here).
export function isStructuredDataEligible(
  frontmatter: StructuredDataFrontmatter | null | undefined
): boolean {
  if (!frontmatter) return false;
  if (frontmatter.jsonLd === false) return false;
  if (frontmatter.redirect) return false;
  if (frontmatter.navSitemap === false) return false;
  if (frontmatter.draft === true) return false;
  if (isFuturePubDate(frontmatter.pubDate)) return false;
  return true;
}

// URL-prefix default; frontmatter.articleType overrides.
export function pickArticleType(
  pathname: string,
  frontmatter: StructuredDataFrontmatter
): ArticleType {
  const override = frontmatter.articleType;
  if (override === 'Article' || override === 'TechArticle') return override;
  const path = normalizePathname(pathname);
  for (const prefix of TECH_ARTICLE_PREFIXES) {
    if (path === prefix || path.startsWith(prefix + '/')) return 'TechArticle';
  }
  return 'Article';
}

// Cached per-page nodes. Convention: do not mutate. No runtime enforcement.
const ORGANIZATION_NODE: OrganizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.owner,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: ORG_LOGO_URL,
    width: ORG_LOGO_WIDTH,
    height: ORG_LOGO_HEIGHT,
  },
};

const WEBSITE_NODE: WebSiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.title,
  url: SITE_ROOT,
  inLanguage: SITE.default.lang,
  publisher: { '@id': ORG_ID },
};

export function buildOrganization(): OrganizationNode {
  return ORGANIZATION_NODE;
}

export function buildWebSite(): WebSiteNode {
  return WEBSITE_NODE;
}

// Minimal shape used here; avoids importing the upstream Astro type.
type AuthorWriter = {
  url: string | undefined;
  frontmatter: { title?: unknown };
};

// Emits Person.name only. Person.url is blocked by the TODO in Authors.astro.
export function buildPersonNodes(
  writers: ReadonlyArray<AuthorWriter>
): PersonNode[] {
  const result: PersonNode[] = [];
  for (const w of writers) {
    const name =
      typeof w.frontmatter?.title === 'string'
        ? w.frontmatter.title.trim()
        : '';
    if (!name) continue;
    result.push({ '@type': 'Person', name });
  }
  return result;
}

type BuildArticleInput = {
  frontmatter: StructuredDataFrontmatter;
  canonicalURL: string;
  articleType: ArticleType;
  headline: string;
  imageURL?: string;
  mainAuthor?: PersonNode | null;
  contributors?: ReadonlyArray<PersonNode>;
};

export function buildArticle({
  frontmatter,
  canonicalURL,
  articleType,
  headline,
  imageURL,
  mainAuthor,
  contributors,
}: BuildArticleInput): ArticleNode | null {
  if (!headline) return null;
  const description = cleanDescription(frontmatter.description);
  const datePublished = toIsoDate(frontmatter.pubDate);
  if (frontmatter.pubDate && !datePublished) {
    console.warn(
      `[JsonLd] unparseable pubDate on ${canonicalURL}: ${String(frontmatter.pubDate)}`
    );
  }
  let dateModified = toIsoDate(frontmatter.modDate) ?? datePublished;
  if (frontmatter.modDate && !toIsoDate(frontmatter.modDate)) {
    console.warn(
      `[JsonLd] unparseable modDate on ${canonicalURL}: ${String(frontmatter.modDate)}`
    );
  }
  // Search Console flags modDate < pubDate.
  if (datePublished && dateModified && dateModified < datePublished) {
    console.warn(
      `[JsonLd] modDate (${dateModified}) precedes pubDate (${datePublished}) on ${canonicalURL}; falling back to pubDate.`
    );
    dateModified = datePublished;
  }
  const lang = pickLang(frontmatter.lang);

  const node: ArticleNode = {
    '@type': articleType,
    '@id': `${canonicalURL}#article`,
    headline,
    ...(description && { description }),
    url: canonicalURL,
    ...(imageURL && { image: imageURL }),
    mainEntityOfPage: canonicalURL,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (mainAuthor) node.author = mainAuthor;

  if (contributors && contributors.length > 0) {
    // Spread converts ReadonlyArray to mutable; not a defensive copy.
    node.contributor =
      contributors.length === 1 ? contributors[0] : [...contributors];
  }

  return node;
}

// Single @graph payload; all @ids resolve in-document. Article first.
export function toGraphPayload(nodes: ReadonlyArray<GraphNode>): {
  '@context': string;
  '@graph': ReadonlyArray<GraphNode>;
} {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

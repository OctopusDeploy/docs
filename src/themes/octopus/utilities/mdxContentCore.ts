export type SharedContentLookup = (absolutePath: string) => string | undefined;

const importLineRe =
  /^[ \t]*import\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;?[ \t]*$/;

// Tolerates BOM, CR, and a missing trailing newline after the closing `---`.
export function stripFrontmatter(text: string): string {
  const m = text.match(/^﻿?---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n([\s\S]*))?$/);
  return m ? (m[1] ?? '') : text;
}

function splitLeadingImports(text: string): {
  head: string;
  body: string;
  importLines: string[];
} {
  const lines = text.split(/\r?\n/);
  const importLines: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i++;
      continue;
    }
    if (importLineRe.test(line)) {
      importLines.push(line);
      i++;
      continue;
    }
    break;
  }
  const head = lines.slice(0, i).join('\n');
  const body = lines.slice(i).join('\n');
  return { head, body, importLines };
}

function classifyImports(
  importLines: string[],
  lookup: SharedContentLookup
): {
  names: string[];
  resolved: Record<string, string>;
  unresolvedPaths: string[];
} {
  const names: string[] = [];
  const resolved: Record<string, string> = {};
  const unresolvedPaths: string[] = [];

  for (const line of importLines) {
    const m = line.match(importLineRe);
    if (!m) continue;
    const name = m[1];
    const importPath = m[2];
    names.push(name);

    if (!/\.(md|mdx)$/.test(importPath)) {
      unresolvedPaths.push(importPath);
      continue;
    }

    const lookupPath = importPath.startsWith('/')
      ? importPath
      : '/' + importPath;
    const content = lookup(lookupPath);
    if (typeof content !== 'string') {
      unresolvedPaths.push(importPath);
      continue;
    }

    resolved[name] = stripFrontmatter(content).trim();
  }

  return { names, resolved, unresolvedPaths };
}

const MAX_RESOLVE_DEPTH = 5;

// Must be `/g` for `matchAll`.
const fenceSplitRe = /(```[\s\S]*?```|`[^`\n]*`)/g;

function splitFenceSegments(
  text: string
): Array<{ text: string; isFence: boolean }> {
  const segments: Array<{ text: string; isFence: boolean }> = [];
  let lastIndex = 0;
  for (const m of text.matchAll(fenceSplitRe)) {
    const start = m.index ?? 0;
    if (start > lastIndex) {
      segments.push({ text: text.slice(lastIndex, start), isFence: false });
    }
    segments.push({ text: m[0], isFence: true });
    lastIndex = start + m[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isFence: false });
  }
  return segments;
}

export function resolveMdxIncludesWithLookup(
  text: string,
  lookup: SharedContentLookup,
  depth = 0,
  source = '<unknown>'
): string {
  if (depth > MAX_RESOLVE_DEPTH) {
    console.warn(
      '[mdxContent] resolveMdxIncludes: max depth ' +
        MAX_RESOLVE_DEPTH +
        ' exceeded for ' +
        source +
        '; leaving residual tags in place'
    );
    return text;
  }

  const { body, importLines } = splitLeadingImports(text);
  const { resolved } = classifyImports(importLines, lookup);

  // Substitute outside fenced regions only, so a docs page describing the
  // include syntax in a code sample keeps its example verbatim.
  const segments = splitFenceSegments(body);
  let changed = false;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.isFence) continue;
    let segText = seg.text;
    for (const [name, content] of Object.entries(resolved)) {
      const selfClosing = new RegExp('<' + name + '\\s*/>', 'g');
      const openClose = new RegExp(
        '<' + name + '\\s*>[\\s\\S]*?</' + name + '\\s*>',
        'g'
      );
      const before = segText;
      segText = segText.replace(selfClosing, content);
      segText = segText.replace(openClose, content);
      if (segText !== before) changed = true;
    }
    segments[i] = { text: segText, isFence: false };
  }
  const result = segments.map((s) => s.text).join('');

  if (changed) {
    return resolveMdxIncludesWithLookup(result, lookup, depth + 1, source);
  }

  return result.replace(/^\s*\n+/, '').replace(/\n{3,}/g, '\n\n');
}

// Must be `/g` for `matchAll`.
const componentTagRe = /<([A-Z][A-Za-z0-9_]*)(?:\s|\/|>)/g;

function stripFences(text: string): string {
  return splitFenceSegments(text)
    .filter((s) => !s.isFence)
    .map((s) => s.text)
    .join('');
}

export type MarkdownEligibility =
  | { eligible: true }
  | { eligible: false; reason: string };

export type EligibilityFrontmatter = Record<string, unknown> | null | undefined;

export type EligibilityInput = {
  path: string;
  frontmatter: EligibilityFrontmatter;
  raw: string;
};

function isAuthorLayout(layout: unknown): boolean {
  return typeof layout === 'string' && layout.includes('/Author.astro');
}

function isSearchLayout(layout: unknown): boolean {
  return typeof layout === 'string' && layout.includes('/Search.astro');
}

function isRedirectLayout(layout: unknown): boolean {
  return typeof layout === 'string' && layout.includes('/Redirect.astro');
}

function isFuturePubDate(pubDate: unknown): boolean {
  // pubDate arrives as a string from Astro but as a Date from gray-matter;
  // accept both so every LLM surface treats the page the same way.
  let ts: number;
  if (pubDate instanceof Date) {
    ts = pubDate.getTime();
  } else if (typeof pubDate === 'number') {
    ts = pubDate;
  } else if (typeof pubDate === 'string' && pubDate.trim().length > 0) {
    ts = Date.parse(pubDate);
  } else {
    return false;
  }
  if (Number.isNaN(ts)) return false;
  return ts > Date.now();
}

export function eligibleForMarkdownWithLookup(
  input: EligibilityInput,
  lookup: SharedContentLookup
): MarkdownEligibility {
  const { path, frontmatter, raw } = input;
  const fm = (frontmatter ?? {}) as Record<string, unknown>;

  if (typeof fm.layout !== 'string' || fm.layout.trim().length === 0) {
    return { eligible: false, reason: 'no-layout' };
  }

  if (fm.draft) return { eligible: false, reason: 'draft' };
  if (fm.redirect) return { eligible: false, reason: 'redirect' };
  if (isRedirectLayout(fm.layout)) {
    return { eligible: false, reason: 'redirect-layout' };
  }
  if (isAuthorLayout(fm.layout)) {
    return { eligible: false, reason: 'author-page' };
  }
  if (isSearchLayout(fm.layout)) {
    return { eligible: false, reason: 'search-page' };
  }
  if (fm.navSitemap === false) {
    return { eligible: false, reason: 'nav-sitemap-false' };
  }
  if (isFuturePubDate(fm.pubDate)) {
    return { eligible: false, reason: 'future-pubdate' };
  }

  const isMdx = /\.mdx$/i.test(path);
  if (!isMdx) return { eligible: true };

  const stripped = stripFrontmatter(raw);
  const { body, importLines } = splitLeadingImports(stripped);
  const { names, unresolvedPaths } = classifyImports(importLines, lookup);

  if (unresolvedPaths.length > 0) {
    return { eligible: false, reason: 'mdx-unresolvable-imports' };
  }

  const importedNames = new Set(names);
  const scanBody = stripFences(body);
  for (const match of scanBody.matchAll(componentTagRe)) {
    const name = match[1];
    if (!importedNames.has(name)) {
      return { eligible: false, reason: 'mdx-unknown-component' };
    }
  }

  return { eligible: true };
}

export function sanitizeTitle(raw: unknown): string {
  const s = (raw ?? 'Untitled').toString();
  return s.replace(/[\[\]*`]/g, '').trim() || 'Untitled';
}

export function normalizeSubtitle(raw: unknown): string | null {
  return typeof raw === 'string' && raw.trim().length > 0 ? raw : null;
}

export type NavSortable = {
  slug: string;
  navOrder: number;
  navSection: string;
};

// Returns null for the docs root index.
export function pathToSlug(relPath: string): string | null {
  const noExt = relPath.replace(/\.(md|mdx)$/i, '');
  if (noExt === relPath) return null;
  if (noExt === 'index') return null;
  return noExt.replace(/\/index$/, '');
}

export function compareForLlmSurfaces(a: NavSortable, b: NavSortable): number {
  const aEmpty = a.navSection.trim().length === 0;
  const bEmpty = b.navSection.trim().length === 0;
  if (aEmpty !== bEmpty) return aEmpty ? 1 : -1;
  if (a.navSection !== b.navSection) {
    return a.navSection.localeCompare(b.navSection, 'en');
  }
  if (a.navOrder !== b.navOrder) {
    return a.navOrder - b.navOrder;
  }
  return a.slug.localeCompare(b.slug, 'en');
}

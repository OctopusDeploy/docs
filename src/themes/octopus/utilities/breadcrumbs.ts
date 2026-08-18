import { accelerator } from '@lib/accelerator';
import { SITE } from '@config';

export type Crumb = {
  url: string;
  title: string;
  ariaCurrent?: string | false;
  rel?: string;
};

let crumbTitles: Map<string, string> | null = null;

function crumbTitleMap(): Map<string, string> {
  if (crumbTitles !== null) return crumbTitles;

  const map = new Map<string, string>();
  for (const page of accelerator.posts.all()) {
    const title = page.frontmatter?.crumbTitle;
    if (typeof title !== 'string' || title.length === 0) continue;
    map.set(accelerator.urlFormatter.addSlashToAddress(page.url ?? '/'), title);
  }

  // Builds only. In dev the page set changes under you, so rebuild each call.
  if (import.meta.env.PROD) crumbTitles = map;
  return map;
}

export function buildCrumbs(
  currentUrl: URL,
  extraCrumbs?: ReadonlyArray<Crumb> | null
): Crumb[] {
  const navPages = accelerator.navigation.breadcrumbs(
    currentUrl,
    SITE.subfolder,
    extraCrumbs?.length ?? 0
  );

  const titles = crumbTitleMap();

  for (const page of navPages) {
    page.title = titles.get(page.url) || page.section || page.title;
  }

  return [...navPages, ...(extraCrumbs ?? [])];
}

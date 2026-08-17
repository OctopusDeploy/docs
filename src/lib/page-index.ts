// Breadcrumbs needs to map a crumb URL back to the page it came from. Doing
// that with `posts.all().find(...)` is a linear scan of ~2,700 pages per crumb
// per page, and every probe builds a `new URL` inside `addSlashToAddress` — it
// measured at ~2.8s of the build. The page set is fixed for the duration of a
// build, so index it once.
import accelerator from '@lib/accelerator';

type Page = ReturnType<typeof accelerator.posts.all>[number];

let index: Map<string, Page> | null = null;

export function pageByCrumbUrl(url: string): Page | undefined {
  if (index === null) {
    const built = new Map<string, Page>();
    for (const p of accelerator.posts.all()) {
      const key = accelerator.urlFormatter.addSlashToAddress(p.url ?? '/');
      // `.find` returned the first match, so first write wins.
      if (!built.has(key)) built.set(key, p);
    }
    // In dev the page set changes under you, so keep rebuilding.
    if (import.meta.env.PROD) index = built;
    return built.get(url);
  }
  return index.get(url);
}

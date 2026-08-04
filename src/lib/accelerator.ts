import { Accelerator } from 'astro-accelerator-utils';
import { SITE } from '@config';

// Shared, memoized Accelerator for the whole build process.
//
// Every getter on Accelerator constructs a brand new helper on each property
// access, and Posts.all() round-trips the entire page set through a ~1.1 MB
// JSON file on disk (readFileSync + JSON.parse) on every single call. With
// ~1,270 content pages and 6-8 call sites per page that measured at ~23s of
// the build, all of it recomputing an identical answer.
//
// Nothing here changes behavior: the page set is fixed for the duration of a
// build, so one snapshot is correct for every page.

const accelerator = new Accelerator(SITE);

// Capture the originals *before* shadowing, so the prototype getters still run
// once each and see the real dependencies.
const cache = accelerator.cache;
const urlFormatter = accelerator.urlFormatter;
const markdown = accelerator.markdown;
const dateFormatter = accelerator.dateFormatter;
const posts = accelerator.posts;

// Resolved lazily, never at module-init time: Posts.all() runs an eager
// import.meta.glob over every page, so forcing it during module init would
// pull page modules in before their own imports have finished initializing and
// hand back undefined entries.
//
// Navigation.breadcrumbs() splices the array it is handed, so return a fresh
// shallow copy each call. Copying 2,700 references is microseconds; parsing
// 1.1 MB of JSON is ~18 ms.
// Builds only. In dev the page set changes under you, so keep reading through.
const readAll = posts.all.bind(posts);
let allPosts: ReturnType<typeof readAll> | null = null;

if (import.meta.env.PROD) {
  posts.all = () => {
    if (allPosts === null) allPosts = readAll();
    return allPosts.slice();
  };
}

const shadow = (key: string, value: unknown) =>
  Object.defineProperty(accelerator, key, { get: () => value });

shadow('cache', cache);
shadow('urlFormatter', urlFormatter);
shadow('markdown', markdown);
shadow('dateFormatter', dateFormatter);
shadow('posts', posts);

// These read this.posts / this.cache / this.urlFormatter, so they must be
// built after the shadows above are in place.
const taxonomy = accelerator.taxonomy;
shadow('taxonomy', taxonomy);

const navigation = accelerator.navigation;
shadow('navigation', navigation);

const authors = accelerator.authors;
shadow('authors', authors);

export { accelerator };
export default accelerator;

// Two references are generated rather than written: the API reference under
// /docs/api and the CLI reference under /docs/cli. Both keep their generated
// pages in a _generated folder so they sit apart from the hand-written pages on
// disk, and both are served from the folder above it by a
// [...generatedFileName].astro route. An area added to the list here is one
// whose _generated folder is understood everywhere a url is derived from a file
// path: the nav, the sitemap, the llms.txt endpoints and the markdown copies.
const GENERATED_AREAS = ['api', 'cli'];

const GENERATED_DIR = new RegExp(
  `(^|/)(${GENERATED_AREAS.join('|')})/_generated/`
);

/** Generated docs live in a _generated subfolder, this checks if a given path is to a generated file */
export function isGeneratedPath(path: string): boolean {
  return GENERATED_DIR.test(path);
}

/**
 * Removes _generated from a path to a generated doc file, as _generated is part of the path on
 * disk but not where it's actually served from, which strips the _generated part
 */
export function flattenGeneratedPath(path: string): string {
  return path.replace(GENERATED_DIR, '$1$2/');
}

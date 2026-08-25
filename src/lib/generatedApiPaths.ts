const GENERATED_API_DIR = /(^|\/)api\/_generated\//;

/** Generated API docs live in a _generated subfolder, this checks if a given path is to a generated file */
export function isGeneratedApiPath(path: string): boolean {
  return GENERATED_API_DIR.test(path);
}

/**
 * Removes _generated from a path to a generated API doc file, as _generated is part of the path on
 * disk but not where it's actually served from, which strips the _generated part
 */
export function flattenGeneratedApiPath(path: string): string {
  return path.replace(GENERATED_API_DIR, '$1api/');
}

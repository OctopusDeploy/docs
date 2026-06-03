import fs from 'node:fs/promises';
import path from 'node:path';

const FOOTER_URL = import.meta.env.FOOTER_FRAGMENT_URL;
const FALLBACK_DIR = path.resolve('./src/fallback');
const FETCH_TIMEOUT_MS = 3000;

export type FragmentResult = {
  html: string;
  source: 'live' | 'fallback';
  note: string;
};

// Module-level cache. Astro evaluates this module once per build process,
// so each fragment is fetched at most once across all pages - total network
// cost per build: 2 fetches regardless of page count.
const cache: { footer?: FragmentResult } = {};

async function fetchLive(
  url: string
): Promise<{ html: string; note: string } | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return {
      html: await res.text(),
      note: `fetched ${url} at ${new Date().toISOString()}`,
    };
  } catch {
    return null;
  }
}

async function readSnapshot(
  fallbackFile: string,
  reason: string
): Promise<FragmentResult> {
  const html = await fs.readFile(
    path.join(FALLBACK_DIR, fallbackFile),
    'utf-8'
  );
  return {
    html,
    source: 'fallback',
    note: `using src/fallback/${fallbackFile} (${reason})`,
  };
}

async function getFragment(
  url: string,
  fallbackFile: string,
  key: 'footer'
): Promise<FragmentResult> {
  if (cache[key]) return cache[key]!;
  const live = await fetchLive(url);
  if (live) cache[key] = { html: live.html, source: 'live', note: live.note };
  else {
    console.warn(
      `[shared-nav] live fetch failed for ${url}, using snapshot fallback`
    );
    cache[key] = await readSnapshot(
      fallbackFile,
      `live fetch failed for ${url}`
    );
  }
  return cache[key]!;
}

export const fetchFooter = () =>
  getFragment(FOOTER_URL, 'footer.html', 'footer');
export const ASSETS = import.meta.env.SHARED_ASSETS_BASE_URL;
export const ASSETS_ORIGIN = import.meta.env.SHARED_ASSETS_ORIGIN;

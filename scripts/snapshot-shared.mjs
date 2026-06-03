import fs from 'node:fs/promises';
import path from 'node:path';

const FOOTER_URL = process.env.FOOTER_FRAGMENT_URL;
const OUT = path.resolve('./src/fallback');

if (!FOOTER_URL) {
  console.error(
    'Missing FOOTER_FRAGMENT_URL. Run via `pnpm snapshot` so .env.production is loaded, or set the var explicitly.'
  );
  process.exit(1);
}

async function snapshot(url, file) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  const text = await res.text();
  if (!text.trim()) throw new Error(`${url} returned empty body`);
  await fs.writeFile(path.join(OUT, file), text);
  return text.length;
}

await fs.mkdir(OUT, { recursive: true });
const footerBytes = await snapshot(FOOTER_URL, 'footer.html');
console.log(`Snapshot refreshed: footer ${footerBytes}B`);

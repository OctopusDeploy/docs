// What each index costs to ship, corrected for where it happens to be hosted.
//
// The staging sites are Azure static website endpoints, which serve blobs
// verbatim with no compression. Production is behind a CDN that brotlis
// everything. Measuring the wire alone would charge the spikes 11MB for a file
// that ships at 1.3MB, so each index is fetched once and compressed locally,
// and both numbers are reported.
//
// No browser needed, so this runs in seconds and is the first thing worth
// looking at.

import { gzipSync, brotliCompressSync, constants } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
import { TARGETS, HOSTING, NETWORK, RESULTS_DIR } from './config.mjs';

const rows = [];

for (const target of TARGETS) {
  let raw = 0;
  let gzip = 0;
  let brotli = 0;
  const files = [];

  for (const url of target.payloadUrls) {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  ${url} returned ${response.status}, skipped`);
      continue;
    }

    const body = Buffer.from(await response.arrayBuffer());
    const gz = gzipSync(body, { level: 9 }).length;
    const br = brotliCompressSync(body, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    }).length;

    raw += body.length;
    gzip += gz;
    brotli += br;
    files.push({ url, raw: body.length, gzip: gz, brotli: br });
  }

  // How long the unconditional part of the index takes to arrive on the same
  // connection the perf run uses. Pagefind's per-query chunks are not in here,
  // which is the point — they are not unconditional.
  const wire = HOSTING.compressed.has(target.key) ? brotli : raw;
  const downloadSeconds = wire / NETWORK.downloadThroughput;
  const cdnSeconds = brotli / NETWORK.downloadThroughput;

  rows.push({
    target: target.key,
    label: target.label,
    raw,
    gzip,
    brotli,
    servedCompressed: HOSTING.compressed.has(target.key),
    wireToday: wire,
    downloadSecondsToday: downloadSeconds,
    downloadSecondsOnCdn: cdnSeconds,
    // The number caching cannot remove: every fresh page load parses this much
    // JSON or instantiates this much WASM, cache hit or not.
    parsedBytes: raw,
    files,
  });

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log(
    `${target.label.padEnd(24)} raw ${mb(raw)}MB  gzip ${mb(gzip)}MB  brotli ${mb(
      brotli
    )}MB  ${NETWORK.label} on CDN ${cdnSeconds.toFixed(1)}s`
  );
}

await mkdir(RESULTS_DIR, { recursive: true });
await writeFile(
  new URL('./payload.json', RESULTS_DIR),
  JSON.stringify(
    { ranAt: new Date().toISOString(), network: NETWORK, rows },
    null,
    2
  )
);

console.log(`\nwritten to ${new URL('./payload.json', RESULTS_DIR).pathname}`);

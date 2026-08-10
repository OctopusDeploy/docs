// The built site is proxied onto octopus.com under `/docs/` only, so anything
// the build emits outside that prefix can never be served. Prune them from the build output to reduce size and keep things clean.
import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';

// For things not in this list, run locally with `pnpm dev` to access. They are not reachable on octopus.com, so we don't want to ship them in the build output.
const KEEP = new Set([
  'docs', // This is the main site content, which is served under /docs/ on octopus.com.
  'index.html', // index.html is the entrypoint for the staging site, so we want to keep it.
  'report', // index.html links to some reports, so we keep them to avoid dead links, plus they can be useful on staging sites.
  'css', // report pages have their own css in this folder
  'components', // the component showcase is useful for sharing components in staging sites.
]);

export default function pruneDist(): AstroIntegration {
  return {
    name: 'prune-dist',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const removed: string[] = [];

        for (const entry of fs.readdirSync(distDir)) {
          if (KEEP.has(entry)) continue;

          const target = path.join(distDir, entry);
          await fs.promises.rm(target, { recursive: true, force: true });
          removed.push(entry);
        }

        if (removed.length === 0) {
          logger.info('Nothing to prune outside /docs/.');
          return;
        }

        logger.info(
          `Pruned ${removed.length} unreachable root entr${removed.length === 1 ? 'y' : 'ies'}: ${removed.join(', ')}`
        );
      },
    },
  };
}

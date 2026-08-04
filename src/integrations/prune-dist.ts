// The built site is proxied onto octopus.com under `/docs/` only, so anything
// the build emits outside that prefix can never be served. Astro still routes
// `src/pages/index.md`, `src/pages/components.mdx`, `src/pages/report/**` and
// friends to the site root, which is useful under `astro dev` but is dead
// weight in the deployed package. Strip it after the build so the local dev
// experience keeps working without shipping unreachable files.

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';

const KEEP = new Set(['docs']);

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

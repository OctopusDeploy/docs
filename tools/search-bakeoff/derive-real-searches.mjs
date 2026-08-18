// Builds a query set from the search terms readers actually typed.
//
// This is the strongest evidence available and it arrived last: a Plausible
// custom-property breakdown of the `search` property, dated 2026-07-28. Unlike
// the corpus-derived and top-pages sets, the query strings here are real. What
// is inferred is only the *expected page* — the analytics records what was typed,
// never whether the reader found what they wanted.
//
// Two properties of the data shape everything downstream:
//
//   1. `(none)` accounts for 12.7k of 12.7k visitors. Search is used by a small
//      single-digit percentage of sessions, and the largest single real query has
//      17 visitors. Every number from this set is a ratio over a small base.
//   2. Most entries are partial words — `te`, `var`, `tent`, `tentac`, `permiss`,
//      `exter`. The property is captured per keystroke, so this set is mostly a
//      record of what people see *while typing*, not of finished queries.
//
// Run: node tools/search-bakeoff/derive-real-searches.mjs

import { readFile, writeFile } from 'node:fs/promises';

const CSV =
  'C:/Users/WillLaugesen/Downloads/2026-07-28-Docs snapshot - Top searches.csv';
const OUT = new URL('./queries/real-searches.json', import.meta.url);

// Best inference of the page each term was after. Where a term could reasonably
// mean more than one page, every plausible target counts as a hit — the point is
// to measure whether search gets the reader somewhere useful, not to guess which
// of two useful pages they preferred.
const EXPECTED = {
  variables: ['/docs/projects/variables'],
  variable: ['/docs/projects/variables'],
  var: ['/docs/projects/variables'],
  vari: ['/docs/projects/variables'],
  'system variables': ['/docs/projects/variables/system-variables'],
  secret: ['/docs/projects/variables/sensitive-variables'],
  'octopus action': ['/docs/projects/variables/system-variables'],
  octopusbypassdeploymentmutex: ['/docs/projects/variables/system-variables'],

  tentacle: ['/docs/infrastructure/deployment-targets/tentacle'],
  tent: ['/docs/infrastructure/deployment-targets/tentacle'],
  tentac: ['/docs/infrastructure/deployment-targets/tentacle'],
  target: ['/docs/infrastructure/deployment-targets'],
  'target tag': ['/docs/infrastructure/deployment-targets/target-tags'],
  agent: [
    '/docs/kubernetes/targets/kubernetes-agent',
    '/docs/octopus-cloud/connection-agent',
  ],
  'connection agent': ['/docs/octopus-cloud/connection-agent'],
  'dynamic worker': ['/docs/infrastructure/workers/dynamic-worker-pools'],
  environments: ['/docs/infrastructure/environments'],
  envi: ['/docs/infrastructure/environments'],
  accounts: ['/docs/infrastructure/accounts'],
  account: ['/docs/infrastructure/accounts'],

  api: ['/docs/octopus-rest-api'],
  'rest api': ['/docs/octopus-rest-api'],
  cli: ['/docs/octopus-rest-api/cli'],
  runbook: ['/docs/runbooks'],
  'platform hub': ['/docs/platform-hub'],
  'feature flags': ['/docs/feature-flags'],
  artifacts: ['/docs/projects/deployment-process/artifacts'],
  channel: ['/docs/releases/channels'],
  tenant: ['/docs/tenants'],
  tenants: ['/docs/tenants'],
  terraform: ['/docs/deployments/terraform'],
  package: ['/docs/deployments/packages'],
  docker: ['/docs/deployments/docker'],
  database: ['/docs/deployments/databases'],
  upgrade: ['/docs/administration/upgrading'],
  audit: ['/docs/security/users-and-teams/auditing'],
  dashboard: ['/docs/projects/project-dashboard'],

  feed: [
    '/docs/packaging-applications/package-repositories',
    '/docs/projects/project-triggers/external-feed-triggers',
  ],
  'external feed': [
    '/docs/projects/project-triggers/external-feed-triggers',
    '/docs/packaging-applications/package-repositories',
  ],
  'external feeds': [
    '/docs/projects/project-triggers/external-feed-triggers',
    '/docs/packaging-applications/package-repositories',
  ],
  exter: [
    '/docs/projects/project-triggers/external-feed-triggers',
    '/docs/packaging-applications/package-repositories',
  ],
  'build information': [
    '/docs/packaging-applications/build-servers/build-information',
  ],
  github: [
    '/docs/projects/version-control/github',
    '/docs/packaging-applications/build-servers/github-actions',
  ],

  'single sign on': ['/docs/security/authentication'],
  permiss: [
    '/docs/security/users-and-teams/default-permissions',
    '/docs/security/users-and-teams',
  ],
  license: ['/docs/octopus-rest-api/octopus.server.exe-command-line/license'],

  'config as code': ['/docs/projects/version-control'],
  config: ['/docs/projects/version-control'],
  ocl: ['/docs/projects/version-control/ocl-file-format'],
  commit: ['/docs/deployments/git/commit-to-git'],
  clone: ['/docs/octopus-rest-api/cli/octopus-project-clone'],
  'disable project': ['/docs/octopus-rest-api/cli/octopus-project-disable'],
  powershell: ['/docs/deployments/custom-scripts'],

  'cloud migra': ['/docs/administration/private-cloud-migration'],
  'cloud migration': ['/docs/administration/private-cloud-migration'],
  'azure private': [
    '/docs/octopus-cloud/inbound-private-links',
    '/docs/octopus-cloud/outbound-private-links',
  ],
  azure: ['/docs/deployments/azure', '/docs/infrastructure/accounts/azure'],
};

// Recorded but never scored. A single keystroke has no target, and neither does
// a keyboard mash or an unfinished thought. Their zero-result behaviour still
// matters, which is why they stay in the set rather than being filtered out.
const UNSCORED = new Set([
  'sssieddqxsx',
  'octopus',
  'octo',
  'oc',
  'how to',
  'version',
  'test',
  'automate',
  'can',
  'cancel',
  'creating a',
  'error',
  'como eliminar',
  'como eliminar clientes',
  'co',
  'con',
  'li',
  'po',
  'te',
  'va',
  'aut',
  'cl',
  'de',
  'ext',
]);

const raw = await readFile(CSV, 'utf8');
const merged = new Map();

for (const line of raw.split(/\r?\n/)) {
  const cells = line.split(',');
  const term = (cells[1] ?? '').trim();
  const visitors = Number((cells[2] ?? '').replace(/[^0-9.]/g, ''));

  if (!term || term === 'search' || term === '(none)') continue;
  if (!Number.isFinite(visitors) || visitors === 0) continue;

  // `octopus` and `Octopus` are the same query to every engine here, so their
  // visitors belong together rather than as two thin rows.
  const key = term.toLowerCase();
  merged.set(key, {
    query: key,
    weight: (merged.get(key)?.weight ?? 0) + visitors,
    // A single character is a keystroke, not a query.
    singleChar: key.length === 1,
  });
}

const queries = [...merged.values()]
  .sort((a, b) => b.weight - a.weight)
  .map((entry, index) => ({
    id: `r${String(index + 1).padStart(2, '0')}`,
    bucket: entry.singleChar
      ? 'first-keystroke'
      : EXPECTED[entry.query]
        ? 'real'
        : 'real-unscored',
    weight: entry.weight,
    query: entry.query,
    expect: EXPECTED[entry.query] ?? [],
  }));

const scored = queries.filter((q) => q.expect.length > 0);
const totalWeight = queries.reduce((sum, q) => sum + q.weight, 0);
const scoredWeight = scored.reduce((sum, q) => sum + q.weight, 0);

await writeFile(
  OUT,
  JSON.stringify(
    {
      note: 'Real search terms from the Plausible `search` property, 2026-07-28. The query strings are real; the expected pages are inferred, because the analytics records what was typed and never whether the reader found it. Regenerate with derive-real-searches.mjs.',
      source: '2026-07-28-Docs snapshot - Top searches.csv',
      caveat:
        '`(none)` was 12.7k of 12.7k visitors, so search is used by a small single-digit share of sessions and every ratio here sits on a small base. Most terms are partial words, because the property is captured per keystroke.',
      totals: {
        terms: queries.length,
        scored: scored.length,
        totalWeight,
        scoredWeight,
      },
      queries,
    },
    null,
    2
  )
);

console.log(`terms: ${queries.length} (${scored.length} scored)`);
console.log(`visitors: ${totalWeight} total, ${scoredWeight} on scored terms`);
console.log(`\nbuckets:`);
for (const bucket of ['real', 'real-unscored', 'first-keystroke']) {
  const rows = queries.filter((q) => q.bucket === bucket);
  console.log(
    `  ${bucket.padEnd(16)} ${String(rows.length).padStart(3)} terms, ${rows.reduce((s, q) => s + q.weight, 0)} visitors`
  );
}
console.log(`\ntop 15 scored:`);
for (const q of scored.slice(0, 15)) {
  console.log(
    `  ${String(q.weight).padStart(3)}  "${q.query}" -> ${q.expect[0]}`
  );
}

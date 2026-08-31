# Integrations consolidation

Bringing `OctopusDeploy/integrations` into the docs site as a top-level area,
the way `/docs/api` and `/docs/cli` already work.

Status: **not started.** This is a research and planning document.
Written 2026-09-01, against `main` at `93a6b1fb7` (the CLI area move, #3431).

---

## Start here

Copy the CLI area. It is the same problem, it landed on `main` on 2026-09-01
(#3431), and that commit already generalized the machinery to take a fourth
area.

Read these three files first, in this order:

1. `src/lib/areas.ts` — the area registry. Its header comment carries the
   canonical four-step checklist for adding one.
2. `src/lib/areaMenu.ts` — builds either nav tree. Was `apiNavigation.ts` until
   #3431 generalized it.
3. `src/lib/generatedPaths.ts` — `GENERATED_AREAS` is a one-line list. Was
   `generatedApiPaths.ts` until #3431.

Then read the CLI move commit itself: `git show 93a6b1fb7`. 485 files, and it
is the closest thing to a worked example that exists.

---

## What the integrations site actually is

810 pages, every one machine-generated. Nothing under `src/pages/integrations/`
in that repo is hand-written.

### The generator

`MarkdownGenerator/app.js` — plain Node, no build step. Run with
`pnpm generate`. It pulls from two sources:

| Source | Provides |
| --- | --- |
| `deploy.octopus.app/api/actiontemplates/documentation` | Built-in steps: `ActionType`, `Name`, `Summary`, `Categories`, `Properties` (the parameter reference), `Features` (by ID), `OclExample` |
| `library.octopus.com/api/step-templates` | Community step templates, including script body and parameters |

Both are public HTTP endpoints. The documentation endpoint is anonymous on a
default install — `OCTOPUS_API_KEY` is only needed for an instance that
requires auth. This matters for where the generator ends up living; see
[Decision 2](#decision-2-where-the-generator-lives).

The response has two top-level arrays. `Steps` is one entry per built-in step.
`Features` is a shared catalogue, so each feature is defined once and steps
reference it by ID.

Useful env vars, all already supported:

- `OUTPUT_DIR` — output folder, defaults to `../src/pages/integrations`
- `OCTOPUS_DOC_URL` — override the documentation endpoint
- `OCTOPUS_API_KEY` — only for an authenticated instance

It runs weekly on cron (`.github/workflows/weekly-generate.yml`, Sunday 00:00
UTC) and opens a PR via `peter-evans/create-pull-request`.

### The page counts

| Page type | Count |
| --- | --- |
| Home | 1 |
| Category index (`{vendor}/index.mdx`) | 143 |
| Step detail | ~666 |
| **Total under `src/pages/`** | **810** |

Plus 190 logo SVGs in `public/integrations/logos/`.

---

## The three page templates

### 1. `home.js` → `/integrations`

Featured tiles (6, hardcoded in `featuredIntegrations`) then every category
tile, A–Z. Both are `IconTile` grids — `.simple-grid` and `.simple-grid-3`.

The featured list is hand-maintained in the generator:
Kubernetes, GitHub, AWS, Azure, Google Cloud, Slack.

### 2. `index.js` → `/integrations/{vendor}`

Two `IconTile` grids under `## Built-in steps` and `## Community steps`. The
split is by author — `Octopus Deploy` means built-in. Each tile is an
`<li class="built-in-step">` or `<li class="community-step">`.

Emits `layout: src/layouts/Default.astro`, `navMenu: true`, `navOrder: 1`.

### 3. `detail.js` → `/integrations/{vendor}/{step}`

Two variants, decided by whether `StepProperties` is set.

**Built-in steps:**

- Tagline — `{ActionType} exported {date} by {author} belongs to '{category}' category.`
- Description
- `## Parameters` — one `<div class="param">` per property, with label, key,
  required flag, description, allowed values, default, example
- `## Optional features` — from the shared catalogue, with their own parameters
- `## Step configuration using OCL` — fenced `hcl` block

**Community steps:**

- Tagline and description
- `## Parameters` — same `<div class="param">` shape, from `Parameters`
- `## Script body` — fenced block in the template's own syntax
- Apache 2.0 license line and a "Report an issue" link into `OctopusDeploy/Library`
- `<div class="get-json">` — the entire step template as JSON, for paste into
  **Library → Step templates → Import**
- A "History" link

---

## The clickable buttons

They are `src/components/IconTile.astro`. The whole tile is one anchor:

```html
<a href={link} class="icon-tile" role="link" aria-label={`Open ${title}`}>
```

The interesting part is the SVG handling. It reads the vendor logo off disk at
build time and inlines it, rewriting every `class` and `id` with a per-logo
prefix derived from the filename. That namespacing exists because the home page
inlines ~143 SVGs into one document, and without it their internal classes
(`.st0`, `.st1`, gradient IDs) collide.

Falls back to an `<img>` with an `onerror` pointing at
`/integrations/logos/fallback.svg` when the source is not an SVG.

**The docs site already has a near-twin:** `src/components/Card.astro`. Same
link-wrapping, same `aria-label={`Open ${title}`}`, icon + title + description,
plus a `variant="featured"` and a `themed`/`branded` icon mode. Two gaps:

1. `Card` takes an imported asset from `src/assets/icons` (a `.src` URL), where
   `IconTile` takes a public path and reads the file.
2. `Card` does no inlining and therefore no namespacing.

See [Decision 3](#decision-3-icontile-or-card).

---

## Where the two sites already agree

This is why the whole thing is tractable. They are close cousins:

- Astro 7
- `astro-accelerator-utils`
- The `src/themes/octopus` theme
- The same `Default.astro`, `Redirect.astro`, `Search.astro` layout set
- cspell, linkinator, prettier, Playwright
- `microsite-deployment` for release
- Both use `remark-directive` for `:span[]{.class}` style markup

---

## What has to be ported, replaced, or dropped

| Thing | Integrations has | Docs has | Action |
| --- | --- | --- | --- |
| Nav | Hand-written `src/data/navigation.ts`, 6 curated sections | Frontmatter-driven, plus `areaMenu.ts` per area | Port the curated sections |
| Search | `search.json.ts`, `stemmer.js`, `synonyms.js`, `search-dialog.js` | Pagefind | Drop theirs, free pickup |
| CSS | `public/integrations/css/*` plus a full FontAwesome bundle | Design-system tokens | Port 5 classes, drop the rest |
| Chrome | `Header.astro`, `sharedNavbarFooter.ts`, `snapshot-shared.mjs` | `TopNav.astro`, `Footer.astro` | Drop theirs |
| Logos | 190 SVGs in `public/integrations/logos/` | — | Move into the docs public tree |
| Dictionary | Own `dictionary-octopus.txt` (1108 bytes) | Own, much larger | Merge |

The five CSS classes worth porting: `.icon-tile` (and its `__icon-wrapper`,
`__icon`, `__content`, `__title`, `__description` children), `.simple-grid`,
`.simple-grid-3`, `.param`, `.get-json`.

### The nav problem

`src/data/navigation.ts` in the integrations repo curates 6 sections covering
roughly 12 of the 143 categories:

1. Development and Scripting — Script, Package
2. Containers and orchestration — Kubernetes, Docker, Argo
3. Infrastructure as Code — Terraform
4. Cloud Native services — AWS, Azure, Google Cloud
5. Source Control and CI tools — Azure DevOps, GitHub

143 categories in one flat left nav is unusable, so this curation has to
survive the move. The home page stays the full A–Z.

---

## The plan

Rough sizing assumes one person who has read the CLI move.

### 1. Add the area — ~half a day

The four-step checklist lives in the header comment of `src/lib/areas.ts` and
that comment is the only copy of it. All four are required; missing the fourth
still builds green while authors silently cannot pick the area in Front Matter
CMS.

1. `integrations` in the `Area` union, and an entry in `AREAS` with
   `path: '/integrations'`
2. An `IntegrationsNavigation.astro` component
3. A line for it in `src/components/AreaNavigation.astro`
4. `integrations` in the `area` field's `choices` in `frontmatter.json`
   (currently `["docs", "api", "cli"]`, around line 79)

Decide `sectionCrumb` at the same time. The area gets a landing page, so the
generic breadcrumb walk finds the section and `sectionCrumb` stays `null` —
same as api and cli. Give the landing page a `crumbTitle` so the crumb reads
"Integrations" rather than the page title.

### 2. Add the generated route — ~half a day

1. Copy `src/pages/docs/cli/[...generatedFileName].astro` to
   `src/pages/docs/integrations/[...generatedFileName].astro`, changing the
   root path. It already globs `{md,mdx}` and already handles nesting.
2. Add `'integrations'` to `GENERATED_AREAS` in `src/lib/generatedPaths.ts`.
   That one line teaches the nav, sitemap, llms.txt endpoints and markdown
   copies about the new `_generated` folder.

**Watch for — this is the one piece with no precedent.** Both existing
`_generated` folders are flat: `api/_generated` is 106 files, `cli/_generated`
is 185 files, neither has a subdirectory and neither has an `index` page.
Integrations is two levels deep and every category is an `index.mdx`.

Two consequences the copied route does not handle:

- The rest param turns `aws/index.mdx` into `aws/index`, serving at
  `/docs/integrations/aws/index`. It needs an `/index$` strip to land on
  `/docs/integrations/aws`.
- `areaMenu.ts` builds its tree from url segments. Confirm it groups a nested
  generated page under its folder rather than flattening it. The CLI tree fakes
  hierarchy from command names, so it has never been fed a real nested path.

Budget an extra half day here and verify with a spike of ~5 pages before
generating all 810.

### 3. Move the generator — ~1–2 days

See [Decision 2](#decision-2-where-the-generator-lives) for the reasoning.

1. `MarkdownGenerator/` becomes `tools/integrations-generator/` in this repo.
2. Resolve its dependency tree — either fold into the root `package.json` or
   set up a pnpm workspace. It pulls `astro-accelerator-utils` for markdown
   text extraction, which docs already has.
3. A weekly workflow here runs it with
   `OUTPUT_DIR=src/pages/docs/integrations/_generated` and opens a PR on an
   `integrations-docs-sync` branch.
4. Add a third job to `.github/workflows/auto-approve-docs-sync.yml`, same
   shape as the api and cli jobs but without a cross-repo bot token — the PR
   now comes from this repo's own `GITHUB_TOKEN`.

**Generator changes needed:**

- Link prefix in `index.js` and `home.js`: `/integrations/` → `/docs/integrations/`
- Emitted `layout:` frontmatter → whichever layout step 4 settles on
- Add `area: integrations` if the path alone is not enough (it should be)
- Drop the CRLF line-ending forcing (`ensureWindowsLineEndings`) unless docs
  wants it; check `.gitattributes` in both repos before deciding

### 4. Port the presentation — ~2–3 days

1. Move the 190 logo SVGs into the docs public tree; update the path
   `IconTile` reads from.
2. Resolve [Decision 3](#decision-3-icontile-or-card).
3. Port the five CSS classes onto design-system tokens.
4. Add an `Integrations.astro` layout, modelled on `Cli.astro`. **Leave out
   Edit on GitHub** — `Cli.astro` gives the reason in a comment: the generator
   writes these pages, and the next sync overwrites whatever the button opens.

### 5. Build the nav — ~a day

Port the 6 curated sections from the integrations `navigation.ts` as the source
for `IntegrationsNavigation.astro`. Model the component on
`src/components/CliNavigation.astro`.

**Total: roughly 1.5–2 weeks**, plus whatever Decision 1 costs.

---

## Decisions

### Decision 1: URLs

**This is the one that blocks starting.** Today `octopus.com/integrations` is a
separate microsite behind an edge route.

**Option A — keep `/integrations/*`.**
Docs has `subfolder: '/docs'` in `src/config.ts`, and breadcrumbs, nav, sitemap
and search all read from it. Serving a second top-level path means an infra
change in `microsite-deployment` plus unpicking that assumption throughout.
Best for SEO, most work.

**Option B — move to `/docs/integrations/*` and redirect. (recommended)**
The docs repo already carries 1459 `Redirect.astro` stubs. More usefully, the
CLI move settled on one redirect at each moved folder root instead of one per
page (commit `3d9a18e3d`, "Keep a redirect at the root of each moved folder,
not on every page"). That makes this ~144 stubs rather than 810. The
`/integrations` edge route then becomes a redirect, and the integrations
microsite deployment is reduced to serving it.

Recommendation: **B**, matching what the CLI move just did. The cost is SEO
spent on 301s.

### Decision 2: Where the generator lives

**Recommendation: move it into the docs repo.**

The api and cli precedent does not transfer, and it is worth being explicit
about why. Their generators live outside **because they have to**. `gen-docs`
walks the CLI's own command tree; the API generator reads Server's route
definitions. Those can only run where that source code is, so they push in over
a bot PR on a sync branch (`api-docs-sync` from `team-backend-foundations-bot`,
`cli-docs-sync` from `team-miscellaneous-branch-protections`).

The integrations generator has no such tie. It reads two public HTTP endpoints
and needs no repo checkout to do it. Any machine with network access can run
it.

So if the site moves to docs and the generator stays behind, the integrations
repo exists to run one Node script on a cron. That keeps a repo, its CI, its
Renovate config, its dependency tree and its Octopus deployment project alive
for `node app.js` once a week.

**Be straight about the trade-off in the PR:** this makes integrations the
first area whose generator lives in-repo. Name that explicitly so nobody reads
it as inconsistency with api and cli.

Afterwards, archive `OctopusDeploy/integrations` read-only for history.

### Decision 3: `IconTile` or `Card`

**Option A — lift `IconTile.astro` across intact.** Fast. Brings its own CSS.
Leaves the docs site with two components doing one job.

**Option B — fold the behaviour into `Card.astro`.** One component. Requires
adding build-time SVG inlining and the per-logo ID namespacing to `Card`, and
the namespacing genuinely matters at 143 SVGs on the home page.

No strong recommendation. A reasonable middle path: ship A to get the move
done, then merge into `Card` as follow-up work once the page set is stable.

---

## Risks worth measuring before committing

1. **Build time.** The full docs build is already around 4 minutes. This adds
   810 pages, of which the home page inlines ~143 SVGs and each of 143 category
   pages inlines its own. Measure before and after on a spike branch.
2. **Spellcheck.** `pnpm spellcheck` runs cspell over files changed against
   `main`. A weekly 810-file sync PR would spellcheck all of it, including
   generated script bodies full of vendor names and shell syntax. Exclude
   `_generated` or merge the two `dictionary-octopus.txt` files, or both.
3. **Link checking.** `pnpm crawl` runs linkinator over `dist`. 810 more pages,
   many with outbound vendor links, will slow it and will surface dead
   third-party links the integrations repo was already tolerating.

---

## Reference: files that matter

### In this repo (docs)

| Path | Why |
| --- | --- |
| `src/lib/areas.ts` | Area registry, and the four-step checklist |
| `src/lib/areaMenu.ts` | Builds an area's nav tree |
| `src/lib/generatedPaths.ts` | `GENERATED_AREAS` list |
| `src/components/AreaNavigation.astro` | Picks the nav by area |
| `src/components/CliNavigation.astro` | Model for the new nav component |
| `src/components/Card.astro` | The `IconTile` near-twin |
| `src/layouts/Cli.astro` | Model for the new layout; explains the missing Edit on GitHub |
| `src/pages/docs/cli/[...generatedFileName].astro` | Model for the generated route |
| `frontmatter.json` | `area` choices, around line 79 |
| `.github/workflows/auto-approve-docs-sync.yml` | Sync PR auto-approval |
| `src/config.ts` | `SITE.subfolder = '/docs'` — the Decision 1 constraint |

### In `OctopusDeploy/integrations`

| Path | Why |
| --- | --- |
| `MarkdownGenerator/app.js` | Entry point, source endpoints, category logic |
| `MarkdownGenerator/home.js` | Home page template, featured list |
| `MarkdownGenerator/index.js` | Category index template |
| `MarkdownGenerator/detail.js` | Step detail template, both variants |
| `MarkdownGenerator/README.md` | The pipeline explained by whoever built it |
| `src/components/IconTile.astro` | The tiles |
| `src/data/navigation.ts` | The 6 curated nav sections |
| `.github/workflows/weekly-generate.yml` | The cron |
| `public/integrations/logos/` | 190 SVGs |

---

## Open questions

- Nested generated paths and `index` pages are both unprecedented here (step
  2). Spike them before committing to the sizing above.
- Who owns the integrations content editorially after the move? The generator
  reproduces every page from the endpoints, so editorial control lives in
  Server and in `OctopusDeploy/Library`, not here.
- Does `/integrations` carry enough SEO weight that Decision 1 Option A is
  worth the infra work? Ask marketing before assuming B.
- The featured-integrations list is hardcoded in `home.js`. Should it move to
  a data file someone without a JS background can edit?

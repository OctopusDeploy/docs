# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the [Octopus Deploy documentation site](https://octopus.com/docs), built with [Astro](https://astro.build/). All content lives under `src/pages/docs/` and mirrors the URL structure of the live site exactly.

## Common commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Run dev server at localhost:3000 (also processes images + watches files)
pnpm build          # Build static output to ./dist
pnpm preview        # Serve the built ./dist folder
pnpm test           # Build + run Playwright tests (redirect checks and bookmark checks)
pnpm spellcheck     # Spell-check only files changed vs origin/main
pnpm spellcheck-all # Spell-check all .md/.mdx files
pnpm format         # Format all source files with Prettier
```

`pnpm dev` runs four scripts in parallel: image processing (`dev:img`), dictionary sorting, the Astro dev server, and a file watcher that auto-formats on save.

The full CI pipeline also runs `pnpm crawl` (link checking) and `pnpm thin` (static asset cleanup) after the build.

## Running a single Playwright test

```bash
# Run a specific test file
npx playwright test tests/redirect.spec.ts

# Run a specific test by name (substring match)
npx playwright test --grep "Check redirects"
```

Tests require the site to already be built (`pnpm build`). The Playwright config starts `npm run preview` as the web server automatically.

## Image processing

Before building, run `pnpm dev:img` to generate responsive WebP variants of images in `public/docs/img/` → `public/docs/i/{small,medium,large}/`. This step must complete before `astro build` for images to resolve correctly. The `pnpm dev` command handles this automatically.

Image sizes: small=600px, medium=1000px, large=2000px.

## Content architecture

### URL → file mapping

The URL path after `/docs/` maps directly to `src/pages/docs/`. For example:

- `octopus.com/docs/infrastructure/deployment-targets/tentacle` →
  `src/pages/docs/infrastructure/deployment-targets/tentacle/index.md(x)` or
  `src/pages/docs/infrastructure/deployment-targets/tentacle.md`

### Frontmatter fields

Every page requires these frontmatter fields:

```yaml
---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-24
title: Page Title
navTitle: Short Nav Title      # optional, shorter version for sidebar
navSection: Section Name       # groups pages in the sidebar
navOrder: 10                   # controls ordering within a section
description: SEO description
icon: fa-solid fa-cloud        # Font Awesome class; add if missing
---
```

The navigation is auto-generated from frontmatter (`navTitle`, `navSection`, `navOrder`).

### Redirects

Never delete pages. Instead, replace the content with a redirect stub:

```yaml
---
layout: src/layouts/Redirect.astro
title: Redirect
redirect: https://octopus.com/docs/new-path/to/page
pubDate: 2023-01-01
navSearch: false
navSitemap: false
navMenu: false
---
```

### Shared/include content

Reusable content lives in `src/shared-content/`. To use it, rename the consuming file from `.md` to `.mdx`, then:

```mdx
import MyInclude from 'src/shared-content/path/to/file.include.md'

<MyInclude />
```

### MDX gotchas

- Custom heading IDs (`## Heading {#my-id}`) must be escaped in MDX: `## Heading \{#my-id}`
- Short-form links (`<https://example.com>`) don't work in MDX; use `[text](url)` instead.

### Markdown directives (remark-directive)

Custom containers are available via `:::` syntax:

```markdown
:::div{.hint}
Hint content here.
:::

:::figure
![Alt text](/docs/img/example.png){ height="400" width="600" }
:::
```

Available callout classes: `hint`, `info`, `success`, `warning`, `problem`.

Tables are automatically wrapped in `<div class="table-wrap">` by the build pipeline.

## Spell-check

The spell checker uses `cspell` with a custom dictionary at `dictionary-octopus.txt`. Add new technical terms there when flagged.

**Flagged words** (must not use): `utilize`, `whilst`, `on-premise`, `whitelist`, `blacklist`, `enable/disable` (prefer `let`/`deactivate`), `within` (use `in`).

## Path aliases (tsconfig)

- `@config` → `src/config.ts`
- `@components` → `src/themes/octopus/components/`
- `@util` → `src/themes/octopus/utilities/`

## Example values (use these in docs)

- Octopus URL: `https://your-octopus-url`
- API key: `API-YOUR-KEY`
- Snapshot name: `Snapshot XXXXX`
- Subscription ID: `g3662re9njtelsyfhm7t`
- Password: `your-secret-password`

Prefer `your-value` over `my-value` throughout.

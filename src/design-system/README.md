# Octopus Design System (portable module)

A self-contained, framework-free design system for Octopus Astro sites. It exists so the
docs site and the other (drifted) microsites can share **one** visual language instead of
each maintaining its own CSS. Everything here is plain Astro + CSS custom properties +
Tailwind v4 utilities - **no React/Vue/Svelte, no client framework runtime** - which keeps
SEO and Core Web Vitals intact on statically generated pages.

> Status: MVP. Proven in this repo on `/docs/ui-mvp`, which is the first consumer of this
> module. Adopt it elsewhere by copying this one folder and wiring two things.

---

## 1. Anatomy

```
src/design-system/
├── README.md            ← this file
├── tokens.css           ← brand + semantic CSS variables (THE customization surface)
├── theme.css            ← Tailwind v4 entry: imports tokens, maps them into the @theme,
│                          tunes the typography plugin. Import this once per page.
├── ui/                  ← universal primitives (any Octopus site: docs, marketing, app)
│   ├── Button.astro
│   ├── Badge.astro
│   ├── Card.astro
│   ├── Callout.astro
│   └── CodeBlock.astro  ← code surface + filename bar + vanilla copy button
└── docs-shell/          ← documentation-site chrome (only docs-style sites need this)
    ├── DocsLayout.astro      ← page shell: <head>, header, sidebar, article, toc, footer
    ├── DocsHeader.astro      ← top bar: real OctopusLogo, search w/ results dropdown,
    │                           theme toggle, trial CTA
    ├── DocsSidebar.astro     ← left section nav
    ├── DocsToc.astro         ← right "on this page" nav w/ scroll-spy
    └── DocsBreadcrumbs.astro ← RDFa BreadcrumbList breadcrumbs
```

**Two tiers, adopt independently:**
- `tokens.css` + `theme.css` + `ui/` - the universal core. Any Octopus Astro site can use it.
- `docs-shell/` - opinionated documentation chrome. Take it for docs sites; skip it for
  marketing/app sites and build their own shells on top of the core.

---

## 2. The single customization surface: `tokens.css`

`tokens.css` is the **only** file a site is expected to edit. It defines two layers:

1. **Brand primitives** - the literal Octopus palette (`--octo-blue`, `--octo-green`, the
   navy scale) and font stacks. These are the brand source of truth, mirrored from
   `public/docs/css/vars.css`.
2. **Semantic tokens** (shadcn shape) - `--background`, `--foreground`, `--primary`,
   `--accent`, `--muted`, `--border`, `--ring`, callout intents, surfaces, elevation, etc.,
   defined for light (`:root`) and dark (`[data-theme='dark']`).

Components and `theme.css` reference **only the semantic tokens**, never raw hex. So:
- Re-skinning a site = edit `tokens.css`, nothing else.
- Because every microsite is the *same* Octopus brand, `tokens.css` ports **1:1 unchanged** -
  that is the whole point: copy it verbatim and every site converges on one look. Only fork
  it if a site genuinely needs to diverge.

Dark mode is driven by the `[data-theme='dark']` attribute on `<html>` (matches the existing
Octopus site switch), not a Tailwind `dark:` class.

---

## 3. Adopting it in another repo

**Prerequisites:** Astro 5+ (built/tested on Astro 6.3) using Vite, and pnpm.

### Step 1 - install dependencies

```bash
pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 @tailwindcss/typography@^0.5
```

### Step 2 - wire the Tailwind v4 Vite plugin

Tailwind v4 is added as a **Vite plugin**, not an Astro integration. In `astro.config.mjs`:

```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ...existing integrations stay as-is...
  vite: {
    plugins: [tailwindcss()],
  },
});
```

This is global to the build, but Tailwind only emits CSS for pages that actually **import
`theme.css`** - so it does not leak onto pages that don't opt in.

### Step 3 - copy the module

Copy `src/design-system/` into the target repo's `src/`. Keep the folder intact so the
relative imports inside it keep working (`theme.css` → `./tokens.css`, `docs-shell` files →
each other).

### Step 4 - satisfy the `docs-shell` external dependencies (docs sites only)

`docs-shell` deliberately reuses two existing shared Octopus assets rather than reinventing
them. If you adopt `docs-shell`, the target repo must provide:

| Dependency | Used by | Path in this repo | Notes |
|---|---|---|---|
| `OctopusLogo.astro` | `DocsHeader.astro` | `public/docs/img/OctopusLogo.astro` | The genuine wordmark+glyph. Import path is `../../../public/docs/img/OctopusLogo.astro` - adjust if your asset lives elsewhere. |
| Shared `Footer.astro` | `DocsLayout.astro` | `src/components/Footer.astro` | Imported as `../../components/Footer.astro`. Swap for the site's own footer if needed. |
| `footer-bundle.css` | `DocsLayout.astro` `<head>` | `public/docs/css/footer-bundle.css` | Linked by absolute URL `/docs/css/footer-bundle.css`. |

The `ui/` core has **no** external dependencies.

### Step 5 - use it

```astro
---
import DocsLayout from '../design-system/docs-shell/DocsLayout.astro';
import Callout from '../design-system/ui/Callout.astro';
import Card from '../design-system/ui/Card.astro';
import Button from '../design-system/ui/Button.astro';
import Badge from '../design-system/ui/Badge.astro';
import CodeBlock from '../design-system/ui/CodeBlock.astro';
---
<DocsLayout title="..." description="..." breadcrumbs={[...]} sidebar={[...]} toc={[...]}>
  <Callout intent="info" title="Note">Body text…</Callout>
  <!-- prose / MDX content -->
</DocsLayout>
```

For a non-docs site, import `theme.css` once in your own layout's frontmatter and use the
`ui/` primitives:

```astro
---
import '../design-system/theme.css';
import Button from '../design-system/ui/Button.astro';
---
```

> Tip: add an alias (e.g. `@ds/*` → `src/design-system/*`) in `tsconfig.json` /
> `astro.config` to avoid `../../` import chains. Optional.

---

## 3a. Finding what's what (developer experience)

With Tailwind the styling lives **on the element, inside the component file** — there is no
semantic stylesheet like the old `main.css` to grep for `.article-nav__title`. The source of
truth is the `.astro` component, not a CSS file. To keep the DOM traceable we tag every
component's root element with a **`data-component="<FileName>"`** attribute.

Workflow to locate and fix anything:
1. Inspect the element in browser devtools.
2. Walk up to the nearest `[data-component="X"]`.
3. Open `src/design-system/**/X.astro` — the Tailwind classes you want to change are right
   there on the element (the component bodies are small and readable).

Example: a sidebar link → nearest `data-component` is `DocsSidebarNav` → edit
`docs-shell/DocsSidebarNav.astro`. The nav region itself is `DocsSidebar` (the `<aside>` in
`DocsContentLayout.astro`).

Convention: PascalCase value == the `.astro` filename. Add `data-component` to the root of any
new component. (This is the same idea as shadcn/ui's `data-slot`; it survives into production
and is greppable.) For finer granularity inside a component, add `data-slot="<part>"`.

Optional dev aid: Astro can emit `data-astro-source-file` / `data-astro-source-loc` (click an
element to open the exact file:line in your editor) — not currently enabled in this repo; can
be turned on for the dev build if wanted.

---

## 4. Guarantees, and how not to break them

These hold by construction; preserve them when extending the system.

- **Zero framework runtime.** Components are `.astro` (compile to static HTML) + Tailwind
  utilities. The only JavaScript is a handful of tiny `is:inline` vanilla scripts. Do **not**
  introduce a UI framework or a client-side component library.
- **SEO surfaces preserved.** `DocsBreadcrumbs` emits an RDFa `BreadcrumbList`; `DocsLayout`
  wraps content in `<article itemscope itemtype="https://schema.org/TechArticle">` with
  `itemprop` headline/description/articleBody; heading hierarchy is semantic. Keep these when
  editing the shell.
- **Core Web Vitals.** No web fonts (system-ui sans + Consolas/monaco mono), no blocking JS,
  no layout-shifting hydration. A FOUC-prevention inline script in `DocsLayout`'s `<head>`
  applies the stored theme before paint.
- **Typography plugin override technique.** The prose/table/code/status rules in `theme.css`
  are intentionally **unlayered** (outside `@layer base`) so they beat `@tailwindcss/typography`'s
  utility-layer defaults. Pages use `class="prose"` (not `prose-slate`). Don't move these into
  a layer or the brand colors will lose to the plugin (and dark-mode body text will go dark).

### Inline-script inventory (all vanilla, all `is:inline`)

| Script | File | Purpose |
|---|---|---|
| FOUC theme apply | `docs-shell/DocsLayout.astro` (head) | Set `data-theme` from `localStorage` before paint |
| Theme toggle | `docs-shell/DocsHeader.astro` | Toggle + persist light/dark |
| Search dropdown | `docs-shell/DocsHeader.astro` | Filtered, keyboard-navigable results list (currently sample data - see gaps) |
| TOC scroll-spy | `docs-shell/DocsToc.astro` | IntersectionObserver active-section highlight |
| Copy button | `ui/CodeBlock.astro` | Delegated copy-to-clipboard with "Copied" state |

---

## 5. Known MVP gaps (intentionally out of scope)

- **Search is demo data.** The dropdown filters ~14 hard-coded sample entries. Wiring the
  real search index (the existing `search.json` / `Search.astro` backend) is a data swap, not
  a structural change.
- **Code blocks: no syntax highlighting.** `CodeBlock` gives the surface + filename bar +
  copy button, but not token highlighting. Add a build-time highlighter (Shiki via
  rehype/remark) if needed. Bare fenced code in MDX gets the styled surface but not the
  filename bar/copy button until a rehype step wraps fenced code in the `CodeBlock` shape.
- **Mobile nav** is a simple `<details>` disclosure (no slide-over/scroll-lock), to honor the
  zero-JS constraint.

---

## 6. Porting checklist

- [ ] `pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 @tailwindcss/typography@^0.5`
- [ ] Add `vite.plugins: [tailwindcss()]` to `astro.config.mjs`
- [ ] Copy `src/design-system/` into the target repo (keep folder structure intact)
- [ ] (docs-shell) Provide `OctopusLogo.astro`, shared `Footer.astro`, `footer-bundle.css`,
      and fix the three relative paths if your layout sits at a different depth
- [ ] Import `theme.css` once per page (directly, or transitively via `DocsLayout`)
- [ ] Confirm dark mode toggles via `[data-theme='dark']`
- [ ] Verify a built page: HTTP 200, no Vite error overlay, RDFa/TechArticle present,
      brand colors render in both themes
- [ ] Decide whether `tokens.css` ports verbatim (recommended for brand unification) or forks

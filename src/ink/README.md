# Ink — Octopus UI design system

A self-contained, framework-free UI design system for every Octopus Astro site. Built so the
docs, blog, marketing pages, and integrations microsites can share **one** visual language,
**one** token contract, and **one** set of primitives — instead of each maintaining its own
CSS and drifting apart. The name is a nod to the octopus's namesake: every Octopus surface
gets *inked* the same way.

Everything here is plain Astro + CSS custom properties + Tailwind v4 utilities — **no React,
Vue, or Svelte; no client framework runtime** — which keeps SEO and Core Web Vitals intact on
statically generated pages.

> **Status:** MVP / preview — not yet production-complete. Proven in this repo on
> `/docs` and `/docs/ui-mvp`. Adopt it elsewhere by copying this one folder and wiring two
> things (see [§3 Adoption](#3-adopting-ink-in-another-repo)).

---

## 1. Anatomy

```text
src/ink/
├── README.md            ← this file
├── tokens.css           ← brand + semantic CSS variables (THE customization surface)
├── theme.css            ← Tailwind v4 entry: imports tokens, maps them into the @theme,
│                          tunes the typography plugin. Import this once per page.
├── core/                ← universal primitives — any Octopus site (docs, blog, marketing…)
│   ├── Button.astro
│   ├── Badge.astro
│   ├── Card.astro
│   ├── Callout.astro
│   └── CodeBlock.astro
└── shells/              ← per-site outer wrappers (the page-level chrome)
    └── docs/            ← documentation-site shell (one of several planned)
        ├── Layout.astro          ← page shell with hand-rolled <head> (MVP entry point)
        ├── ContentLayout.astro   ← markdown-content layout: real nav, breadcrumbs, SEO head
        ├── Header.astro          ← top bar: OctopusLogo, real search, theme toggle, CTA
        ├── Sidebar.astro         ← left section nav (mobile menu)
        ├── SidebarNav.astro      ← recursive nav-tree renderer (lightweight collapsed style)
        ├── SidebarBehavior.astro ← tiny inline script for sidebar interactions
        ├── Toc.astro             ← right "on this page" column w/ scroll-spy
        ├── Breadcrumbs.astro     ← RDFa BreadcrumbList breadcrumbs
        └── Head.astro            ← SEO head (HtmlHead minus main.css, for clean styling)
```

**Two layers, adopt independently:**

- **`core/`** — universal primitives, no site bias. Any Octopus Astro site can use them.
- **`shells/<site>/`** — opinionated outer wrappers for a specific site type. Take a shell as-is
  for that kind of site, or build a new one (`shells/blog/`, `shells/marketing/`, …) on top of
  `core/` when the time comes.

Future shells (not yet built) might be `shells/blog/`, `shells/marketing/`, `shells/integrations/`.
The folder structure already accommodates them; each new shell gets its own components and
imports from `core/`.

---

## 2. The single customization surface: `tokens.css`

`tokens.css` is the **only** file a site is expected to edit. It defines three layers:

1. **Brand primitives** — the literal Octopus palette (`--octo-blue`, `--octo-green`, the navy
   scale) and font stacks (`--font-display` / `--font-sans` / `--font-mono`). The brand source
   of truth, mirrored from `public/docs/css/vars.css`.
2. **Semantic tokens** (shadcn-shape) — `--background`, `--foreground`, `--primary`, `--accent`,
   `--muted`, `--border`, `--ring`, callout intents, surfaces, elevation, etc., defined for
   light (`:root`) and dark (`[data-theme='dark']`).
3. **Bioluminescence layer** (the "Abyssal" look) — decorative palette: cyan → purple → pink
   (`#1FC0FF` / `#6950FF` / `#CC3CFF`). Green is reserved for semantic success only. Glow tokens
   (`--glow-primary`, `--glow-brand`), brand gradients (`--gradient-brand`, `--gradient-ink`),
   atmosphere stops (`--aurora-1..3`, `--grid-line`, `--grain-opacity`), and `--shadow-glow`.
   Dial the whole mood from here: drop the glow alphas and grain to near-zero for a flatter
   skin, or push them up for more drama. No component edits required.

Components and `theme.css` reference **only the semantic tokens**, never raw hex. So:

- Re-skinning a site = edit `tokens.css`, nothing else.
- Because every microsite is the *same* Octopus brand, `tokens.css` ports **1:1 unchanged** —
  that is the whole point: copy it verbatim and every site converges on one look. Only fork it
  if a site genuinely needs to diverge.

Dark mode is driven by the `[data-theme='dark']` attribute on `<html>` (matches the existing
Octopus site switch), not a Tailwind `dark:` class.

---

## 3. Adopting Ink in another repo

**Prerequisites:** Astro 5+ (built and tested on Astro 6.3) using Vite, and pnpm.

### Step 1 — install dependencies

```bash
pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 @tailwindcss/typography@^0.5
```

### Step 2 — wire the Tailwind v4 Vite plugin

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
`theme.css`** — so it does not leak onto pages that don't opt in.

### Step 3 — copy the module

Copy `src/ink/` into the target repo's `src/`. Keep the folder intact so the relative imports
inside it keep working (`theme.css` → `./tokens.css`, shell files → siblings).

### Step 4 — satisfy the `shells/docs` external dependencies (docs-style sites only)

`shells/docs/` deliberately reuses existing shared Octopus assets rather than reinventing them.
A docs-style adopter must provide:

| Dependency | Used by | Path in this repo | Notes |
| --- | --- | --- | --- |
| `OctopusLogo.astro` | `Header.astro` | `public/docs/img/OctopusLogo.astro` | The genuine wordmark + glyph. Import path is `../../../../public/docs/img/OctopusLogo.astro` — adjust if your asset lives elsewhere. |
| `SharedFooter.astro` | `Layout.astro` / `ContentLayout.astro` | `src/components/SharedFooter.astro` | Imported as `../../../components/SharedFooter.astro`. Fetches the shared footer + Marketo form; swap for the site's own footer if needed. |
| Shared asset stylesheets | `Head.astro` (`<head>`) | `${SHARED_ASSETS_BASE_URL}/footer-pu-styles.css` etc. | Read from `SHARED_ASSETS_BASE_URL` / `SHARED_ASSETS_ORIGIN` env vars (set in `.env.production` / `.env.staging`). |

The `core/` layer has **no** external dependencies.

### Step 5 — use it

For a docs-style page:

```astro
---
import Layout from '../ink/shells/docs/Layout.astro';
import Callout from '../ink/core/Callout.astro';
import Card from '../ink/core/Card.astro';
import Button from '../ink/core/Button.astro';
import Badge from '../ink/core/Badge.astro';
import CodeBlock from '../ink/core/CodeBlock.astro';
---
<Layout title="..." description="..." breadcrumbs={[...]} sidebar={[...]} toc={[...]}>
  <Callout intent="info" title="Note">Body text…</Callout>
  <!-- prose / MDX content -->
</Layout>
```

For a non-docs site, import `theme.css` once in your own layout's frontmatter and use the
`core/` primitives:

```astro
---
import '../ink/theme.css';
import Button from '../ink/core/Button.astro';
---
```

> Tip: add an alias (e.g. `@ink/*` → `src/ink/*`) in `tsconfig.json` / `astro.config` to avoid
> `../../` import chains. Optional but recommended once the package is widely consumed.

---

## 3a. Finding what's what (developer experience)

With Tailwind the styling lives **on the element, inside the component file** — there is no
semantic stylesheet like the old `main.css` to grep for `.article-nav__title`. The source of
truth is the `.astro` component, not a CSS file. To keep the DOM traceable we tag every
component's root element with a namespaced **`data-component`** attribute.

### Convention

```text
data-component="ink/<layer>/<ComponentName>"
```

- `<layer>` is `core` for universal primitives or the shell name for shell components
  (currently only `docs`).
- `<ComponentName>` is the PascalCase filename (without `.astro`).

Examples in the wild:

| Element | `data-component` value | File |
| --- | --- | --- |
| A button | `ink/core/Button` | `src/ink/core/Button.astro` |
| A callout | `ink/core/Callout` | `src/ink/core/Callout.astro` |
| Docs sidebar region | `ink/docs/Sidebar` | `src/ink/shells/docs/Sidebar.astro` (rendered by `ContentLayout`) |
| Nav item | `ink/docs/SidebarNav` | `src/ink/shells/docs/SidebarNav.astro` |
| TOC | `ink/docs/Toc` | `src/ink/shells/docs/Toc.astro` |

### Workflow to locate and fix anything

1. Inspect the element in browser devtools.
2. Walk up to the nearest `[data-component="ink/.../X"]`.
3. The path tells you exactly where: `ink/<layer>/<X>` → `src/ink/<layer>/X.astro`
   (with `core/` flat and `shells/<shell>/` for shell components).
4. Open the file — the Tailwind classes you want to change are right there on the element
   (component bodies are small and readable).

### Why namespaced

Once other microsites adopt Ink, multiple sites may render side-by-side or share components;
the `ink/` namespace makes provenance obvious and disambiguates when a future shell
(`ink/blog/Header`) coexists with `ink/docs/Header`. It also survives into production HTML and
is greppable across repos.

For finer granularity inside a component (e.g. distinct slots), add
`data-slot="<part>"` — the same idea shadcn/ui uses for component parts.

Optional dev aid: Astro can emit `data-astro-source-file` / `data-astro-source-loc` (click an
element to open the exact file:line in your editor) — not currently enabled in this repo; can
be turned on for the dev build if wanted.

---

## 4. Guarantees, and how not to break them

These hold by construction; preserve them when extending the system.

- **Zero framework runtime.** Components are `.astro` (compile to static HTML) + Tailwind
  utilities. The only JavaScript is a handful of tiny `is:inline` vanilla scripts. Do **not**
  introduce a UI framework or a client-side component library.
- **SEO surfaces preserved.** `Breadcrumbs` emits an RDFa `BreadcrumbList`; `ContentLayout`
  wraps content in `<article itemscope itemtype="https://schema.org/TechArticle">` with
  `itemprop` headline/description/articleBody; heading hierarchy is semantic; JsonLd survives
  through the reused HtmlHead (via `shells/docs/Head.astro`). Keep these when editing the shell.
- **Core Web Vitals.** No blocking JS, no layout-shifting hydration. A FOUC-prevention inline
  script in `Layout`'s `<head>` applies the stored theme before paint. Three web fonts
  (Bricolage Grotesque / Hanken Grotesk / JetBrains Mono via Bunny Fonts, a privacy-friendly
  Google Fonts mirror) are `preconnect`ed and `display=swap`, and every `--font-*` token keeps
  a system-stack fallback, so first paint uses system fonts with no invisible-text delay. To
  go font-free, point the `--font-*` tokens at system stacks and drop the `<link>`s.
- **In-content images get the "glass" effect.** Images authored inside documentation content
  (`.prose figure` / `.image` / `[data-image]` from `<Image>` and the `:::figure` / `:img`
  directives, plus standalone `img.resp-img`) are wrapped in a frosted panel with a blurred
  cyan/pink bloom behind them — ported 1:1 from the marketing site. **Scoped to `.prose`**, so
  the logo and all UI/chrome imagery are never touched. Tokenized in `tokens.css` (`--glass-*`):
  dark mode uses the marketing values; light mode is retuned for the pale background.
- **Atmosphere is decorative and pointer-transparent.** The fixed `.ds-atmosphere` (aurora mesh
  and engineering grid) and `.ds-grain` overlay sit at `z-index:-1` behind content and are
  GPU-cheap. The page-load `[data-rise]` reveal, the aurora drift, and the status-dot pulse all
  collapse under `prefers-reduced-motion: reduce`.
- **Typography plugin override technique.** The prose/table/code/status rules in `theme.css`
  are intentionally **unlayered** (outside `@layer base`) so they beat `@tailwindcss/typography`'s
  utility-layer defaults. Pages use `class="prose"` (not `prose-slate`). Don't move these into a
  layer or the brand colors will lose to the plugin (and dark-mode body text will go dark).

### Inline-script inventory (all vanilla, all `is:inline`)

| Script | File | Purpose |
| --- | --- | --- |
| FOUC theme apply | `shells/docs/Layout.astro` / `ContentLayout.astro` (head) | Set `data-theme` from `localStorage` before paint |
| Theme toggle | `shells/docs/Header.astro` | Toggle + persist light/dark |
| Search | `shells/docs/Header.astro` renders the real `themes/octopus/components/Search.astro` | The real `search.js` engine (index + scoring + synonyms), re-skinned via `.ds-search` CSS. Not an Ink script. |
| Sidebar behavior | `shells/docs/SidebarBehavior.astro` | Tiny interaction helpers (`navscroll`, viewport-aware behavior) |
| TOC scroll-spy | `shells/docs/Toc.astro` | `IntersectionObserver` active-section highlight |
| Copy button | `core/CodeBlock.astro` | Delegated copy-to-clipboard with "Copied" state |
| Button glow | `core/Button.astro` | Tracks the pointer to set `--hover-x` / `--hover-y` for the cursor-following glow |

---

## 5. Known scope notes

- **Search uses the real engine.** The header renders the existing `Search.astro` + `search.js`
  (full `search.json` index, scoring, synonyms), re-skinned to the Ink UI via `.ds-search` CSS.
  The engine files are unmodified; the layout sets `window.site_url` / `window.site_features`
  (which `search.js` depends on).
- **Code blocks: no syntax highlighting yet.** `CodeBlock` gives the surface + filename bar +
  copy button, but not token highlighting. Adding a build-time highlighter (Shiki via
  rehype/remark) is a planned step. Bare fenced code in MDX gets the styled surface but not the
  filename bar / copy button until a rehype step wraps fenced code in the `CodeBlock` shape.
- **Mobile nav** is a simple `<details>` disclosure (no slide-over / scroll-lock), to honor the
  zero-JS constraint.
- **Other shells (`blog`, `marketing`, `integrations`) don't exist yet.** The `shells/`
  directory is structured to accept them when those microsites adopt Ink.

---

## 6. Porting checklist

- [ ] `pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 @tailwindcss/typography@^0.5`
- [ ] Add `vite.plugins: [tailwindcss()]` to `astro.config.mjs`
- [ ] Copy `src/ink/` into the target repo (keep folder structure intact)
- [ ] (`shells/docs` only) Provide `OctopusLogo.astro`, `SharedFooter.astro`, the shared-asset
      env vars (`SHARED_ASSETS_BASE_URL`, `SHARED_ASSETS_ORIGIN`), and fix the relative paths
      if your layout sits at a different depth
- [ ] Import `theme.css` once per page (directly, or transitively via a `Layout`)
- [ ] Confirm dark mode toggles via `[data-theme='dark']`
- [ ] Verify a built page: HTTP 200, no Vite error overlay, RDFa / TechArticle present, brand
      colors render in both themes
- [ ] Decide whether `tokens.css` ports verbatim (recommended for brand unification) or forks
- [ ] When adding a new shell (`shells/blog/`, etc.), keep components flat-named (`Layout`,
      `Header`, …) and namespace their `data-component` values as `ink/<shell>/<Component>`

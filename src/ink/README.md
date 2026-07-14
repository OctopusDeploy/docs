# Ink - Octopus UI design system

A self-contained, framework-free UI design system for every Octopus Astro site. Built so the
docs, blog, marketing pages, and integrations microsites can share **one** visual language,
**one** token contract, and **one** set of primitives - instead of each maintaining its own
CSS and drifting apart. The name is a nod to the octopus's namesake: every Octopus surface
gets *inked* the same way.

Everything here is plain Astro + CSS custom properties + Tailwind v4 utilities - **no React,
Vue, or Svelte; no client framework runtime** - which keeps SEO and Core Web Vitals intact on
statically generated pages.

> **Status:** MVP / preview - not yet production-complete. Proven in this repo on
> `/docs` and `/docs/ui-mvp`. Adopt it elsewhere by copying this one folder and wiring two
> things (see [§3 Adoption](#3-adopting-ink-in-another-repo)).

---

## 1. Anatomy

The **package is `src/ink/` and contains ONLY portable, host-agnostic code** (zero imports of
host config, data, or components - verified). The page-level *shell* (layouts, header, sidebar,
head, etc.) is inherently site-specific, so it lives in the **host repo**, not the package, and
imports *from* the package.

```text
src/ink/                 ← THE PACKAGE (standalone, portable, zero host imports)
├── README.md            ← this file
├── tokens.css           ← REQUIRED token contract: brand primitives + semantic vars +
│                          interaction/motion recipes (--surface-hover, --focus-ring,
│                          --ease-out, --duration-*) + core-needed decorative (glow-primary,
│                          glass, button palette, icons, fonts). Ports 1:1. THE main
│                          customization surface.
├── tokens.decorative.css ← tunable "abyssal" brand MOOD: aurora, grid, grain, gradients,
│                          glow-brand. Shared brand; dial/swap per shell. theme.css imports it.
├── theme.css            ← Tailwind v4 entry: imports the token files + style layers below,
│                          maps them into the @theme, tunes the typography plugin. Import
│                          this once per page.
├── styles/              ← the package style layers (imported by theme.css, in this order)
│   ├── base.css         ← document defaults (scrollbars, selection) + atmosphere/grain/rise
│   ├── prose.css        ← markdown typography + content constructs (tables, figures, grids)
│   ├── code.css         ← THE one code surface: bare pre / Shiki / CodeBlock (.ink-code)
│   └── components.css   ← core component CSS + enhanced-markup contracts (each recipe
│                          declared ONCE: buttons, callouts, masked icons, tiles, toast, …)
└── core/                ← universal primitives - any Octopus site (docs, blog, marketing…)
    ├── Button.astro     ← .ink-btn variants (primary/secondary/ghost, size md/sm)
    ├── Badge.astro
    ├── Card.astro       ← content image card (thumbnail + title + desc + link; not-prose)
    ├── LinkCard.astro   ← generic titled panel that links out (was the old Card)
    ├── Image.astro      ← <figure> image with optional caption
    ├── Callout.astro    ← .ink-callout; shares its CSS with remark `:::div{.info}` callouts
    ├── CodeBlock.astro  ← .ink-code framed code surface (label bar + copy)
    ├── Icon.astro       ← THE inline-SVG icon registry (24x24 stroke language, currentColor)
    └── behavior/         ← universal client behaviors, bundled by Astro (self-contained TS)
        ├── external-links.ts    ← off-host links → target=_blank rel=noopener (security)
        ├── input-type.ts        ← reflect input modality as a body class (a11y focus)
        ├── heading-anchors.ts   ← permalink <a> on h2-h6[id]; click copies section URL + toast
        ├── tabs.ts              ← <details data-group> → ARIA tablist (content enhancer)
        ├── figures.ts           ← image lightbox (native <dialog>, zoom/pan) for content images
        ├── scroll-shade.ts      ← data-at-top/bottom edge scrims for any [data-scroll-shade]
        └── toast.ts             ← reusable showToast() + copyToClipboard() helpers

src/layouts/ink-docs/     ← THE HOST'S DOCS SHELL (in the repo, NOT the package). Consumes the
                            package (imports `../../ink/core/*` + `../../ink/theme.css`) and wires
                            it to host specifics (@config, nav @data, SharedFooter, HeadMeta, …).
    ├── InkLayout.astro       ← the docs layout: real nav, breadcrumbs, SEO head, article footer
    ├── shell.css             ← docs-shell chrome CSS: sidebar nav, search re-skin, CopyMarkdown,
    │                           article footer, FA content-icon tints (tokens only; host-owned)
    ├── Header.astro          ← top bar: OctopusLogo, real search, theme toggle, CTA
    ├── SidebarNav.astro / SidebarBehavior.astro
    ├── Behavior.astro        ← bundles the package's core/behavior/* into the page (prop-gated)
    ├── SkipLinks.astro · ArticleFooter.astro · Toc.astro · Breadcrumbs.astro
    └── Head.astro            ← docs <head>: web fonts + shared styles (no main.css) + the host's
                                HeadMeta partial (SEO/OG/JsonLd; shared with legacy HtmlHead)
```

**Naming rule (how to read any class in the DOM):** Ink owns exactly one prefix - **`.ink-*`**
(plus the `.simple-grid` / `.status-pill` / `.tab-list` content-authoring classes it styles).
Every other class Ink CSS mentions is a **markup contract it re-skins but must not rename**:
host components (`.site-search*`, `.octo-copy-md*`, `.article-journey*`, `.last-updated`),
content authored in markdown (`.button--primary`, `.hint`/`.info`/…, `.table-wrap`,
`img.resp-img`), and behavior-injected hooks that legacy pages also use (`.bookmark-link`,
`.magnify-*`). CSS custom properties follow the same split: `--ink-*` for Ink-invented ones,
shadcn-shape names (`--background`, `--primary`, …) for the semantic contract.

**Client behavior is bundled, never loaded from `/public`.** `core/behavior/*.ts` are imported
by the host shell's `Behavior.astro` through Astro `<script>` tags, so Astro hashes and ships them
with the page. They depend on nothing outside `src/ink/` - no host `/public` URL, no icon font, no
repo helper - which is what keeps the package installable into any Astro repo.

**The boundary (dependency direction only goes one way):**

- **The package (`src/ink/`)** - portable primitives + tokens + theme. **Never imports host code.**
  Any Octopus Astro site drops it in and uses it.
- **The shell (`src/layouts/ink-docs/`, host-owned)** - opinionated page chrome that imports the
  package AND the host's own config/data/components. A different site type (blog, marketing) builds
  its own shell in its own repo on top of the same package; the shell is not shipped in the package.

---

## 2. The customization surface: `tokens.css` + `tokens.decorative.css`

Tokens live in two files, split by role so a site knows what it must keep vs what it may freely
tune:

**`tokens.css` - the REQUIRED contract** (edit to re-skin; ports 1:1). Two layers:

1. **Brand primitives** - the literal Octopus palette (`--octo-blue`, `--octo-green`, the navy
   scale, plus `--purple-300/400` / `--pink-100`) and font stacks (`--font-display` /
   `--font-sans` / `--font-mono`). The brand source of truth, mirrored from
   `public/docs/css/vars.css`.
2. **Semantic tokens** (shadcn-shape) - `--background`, `--foreground`, `--primary`, `--accent`,
   `--muted`, `--border`, `--ring`, callout intents, surfaces, code, elevation
   (`--shadow-*`, incl. `--shadow-glow` + its `--glow-primary`), the secondary-button palette,
   the masked-SVG `--ink-icon-*` set - everything core components and `theme.css` need. Defined
   for light (`:root`) and dark (`[data-theme='dark']`).
3. **Interaction + motion recipes** - the single source for hover surfaces
   (`--surface-hover`, `--card-hover`, `--border-hover`), the primary wash (`--wash-primary`),
   the small-halo glow (`--glow-dot`), the input focus ring (`--focus-ring`), the system easing
   (`--ease-out`) and the three speeds (`--duration-fast/base/slow`). Derived from the semantic
   tokens with `color-mix`, so they re-theme automatically - never hand-roll a hover tint,
   glow, focus style, or `cubic-bezier` in a component; use these.
   **The canonical focus style is `outline: 2px solid var(--ring); outline-offset: 2px`**
   (utilities: `focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2`);
   `--focus-ring` (box-shadow) is only for text inputs, and the Button/lightbox focus styles are
   the two documented brand/overlay exceptions. The shared micro-label recipe is `.ink-eyebrow`
   (`--text-xs` / bold / 0.06em / uppercase); tile titles use the `text-title` utility
   (`--text-title` = base size, bold). **Two font weights only** - regular (400) and bold (700);
   the `--font-weight-*` namespace is reset so other weight utilities don't compile. Lit 1px
   edges come from `--hairline-primary` / `--hairline-brand` (tokens.decorative.css).

**`tokens.decorative.css` - the tunable brand MOOD** (the "Abyssal" bioluminescence). Cyan →
purple → pink decoration: `--glow-brand`, the `--gradient-brand` accent gradient, the
`--hairline-primary/brand` lit edges, and the atmosphere stops (`--aurora-1..3`, `--grid-line`,
`--grain-opacity`). This is **shared
Octopus brand, not docs-specific** - it ports 1:1 too - but it is isolated so a shell can dial
the whole mood (drop the aurora/grain/glow alphas toward zero for a flatter skin, push them up
for more drama) or swap this one file, **without touching the contract**. `theme.css` imports it
right after `tokens.css`, so any site loading `theme.css` gets the full look by default. Only
these tokens' consumers (the `.ink-atmosphere` / `.ink-grain` decoration and prose accents)
depend on it; core components never reference it directly.

Components and `theme.css` reference **only these tokens**, never raw hex. So:

- Re-skinning a site = edit `tokens.css` (brand/semantic); restyle the mood in
  `tokens.decorative.css`. No component edits.
- Because every microsite is the *same* Octopus brand, both files port **1:1 unchanged** -
  that is the whole point: copy them verbatim and every site converges on one look. Fork only
  if a site genuinely needs to diverge (e.g. a marketing site cranking the mood up, an
  integrations microsite flattening it).

Dark mode is driven by the `[data-theme='dark']` attribute on `<html>` (matches the existing
Octopus site switch), not a Tailwind `dark:` class.

---

## 3. Adopting Ink in another repo

**Prerequisites:** Astro 5+ (built and tested on Astro 6.3) using Vite, and pnpm.

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

### Step 3 - copy the package

Copy `src/ink/` into the target repo's `src/`. Keep the folder intact so the relative imports
inside it keep working (`theme.css` → `./tokens.css` + `./tokens.decorative.css`). The package
has **zero external dependencies** - it never imports host config, data, or components.

### Step 4 - build (or copy) your site shell in the host repo

The page-level *shell* - layouts, header, sidebar, `<head>` - is site-specific and lives in your
**repo**, not the package. It imports the package (`../ink/core/*`, `../ink/theme.css`) and wires
it to your host specifics. In this repo the docs shell is `src/layouts/ink-docs/` - a reference
implementation you can copy and adapt. Its chrome CSS lives in `shell.css` next to it (imported
by the layout, after `theme.css`); a shell you build gets its own equivalent file, written
against the package's tokens only. Its host dependencies (which YOU provide, not the package):

| Dependency | Used by | In this repo | Notes |
| --- | --- | --- | --- |
| Logo | `Header.astro` | `public/docs/img/OctopusLogo.astro` | The wordmark + glyph; swap for your own. |
| Footer | `InkLayout` | `src/components/SharedFooter.astro` | Shared footer + Marketo form; swap for your own. |
| Head meta | `Head.astro` | `src/themes/octopus/components/HeadMeta.astro` | Your SEO/OG/JsonLd/analytics `<head>` meta (here, shared with the legacy `HtmlHead`). Provide your own. |
| Shared asset styles | `Head.astro` | `${SHARED_ASSETS_BASE_URL}/…` | From `SHARED_ASSETS_BASE_URL` / `SHARED_ASSETS_ORIGIN` env vars. |
| Config / nav data | most shell files | `@config`, `@data`, `astro-accelerator-utils` | Your site config + nav tree. |

For a non-docs site, skip the docs shell entirely and build a minimal layout on `core/` (Step 5).

### Step 5 - use it

Point your layout (in the repo) at the package's `core/` primitives:

```astro
---
import '../ink/theme.css';                 // once per page (or via your layout)
import Callout from '../ink/core/Callout.astro';
import Card from '../ink/core/Card.astro';
import Button from '../ink/core/Button.astro';
---
<Callout intent="info" title="Note">Body text…</Callout>
```

For the full docs experience, use your shell layout (e.g. `src/layouts/ink-docs/InkLayout`),
which already composes the header, sidebar, TOC, article footer, and head on top of `core/`.

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

### Step 6 - using Ink components inside MD/MDX content

Some Ink components are **content components** - doc authors drop them straight into a page body
(`<Card>`, `<Image>`, `<Callout>`, …). This requires two things per page:

1. **The file must be `.mdx`, not `.md`** (MDX is what lets a markdown page embed components).
2. **Import the component at the top of the file**, then use it inline:

   ```mdx
   ---
   title: My page
   ---
   import Card from 'src/ink/core/Card.astro';
   import Image from 'src/ink/core/Image.astro';

   <div class="simple-grid">
     <Card title="Kubernetes" description="…" imgSrc="/img/k8s.png" imgAlt="" link="/docs/k8s" />
   </div>
   ```

**⚠️ Adoption gotcha - the import path is the thing you must change.** In THIS repo the content
components live at `src/ink/core/*`, so pages import `from 'src/ink/core/Card.astro'`. When Ink is
installed as a **standalone package** in another repo, that path is wrong - it becomes wherever the
package resolves (e.g. `@ink/core/Card.astro` via the alias in the Tip above, or the published
package specifier). After installing, an adopting agent must:

- Set up the `@ink/*` alias (strongly recommended) so content imports are **install-location
  independent**, then author content as `import Card from '@ink/core/Card.astro';`.
- **Rewrite existing content imports.** Any page importing these components from the old location
  must be repointed to the package path. In this repo that migration was
  `src/components/{Card,Image}.astro` → `src/ink/core/*` (a repo-wide find/replace on the import
  string across `src/pages` + `src/shared-content`). An adopter does the equivalent from *their*
  old path → the Ink package path. Audit BOTH the aliased form and any relative
  (`./`, `../`) imports - a filename-only grep is safest.

Content-facing components today: `Card`, `Image` (docs), plus the `core/` primitives (`Callout`,
`Button`, `Badge`, `CodeBlock`) and `LinkCard`. Non-content chrome (shells, behavior) is wired by
the layout, not imported per page.

---

## 3a. Finding what's what (developer experience)

With Tailwind the styling lives **on the element, inside the component file** - there is no
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
| Docs content region | `ink/docs/InkLayout` | `src/layouts/ink-docs/InkLayout.astro` (`<main>`) |
| Docs sidebar region | `ink/docs/Sidebar` | `src/layouts/ink-docs/InkLayout.astro` (`<aside>`) |
| Nav item | `ink/docs/SidebarNav` | `src/layouts/ink-docs/SidebarNav.astro` |
| TOC | `ink/docs/Toc` | `src/layouts/ink-docs/Toc.astro` |

### Workflow to locate and fix anything

1. Inspect the element in browser devtools.
2. Walk up to the nearest `[data-component="ink/.../X"]`.
3. The path tells you exactly where: `ink/<layer>/<X>` → `src/ink/<layer>/X.astro`
   (with `core/` flat and `shells/<shell>/` for shell components).
4. Open the file - the Tailwind classes you want to change are right there on the element
   (component bodies are small and readable).

### Why namespaced

Once other microsites adopt Ink, multiple sites may render side-by-side or share components;
the `ink/` namespace makes provenance obvious and disambiguates when a future shell
(`ink/blog/Header`) coexists with `ink/docs/Header`. It also survives into production HTML and
is greppable across repos.

For finer granularity inside a component (e.g. distinct slots), add
`data-slot="<part>"` - the same idea shadcn/ui uses for component parts.

Optional dev aid: Astro can emit `data-astro-source-file` / `data-astro-source-loc` (click an
element to open the exact file:line in your editor) - not currently enabled in this repo; can
be turned on for the dev build if wanted.

---

## 4. Guarantees, and how not to break them

These hold by construction; preserve them when extending the system.

- **Zero framework runtime.** Components are `.astro` (compile to static HTML) + Tailwind
  utilities. The only JavaScript is a handful of tiny `is:inline` vanilla scripts. Do **not**
  introduce a UI framework or a client-side component library.
- **SEO surfaces preserved.** `Breadcrumbs` emits an RDFa `BreadcrumbList`; `InkLayout`
  wraps content in `<article itemscope itemtype="https://schema.org/TechArticle">` with
  `itemprop` headline/description/articleBody; heading hierarchy is semantic; JsonLd survives
  through the reused HtmlHead (via `src/layouts/ink-docs/Head.astro`). Keep these when editing the shell.
- **Core Web Vitals.** No blocking JS, no layout-shifting hydration. A FOUC-prevention inline
  script in `Layout`'s `<head>` applies the stored theme before paint. **Zero web-font
  requests**: every `--font-*` token is a system stack (`--font-display` aliases `--font-sans`
  and stays a separate role so a shell can re-point it at a display face). Type sits on the Ink
  scale: sizes in `tokens.css` (`--text-*`), each carrying ONE canonical line box (px-grid copy
  boxes; headings get a constant 0.5rem of leading); the Tailwind `--text-*` namespace is reset
  so off-scale font-size utilities don't compile.
- **In-content images get the "glass" effect.** Images authored inside documentation content
  (`.prose figure` / `.image` / `[data-image]` from `<Image>` and the `:::figure` / `:img`
  directives, plus standalone `img.resp-img`) are wrapped in a frosted panel with a blurred
  cyan/pink bloom behind them - ported 1:1 from the marketing site. **Scoped to `.prose`**, so
  the logo and all UI/chrome imagery are never touched. Tokenized in `tokens.css` (`--glass-*`):
  dark mode uses the marketing values; light mode is retuned for the pale background.
- **Atmosphere is decorative and pointer-transparent.** The fixed `.ink-atmosphere` (aurora mesh
  and engineering grid) and `.ink-grain` overlay sit at `z-index:-1` behind content and are
  GPU-cheap and static (no animation). The page-load `[data-rise]` reveal and the status-dot
  pulse collapse under `prefers-reduced-motion: reduce`.
- **Typography plugin override technique.** The prose/table/code/callout rules in
  `styles/prose.css` / `styles/code.css` / `styles/components.css` (and the shell's `shell.css`)
  are intentionally **unlayered** (outside `@layer base`) so they beat `@tailwindcss/typography`'s
  utility-layer defaults. Pages use `class="prose"` (not `prose-slate`). Don't move these into a
  layer or the brand colors will lose to the plugin (and dark-mode body text will go dark).

### Client-script inventory

Two kinds, both self-contained within `src/ink/`. **`is:inline`** scripts run verbatim (used for
pre-paint/theming and small per-component helpers). **Bundled** scripts are `.ts` under
`core/behavior/`, imported by `Behavior.astro` via a processed `<script>` so Astro hashes and
ships them - the portable way to carry real logic without a `/public` URL.

| Script | Kind | File | Purpose |
| --- | --- | --- | --- |
| FOUC theme apply | inline | `src/layouts/ink-docs/InkLayout.astro` (head) | Set `data-theme` from `localStorage` before paint |
| Theme toggle | inline | `src/layouts/ink-docs/Header.astro` | Toggle + persist light/dark |
| Search | inline | `src/layouts/ink-docs/Header.astro` renders the real `themes/octopus/components/Search.astro` | The real `search.js` engine (index + scoring + synonyms), re-skinned via `.ink-search` CSS. Not an Ink script. |
| Sidebar behavior | inline | `src/layouts/ink-docs/SidebarBehavior.astro` | Truncated-label tooltip + reveal the active nav item on load |
| TOC scroll-spy | inline | `src/layouts/ink-docs/Toc.astro` | `IntersectionObserver` active-section highlight |
| Copy button | inline | `core/CodeBlock.astro` | Delegated copy-to-clipboard with "Copied" state |
| Button glow | inline | `core/Button.astro` | Tracks the pointer to set `--hover-x` / `--hover-y` for the cursor-following glow |
| External-link security | bundled | `core/behavior/external-links.ts` via `Behavior.astro` | Off-host links → `target=_blank rel=noopener` |
| Input modality | bundled | `core/behavior/input-type.ts` via `Behavior.astro` | Reflect keyboard/mouse/touch as a body class |
| Heading anchors | bundled | `core/behavior/heading-anchors.ts` via `Behavior.astro` | Append permalink `<a>` to `h2-h6[id]` (opt-in via prop); click copies the section URL + shows a toast |
| Toast | bundled | `core/behavior/toast.ts` | Reusable `showToast()` (role=status, auto-dismiss) + `copyToClipboard()` with legacy fallback |
| Detail tabs | bundled | `core/behavior/tabs.ts` via `Behavior.astro` | `<details data-group>` → ARIA tablist (no-op without markup) |
| Image lightbox | bundled | `core/behavior/figures.ts` via `Behavior.astro` | Enlarge content images into a native-`<dialog>` lightbox (zoom/pan, focus-trapped); no-op without markup |
| Scroll shades | bundled | `core/behavior/scroll-shade.ts` via `Behavior.astro` | Keep `data-at-top`/`data-at-bottom` current on any `[data-scroll-shade]` container (sidebar nav, search results); no-op without markup |

---

## 5. Known scope notes

- **Search uses the real engine.** The header renders the existing `Search.astro` + `search.js`
  (full `search.json` index, scoring, synonyms), re-skinned to the Ink UI via `.ink-search` CSS.
  The engine files are unmodified; the layout sets `window.site_url` / `window.site_features`
  (which `search.js` depends on).
- **Code blocks: always-dark surface + dual-theme Shiki.** Ink renders code on a dark surface
  (`--code-bg`) in *both* light and dark page themes (a deliberate Stripe/Tailwind-style choice).
  Fenced code is syntax-highlighted by Shiki: the host's `shikiConfig` must emit **dual themes**
  with a `dark` key (e.g. `themes: { light: 'light-plus', dark: 'dark-plus' }`) so Shiki writes a
  per-token `--shiki-dark` CSS var; `styles/code.css` forces `--code-bg` over Shiki's inline background
  and reads `--shiki-dark` for token colors. Without the dual config the tokens fall back to
  `--code-foreground` (readable, but unhighlighted). Bare fenced code gets the styled surface but
  not the `CodeBlock` filename bar / copy button (that needs a rehype wrap step - still planned).
- **Reusable link style: `.ink-link`.** The standard content-link treatment (no underline at
  rest; an underline that draws in from the left on hover) is defined ONCE in `styles/prose.css` and
  shared by every `.prose` link and the `.ink-link` class. Any in-content link *outside* `.prose`
  (e.g. Edit-on-GitHub in the article footer) opts in with `class="ink-link"` instead of
  re-styling - change the treatment in one rule and it updates everywhere.
- **FontAwesome is NOT an Ink dependency.** Ink's own icons are masked inline-SVG tokens
  (`--ink-icon-*`); the package references FA zero times. The Octopus docs *content* embeds FA
  icons (`<i class="fa-solid …">`) and the host loads FA via `HEADER_SCRIPTS` - a host/content
  concern. The docs shell's `shell.css` (host-owned, NOT the package) carries the small color
  utilities (`[class*='fa-'].{blue,green,grey,red}`) that tint those author-embedded icons with
  Ink's adaptive tokens; they're inert if the host doesn't
  load FA. A sibling site that doesn't use FA needs none of this and pays no icon-font cost.
- **Mobile nav** is a simple `<details>` disclosure (no slide-over / scroll-lock), to honor the
  zero-JS constraint.
- **Other shells (`blog`, `marketing`, `integrations`) don't exist yet.** The `shells/`
  directory is structured to accept them when those microsites adopt Ink.

---

## 6. Porting checklist

- [ ] `pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 @tailwindcss/typography@^0.5`
- [ ] Add `vite.plugins: [tailwindcss()]` to `astro.config.mjs`
- [ ] Copy `src/ink/` into the target repo (keep folder structure intact)
- [ ] (`ink-docs` shell only) Provide `OctopusLogo.astro`, `SharedFooter.astro`, the shared-asset
      env vars (`SHARED_ASSETS_BASE_URL`, `SHARED_ASSETS_ORIGIN`), and fix the relative paths
      if your layout sits at a different depth
- [ ] Import `theme.css` once per page (directly, or transitively via a `Layout`)
- [ ] Add an `@ink/*` → package alias, then repoint **content component imports** (`<Card>`,
      `<Image>`, …) to it - pages using them must be `.mdx` and import from the Ink package, not
      the old local path (see Step 6). Grep by filename to catch relative imports too.
- [ ] Confirm dark mode toggles via `[data-theme='dark']`
- [ ] Set `markdown.shikiConfig.themes: { light: 'light-plus', dark: 'dark-plus' }` (a `dark` key
      is required for syntax-highlighted code blocks - see Known scope notes)
- [ ] Verify a built page: HTTP 200, no Vite error overlay, RDFa / TechArticle present, brand
      colors render in both themes
- [ ] Decide whether `tokens.css` ports verbatim (recommended for brand unification) or forks
- [ ] When adding a new shell (`shells/blog/`, etc.), keep components flat-named (`Layout`,
      `Header`, …) and namespace their `data-component` values as `ink/<shell>/<Component>`

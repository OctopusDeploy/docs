# Changes needed on the two spike branches

A handoff list. Everything here was found by auditing both spikes against their
libraries' own documentation and types, and measuring against the deployed
indexes. `AUDIT.md` has the reasoning; this file is just the work.

Ordered by value. Items marked **verified** were tested against the published
index and produced the stated result; items marked **untested** are read from
the library docs and still need confirming.

---

## Read this first: one fix is already pushed

Commit **`e4870cd78`** is already on `willlaugesen/docs-search-orama`, pushed on
2026-08-18. It changes `src/scripts/orama-worker.ts` and
`src/integrations/orama-index.ts`. **It must survive the rebase.**

It makes the worker create its database with the same tokenizer the index was
built with. Without it Orama's recall collapses silently: `variables` matched 5
pages instead of 321 and no typo matched anything. Verified worth 58% → 77%
Success@5.

If the rebase drops it, everything else on this list is measuring the wrong
thing.

---

## Orama — `willlaugesen/docs-search-orama`

### O0. Eight pages are silently missing from the index — **verified, root cause found**

`/docs/kubernetes` and `/docs/infrastructure` are absent from the Orama index
entirely. Not ranked low — not present. They are the 19th and 26th most-visited
pages, 179 and 134 visitors. Six more pages are missing with them:

```
/docs/credits
/docs/deployments/patterns
/docs/getting-started/first-deployment/deploy-a-package
/docs/infrastructure
/docs/kubernetes
/docs/kubernetes/steps/kustomize
/docs/projects/variables/getting-started
/docs/projects/version-control/creating-release-from-a-build-server-plug-in
```

**Every one is `.mdx`, and no `.md` page is affected** — 0 of 792 eligible `.md`
pages are missing against 8 of 458 `.mdx`. That is the tell: only `.mdx` can
carry `import` statements, and each of these eight has an import the markdown
emitter cannot resolve or serialise. Three shapes:

| Shape                                                 | Pages | Example                                                    |
| ----------------------------------------------------- | ----- | ---------------------------------------------------------- |
| Imports an `.astro` component                         | 6     | `import Card from 'src/components/Card.astro'`             |
| Import path is root-absolute                          | 1     | `import Credits from '/docs/credits.md'`                   |
| Import sits after body content rather than at the top | 1     | `creating-release-from-a-build-server-plug-in.mdx` line 17 |

Of the 6 eligible `.mdx` pages that import an `.astro` component, **all 6 are
missing**. Of the 452 that do not, only 2 are — the other two shapes above. It is
a clean predictor.

The fix belongs in `llm-md-emitter.ts`, which is on `main` and also feeds the LLM
markdown endpoints, so it wants care rather than a quick patch. At minimum it
should fail loudly: a page that cannot be emitted currently disappears from
search with nothing logged, and the existing `EXPECTED_PAGES` floor is too coarse
to catch eight pages.

**This is a cost of reusing the emitter as the search corpus, and it is
Orama-specific.** Pagefind indexes the rendered HTML, so it has all eight pages —
`kubernetes` is one of the queries only Pagefind served in the top-pages
experiment. Worth weighing if the emitter turns out to be awkward to fix.

### O1. Disable the sort store — **verified, −2.69MB**

Nothing in `search-engine-orama.ts` ever sorts, but Orama builds and serializes
a sort store for every sortable field. `sort` is a top-level argument to
`create()`.

In **both** `src/integrations/orama-index.ts` and `src/scripts/orama-worker.ts`:

```ts
const db = create({
  schema: SCHEMA,
  sort: { enabled: false },
  components: { tokenizer: TOKENIZER },
});
```

Set it in both, for the same reason the tokenizer has to match in both.

Verified: 11.43MB → 8.74MB, with identical rankings and identical match counts
across the probe queries.

### O2. Trim the stored body text — **verified, a further −2.21MB**

Each document is stored whole, so 2.44MB of page text ships to every visitor
purely so `excerptFrom` can cut a window client-side. The inverted index is a
separate structure, so shortening the _stored_ copy costs no recall at all.

In `src/integrations/orama-index.ts`, after `insertMultiple` and before
`JSON.stringify(save(db))`, shorten the stored body:

```ts
const serialized = save(db) as {
  docs: { docs: Record<string, { body?: string } | undefined> };
};

// The index keeps every term; this is only the copy the excerpt is cut from,
// and the excerpt window is 180 characters.
for (const document of Object.values(serialized.docs.docs)) {
  if (document?.body) document.body = document.body.slice(0, EXCERPT_LIMIT);
}
```

with `EXCERPT_LIMIT = 200`.

Verified: 8.74MB → 6.53MB, again with identical rankings and match counts.

**Together O1 and O2 take the index from 11.43MB to 6.53MB raw, and from 1.32MB
to 0.79MB brotli — which moves Orama from failing the payload gate to passing
it.** They also cut the parse-and-restore cost that caching cannot remove by
43%.

Caveat worth knowing: O2 reaches into the shape `save()` returns. If Orama
changes that shape in a future release this breaks visibly, so it wants a
comment saying so.

### O3. Add a stop-word list — **verified, intent queries 80% → 87%**

Orama's tokenizer takes `stopWords` and defaults it to an empty array, so `how`,
`do`, `the` and 177 others are all live search terms today. The list ships
separately.

```sh
pnpm add @orama/stopwords
```

Then in **both** `orama-index.ts` and `orama-worker.ts`:

```ts
import { stopwords as englishStopwords } from '@orama/stopwords/english';

const TOKENIZER = {
  stemming: true,
  language: 'english',
  stopWords: englishStopwords,
};
```

Verified: 77% → 78% Success@5 overall, and 80% → 87% on the natural-language
`intent` bucket. It should also shrink the index further, which was not measured
because it needs a rebuild.

### O4. Use native facets instead of counting client-side — **untested**

`search-engine-orama.ts` asks the worker for 200 hits and counts sections in the
browser, so every facet count saturates at 200. On a broad query the tab strip
shows "200" where Pagefind shows the real total. Orama has `where` and `facets`
for this; the worker should return counts rather than the engine deriving them.

This is a correctness bug in the tab strip rather than a ranking problem, but it
makes the two engines' counts incomparable.

### O5. Decide what `BODY_LIMIT` should be — **untested**

`orama-index.ts` truncates each page at 4,000 characters before indexing.
Pagefind indexes whole pages. Any query whose answer sits deeper than 4,000
characters into a long page cannot be found on Orama, and that is a difference
in what got indexed rather than in the engines.

Either raise it and accept the index growth, or state it as a deliberate
decision. O1 and O2 buy enough headroom to raise it substantially.

### O6. Excerpt falls back to the wrong field — **untested**

`excerptFrom` in `search-engine-orama.ts` reads `hit.description || hit.body`,
so any page with a subtitle shows its subtitle instead of the text around the
match. Prefer the body window when the query actually matched in the body.

---

## Pagefind — `willlaugesen/docs-search-pagefind`

Pagefind's setup is already close to idiomatic: body scoping, filters and
metadata are right, nav and footer sit outside the indexed article, and its
ranking parameters are already at their best values. Everything below is
additive.

### P1. Use `sub_results` — **verified present on 102 of 102 queries**

Every Pagefind result carries heading-scoped sub-results with `#anchor` links,
and `search-engine-pagefind.ts` discards all of them. Using them lands a reader
on the right section of a long page rather than at the top.

`fragment.sub_results` is an array of `{ title, url, excerpt }` where `url`
carries the anchor. This needs a matching change in the overlay to render nested
rows, so it is the largest piece of work on this list.

This is the one capability Pagefind has that Orama cannot match without
per-heading chunking. It will not move Success@1 or Success@5, because those
score the page.

### P2. Call `preload()` while the reader types — **untested**

Pagefind's keystroke p95 is 1450ms on a throttled connection because every
keystroke fetches the index chunks that query needs. `pagefind.preload(term)`
takes the same arguments as `search()` and fetches the chunks without running
the search.

Call it on each keystroke ahead of the debounced search.

### P3. Warm on page load rather than on overlay open — **untested**

`docs-search.ts` calls `engine.warm?.()` inside `open()`, so nothing loads until
Ctrl+K. For Pagefind that is about 118KB of runtime and WASM, which is cheap
enough to fetch on page load and would take a bite out of its 2239ms cold first
result.

**Do not do this for Orama.** See the note at the bottom.

### P4. Set `excerptLength` — **untested**

Left at the default of 30 words. Worth setting deliberately to match the row
height the overlay design allows.

### P5. Optional: `highlightParam`, and `data-pagefind-weight`

`highlightParam` makes Pagefind append the query to result URLs so the
destination page can highlight it.

`data-pagefind-weight` is a real lever (0 to 10, quadratic, headings default h1
7.0 down to h6 2.0) but the measured ceiling is low: filtering out every
competing API and CLI page entirely only lifts Pagefind to 61% Success@5. Do not
spend much effort here expecting it to close the gap.

---

## Shared — the overlay

### S1. `warm()` timing has to differ per engine

`open()` calling `warm()` is right for one engine and wrong for the other, so
whichever engine wins, this needs a deliberate decision rather than a default:

- **Pagefind**: warm on page load. 118KB, and it shortens the cold path.
- **Orama**: keep it on overlay open. Even after O1 and O2 it is 6.53MB parsed
  and restored on every fresh page load, and warming on page load spends that on
  every visitor including the large majority who never search. Caching does not
  remove it, because the parse happens again on each navigation.

---

## What this does to the comparison

Orama with O1, O2 and the tokenizer fix and stop words applied:

|                        | As deployed | After    |
| ---------------------- | ----------- | -------- |
| Success@5              | 58%         | 78%      |
| Index, raw             | 11.43MB     | 6.53MB   |
| Index, brotli          | 1.32MB      | 0.79MB   |
| Payload gate (≤0.81MB) | FAIL        | **pass** |

Pagefind's relevance does not move much with any of P1 to P5, because its
deficit is intrinsic rather than a configuration mistake.

Neither engine's cold and keystroke timings have been re-measured after these
changes; that needs a deploy.

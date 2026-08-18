# Are the two spikes set up the way their libraries intend?

Written so neither engine gets discounted for a mistake in its own wiring rather
than a limit of the engine. Every claim below is either measured against the
deployed index or read out of the library's own types and documentation, and
each one says which.

Both spikes are on the current release of their library — Pagefind 1.5.2 and
Orama 3.1.18 — so nothing here is a version lag.

**Verdict.** Orama was badly misconfigured and is now close to correct; the
remaining work on it is index size. Pagefind is configured well, and its
relevance deficit turns out to be intrinsic rather than a setup mistake, which
is the finding most likely to decide the bake-off.

## Three hypotheses this audit killed

Worth stating first, because all three were mine and all three were wrong:

1. **Pagefind's `pageLength` explains its ambiguity failure.** Swept 0.75 to
   0.0: Success@5 moves 60% to 57% and the ambiguity bucket does not move at
   all. The default is already its best.
2. **Orama's `threshold` default forces every query term to match.** The types
   say the default is 0, and 0 means "documents containing all the terms".
   Sweeping 0, 0.5 and 1 produced identical scores to three decimal places. It
   has no effect on this corpus.
3. **The REST API examples tree is what beats Pagefind's product pages.**
   Removing that tree from contention entirely, by filtering to `section: docs`,
   lifts Pagefind only to 61% Success@5 and 50% ambiguity. The competing pages
   are a small part of the gap.

## Orama

| #   | Finding                                                               | Severity     | Evidence                                                    |
| --- | --------------------------------------------------------------------- | ------------ | ----------------------------------------------------------- |
| 1   | The worker restored the index without the tokenizer it was built with | **Critical** | Measured: 58% to 77% Success@5. Fixed on the branch         |
| 2   | No stop-word list is configured                                       | High         | Measured: 77% to 78% overall, intent 80% to 87%             |
| 3   | A 2.69MB sort store is built and never used                           | High         | 24% of the index; `sort: { enabled: false }` at create time |
| 4   | Full body text is shipped so the client can cut excerpts              | High         | 2.44MB of the 2.68MB `docs` store                           |
| 5   | Facet counts are computed client side from 200 hits                   | Medium       | Counts saturate at 200; `where` + `facets` are native       |
| 6   | `BODY_LIMIT` truncates every page at 4,000 characters                 | Medium       | Pagefind indexes whole pages; not a like-for-like index     |
| 7   | The index is persisted as JSON rather than a binary format            | Low          | Needs testing, see below                                    |
| 8   | BM25 `b` is untuned                                                   | None         | Measured: `b` 0.3 is worse (75%)                            |

**On stop words.** Orama's tokenizer takes a `stopWords` option and defaults to
an empty list — reading the tokenizer source, `stopWords` starts as `[]` and is
only ever filled from config, so nothing is removed unless you supply a list.
The list lives in a separate package, `@orama/stopwords`, which the spike does
not depend on. Adding the 180-word English list is worth a point overall and
seven points on natural-language queries.

**On the index format.** The spike's comment says
`@orama/plugin-data-persistence` "reaches for Node's filesystem and buffers" and
fails to bundle for a browser worker. The plugin does publish separate `.` and
`./server` entry points, and only the server one is Node-flavoured, so the
browser path may work now even if it did not when the spike was written. Worth
one attempt, though the certain wins are findings 3 and 4: brotli already takes
the JSON from 11.43MB to 1.32MB on the wire, so a binary format mostly buys
parse time rather than bytes.

**Best measured Orama configuration:** tokenizer plus stop words —
Success@1 51%, Success@5 78%, MRR 0.630, zero results 4%.

## Pagefind

| #   | Finding                                            | Severity      | Evidence                                                 |
| --- | -------------------------------------------------- | ------------- | -------------------------------------------------------- |
| 1   | `sub_results` are returned and thrown away         | **High (UX)** | Present on 102 of 102 queries                            |
| 2   | `preload()` is never called                        | Medium        | Documented as the way to warm chunks while typing        |
| 3   | `data-pagefind-weight` is not used anywhere        | Low           | Bounded at +1 point, see below                           |
| 4   | `excerptLength` is left at its default of 30 words | Low           | Not set in `options()`                                   |
| 5   | `highlightParam` is not set                        | Low           | No highlight on the destination page                     |
| 6   | `debouncedSearch()` is not used                    | None          | The overlay debounces at 150ms itself                    |
| 7   | Indexing scope                                     | Correct       | Article-scoped, nav and footer outside it, noise ignored |
| 8   | Ranking parameters                                 | Correct       | Measured: the default is its best                        |

**The important one is what is absent from this table.** Pagefind's setup is
close to idiomatic. Its body scoping is right, its filters and metadata are
right, its ranking parameters are already optimal, and it is on the current
version. The `docs`-only diagnostic puts a ceiling on what content work could
recover: with every competing API and CLI page removed from the index's reach,
Pagefind reaches 61% Success@5 against legacy's 76% and a fixed Orama's 78%.

`data-pagefind-weight` is a real lever — 0 to 10 on a quadratic scale, with
headings already weighted h1 7.0 down to h6 2.0 — but the diagnostic bounds how
much it can buy, and the answer is a few points rather than fifteen.

**Sub-results are the one genuine feature being left on the floor.** Every
result carries heading-scoped matches with `#anchor` links, so Pagefind can land
a reader on the right section of a long page rather than the top of it. Orama
would need per-heading chunking to match that. It will not move Success@1 or
Success@5, because those score the page; it is a real difference in what the
reader experiences.

## Both engines: nothing loads until the overlay opens

`docs-search.ts` calls `engine.warm?.()` inside `open()`, so no index work
starts until someone presses Ctrl+K or clicks the field. Neither spike preloads
on page load.

That is a deliberate trade rather than an oversight, and it is the right default
for exactly one of the two:

- **Pagefind** pays about 118KB for its runtime and WASM. Warming that on page
  load is cheap and would take a visible bite out of its 2239ms cold first
  result. Its own `preload(term)` is designed for the next step — pulling the
  chunks a query will need while the reader is still typing — and is the fix for
  the 1450ms keystroke p95, which is dominated by fetching chunks per keystroke
  on a throttled connection.
- **Orama** pays 11.43MB parsed on every fresh page load. Warming that on page
  load spends it on every visitor, including the large majority who never
  search, and it cannot be cached away because the parse and restore happen
  again on each navigation. Preloading Orama makes the search faster and the
  site slower.

So the answer to "should we preload on page visit" differs by engine, and that
asymmetry is itself an argument: Pagefind's costs are the shape you can hide,
Orama's are not.

## What still needs a rebuild to confirm

Everything above is measured against the published indexes except these, which
change how the index is built:

1. Orama with `sort: { enabled: false }` — expected to remove 2.69MB
2. Orama without stored body text — up to 2.44MB more
3. Orama with `BODY_LIMIT` raised or removed — changes recall on long pages
4. Orama with stop words applied at index time as well as query time
5. Pagefind with `data-pagefind-weight` on the examples tree

Items 1 and 2 are the ones that matter, because payload is the defect the
replacement exists to fix.

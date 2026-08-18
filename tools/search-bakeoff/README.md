# Search bake-off harness

Measures three search engines against the same corpus and the same UI, so the
Pagefind and Orama spikes can be decided on numbers rather than on impressions.

| Target     | Engine                           | Where                                                     |
| ---------- | -------------------------------- | --------------------------------------------------------- |
| `legacy`   | The current `search.json` engine | <https://octopus.com/docs/>                               |
| `pagefind` | Pagefind (PR 3371)               | <https://stoctodocspr3371.z22.web.core.windows.net/docs/> |
| `orama`    | Orama (PR 3372)                  | <https://stoctodocspr3372.z22.web.core.windows.net/docs/> |

All three serve the same `DocsSearch` overlay, because the overlay merged to
main before either spike branched. That is why one adapter drives all three and
why production can be included as the baseline for free: the only thing that
differs between the targets is the engine behind the `SearchEngine` seam.

## Running it

```sh
npx playwright install chromium   # once
pnpm bakeoff                      # verify, payload, relevance, perf, report
```

Or one stage at a time:

```sh
pnpm bakeoff:verify      # checks every expected URL still exists (seconds)
pnpm bakeoff:payload     # index sizes, compressed and not (seconds)
pnpm bakeoff:relevance   # 102 queries x 3 lengths x 3 engines (~25 minutes)
pnpm bakeoff:perf        # throttled cold/warm/keystroke timings (~5 minutes)
pnpm bakeoff:report      # results/report.md and results/report.html
```

`bakeoff:relevance` takes `--target=orama` and `--limit=5` for iterating on the
adapter without waiting for a full run.

Everything lands in `results/`, which is git-ignored apart from the reports you
choose to commit.

## What each stage measures

**payload** — the bytes each engine ships before it can answer anything. The
staging sites are Azure static website endpoints and serve blobs uncompressed,
while production sits behind a CDN that brotlis everything, so each index is
also compressed locally and both numbers are reported. The `parsedBytes` column
is the one caching cannot remove: a cached index still has to be parsed and
restored on every fresh page load.

**relevance** — the query set, run against every engine, at three lengths each.
This is the stage that decides the bake-off.

**perf** — first-result timings on Fast 4G with a 4x CPU penalty, roughly a
mid-range Android on a good connection. Cold (empty cache), warm (index
resident, second query of a visit) and revisit (primed HTTP cache, fresh page)
are reported separately, because the gap between cold and revisit is what
caching buys and the gap between revisit and warm is what it does not.

Keystroke latency is measured by typing a query one character at a time, which
is what the overlay actually receives. The overlay's own 150ms debounce sits
inside every one of those samples, so the raw p95 has a 150ms floor on all three
targets. The gate is set to 250ms for that reason, and the number worth reading
is the gap between targets rather than the absolute value.

## The query set

102 queries in six buckets. Five are curated in `queries/curated.json`; the head
bucket is derived into `queries/head.json`.

| Bucket        | What it is for                                                             |
| ------------- | -------------------------------------------------------------------------- |
| `head`        | Terms the docs are most about. Derived, see below.                         |
| `title`       | Exact page titles. Anything short of rank 1 here is a real failure.        |
| `intent`      | Multi-word natural language, the way people actually type.                 |
| `typo`        | Misspellings and stemming, where Orama's `tolerance` should pay off.       |
| `adversarial` | Acronyms, dotted identifiers, punctuation, numbers, stop words.            |
| `ambiguity`   | The 44 titles shared by more than one page — the canonical one has to win. |

### There is no record of real queries, so the head bucket is derived

The search runs entirely in the browser. Nothing reports what was typed to any
backend, and no analytics event carries it, so no log exists to go and read.
Head queries are derived from the corpus instead, by two independent methods,
and every entry in `queries/head.json` records which one produced it:

**corpus-frequency** — `derive-head-queries.mjs` counts how many pages each term
appears on, using the de-stopworded `keywords` field the legacy index already
carries, and keeps the terms that also name a page of their own. Frequency alone
returns filler; page titles alone return 1,250 rows in no order. The
intersection is the set of concepts a reader is likely to search for and to
expect a particular landing page from. The whole `/docs/octopus-rest-api/` tree
is excluded from being the expected answer, because every CLI page is titled
with the common words that make up its command and would otherwise outrank the
product page on frequency alone.

**information-architecture** — the site's own 26 top-level sections. Someone
typing a section's name should land on that section. This method reaches pages
the first one cannot: `/docs/kubernetes` is titled "Kubernetes deployments with
Octopus", so no short title matches it.

Re-derive the candidates at any time:

```sh
node tools/search-bakeoff/derive-head-queries.mjs
```

It writes `results/head-candidates.json` and prints the top 40. That output is a
candidate list for a person to accept or reject; `queries/head.json` is written
by hand from it.

One real source of user language does still exist and is worth pulling in if
anyone has access: **Google Search Console** records the queries people typed
into Google that landed on `octopus.com/docs`. Those are external rather than
on-site searches, so they skew toward discovery rather than lookup, but they are
real words from real readers about these pages, which is more than the corpus
can offer.

### Expected URLs are written before the run

Every scored query names the URLs that count as a hit. Those were written
against the live page list before any engine was run, and `bakeoff:verify`
re-checks that all of them still exist.

Editing an `expect` entry after seeing results is how a bake-off talks itself
into a tie. If a result looks defensible but is not in `expect`, leave the score
alone and put the argument in the write-up.

Queries with an empty `expect` are recorded but not scored. Several exist
because the interesting question is how an engine degrades — `zzzzqqq` has no
right answer, and what matters is that nothing is invented for it.

## Metrics

- **Success@1** and **Success@5** — binary, from the expected URLs. The primary
  numbers.
- **MRR** — separates "missed it" from "found it, at rank 7".
- **Zero-result rate** — including the truncated queries, where it matters most.
- **Highlight rate** and **blank excerpt rate** — presentation defects that read
  as bad results even when the ranking is right.

Graded relevance (NDCG) is deliberately absent. It costs hours of rating and
would not change the ordering on a corpus of 1,250 pages.

## Before trusting round one

The two spikes are not tuned equivalently, so the first run measures config
choices as much as engines. Known asymmetries, all of them one-line fixes:

1. `orama-index.ts` truncates each page's body at 4,000 characters
   (`BODY_LIMIT`); Pagefind indexes the whole page.
2. `search-engine-orama.ts` asks its worker for 200 hits and counts facets
   client-side, so every facet count saturates at 200. Pagefind reports a true
   `unfilteredResultCount`.
3. The Orama excerpt prefers `description` over `body`, so a page with a
   subtitle never shows match context.
4. Weighting differs in kind: Orama boosts fields (`title` x4), Pagefind infers
   weight from HTML structure and honours `data-pagefind-weight`.

Run round one, read `results/report.html` to see where each engine loses, spend
one tuning pass on each, then run round two and decide on that.

### Tuning each engine

Both engines can be tuned against their already-deployed index, without waiting
on a build:

```sh
node tools/search-bakeoff/tune-pagefind.mjs   # sweeps Pagefind ranking params
node tools/search-bakeoff/simulate-orama.mjs  # runs the set through Orama in Node
```

`ranking` is a client-side option in Pagefind, so a candidate configuration can
be tried against the live bundle and only the winner needs committing.
`simulate-orama.mjs` reproduces what the worker and engine do — same schema,
boosts, tolerance and limits — so a change to the worker can be measured before
it ships. Neither says anything about download, restore or keystroke cost; those
only come from `perf.mjs` in a real browser.

### Pagefind's ranking parameters do not move it

The sweep was run expecting `pageLength` to explain why the REST API example
pages take rank 1 from the product pages. It does not:

| Configuration                           | Success@1 | Success@5 | Ambiguity@5 |
| --------------------------------------- | --------- | --------- | ----------- |
| default (`pageLength` 0.75)             | 31%       | 61%       | 40%         |
| `pageLength` 0.4                        | 30%       | 59%       | 40%         |
| `pageLength` 0.2                        | 28%       | 59%       | 40%         |
| `pageLength` 0.0                        | 27%       | 58%       | 40%         |
| `pageLength` 0.2 + `termSimilarity` 1.5 | 30%       | 59%       | 40%         |
| `pageLength` 0.0 + `termSimilarity` 2.0 | 30%       | 61%       | 40%         |

The default is already Pagefind's best, and the ambiguity bucket does not move
at all. Pagefind's relevance gap is structural rather than a matter of
configuration: the example pages genuinely carry the query term in their `h1`,
and Pagefind weights title metadata 5x by default. Closing it means changing
what gets indexed — `data-pagefind-weight` in `Default.astro`, or demoting the
examples tree — which needs a rebuild rather than a flag.

### Round one already found one of these

`orama-worker.ts` restores the index with `create({ schema: SCHEMA })`, which
carries no tokenizer configuration, while `orama-index.ts` built that index with
`components: { tokenizer: { stemming: true, language: 'english' } }`. Query-time
tokenization therefore does not match index-time tokenization, and Orama's
recall collapses. Loading the shipped `search-index.json` both ways:

| Term           | As the worker creates it | With the tokenizer it was built with |
| -------------- | ------------------------ | ------------------------------------ |
| `variables`    | 5 hits                   | 321 hits                             |
| `varibles`     | 0 hits                   | 321 hits                             |
| `certificates` | 2 hits                   | 110 hits                             |
| `enviroments`  | 0 hits                   | 411 hits                             |

Typo tolerance works once the tokenizer matches.

The fix is committed on the spike branch, and `simulate-orama.mjs` measures what
it buys across the whole 102-query set against the deployed index:

|              | Before | After     |
| ------------ | ------ | --------- |
| Success@1    | 36%    | **51%**   |
| Success@5    | 58%    | **77%**   |
| MRR          | 0.462  | **0.625** |
| Zero results | 11%    | **3%**    |
| Ambiguity@5  | 40%    | **80%**   |
| Typo@5       | 25%    | **58%**   |

One line in the worker, and Orama goes from last place to ahead of the legacy
engine's round-one Success@5. This is why round one could not be used to decide
anything.

### Nearly half of Orama's index is not paying for itself

Breaking the published `search-index.json` down by its top-level stores:

| Store     | Size   | What it is                                            |
| --------- | ------ | ----------------------------------------------------- |
| `index`   | 6.04MB | The inverted index — the part that does the searching |
| `sorting` | 2.69MB | A sort store built for every sortable field           |
| `docs`    | 2.68MB | The stored documents, of which body text is 2.44MB    |

`search-engine-orama.ts` never sorts by anything, so the 2.69MB sorting store is
pure weight; Orama takes `sort: { enabled: false }` at create time to drop it.
The stored body text is there only so the engine can cut its own excerpt, which
is a choice rather than a requirement — Pagefind fetches an excerpt per result
instead of shipping every page's text to every visitor.

Together that is 47% of an 11.43MB index, and the payload is the defect the
replacement exists to fix. Both need a rebuild to confirm, so neither is
measured here.

### Pagefind's zero-result rate is not the win it looks like

Pagefind returned results for every query in the set, including `zzzzqqq`, which
exists in the set precisely because it has no right answer. A 0% zero-result
rate next to wrong answers for nonsense input is a defect rather than coverage.
Read that column alongside `adv-15`.

## Corpus drift

The three targets are built from three different commits, so a small part of any
difference is content rather than engine. `bakeoff:verify` prints the live page
count and `bakeoff:payload` records each index, which is enough to notice drift;
at the time of writing the legacy index holds 1,250 pages and Pagefind's holds
1,251. Re-deploy the spike branches from current main before the deciding run.

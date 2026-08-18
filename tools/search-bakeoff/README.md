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
pnpm bakeoff:relevance   # 85 queries x 3 lengths x 3 engines (~20 minutes)
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

`queries/curated.json`, 85 queries in six buckets:

| Bucket        | What it is for                                                             |
| ------------- | -------------------------------------------------------------------------- |
| `head`        | High-frequency terms. Currently **assumed**, see below.                    |
| `title`       | Exact page titles. Anything short of rank 1 here is a real failure.        |
| `intent`      | Multi-word natural language, the way people actually type.                 |
| `typo`        | Misspellings and stemming, where Orama's `tolerance` should pay off.       |
| `adversarial` | Acronyms, dotted identifiers, punctuation, numbers, stop words.            |
| `ambiguity`   | The 44 titles shared by more than one page — the canonical one has to win. |

**The head bucket is assumed and is the weakest evidence in the set.** Pull the
real top queries from analytics, write them to `queries/head.json` in the same
shape, and `lib/queries.mjs` drops the assumed ones in favour of them. Until
that happens, treat the head bucket's numbers as the least trustworthy row in
the report.

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

Typo tolerance works once the tokenizer matches. Orama's round-one scores are
measuring this defect rather than the engine, so they cannot be used to decide
anything until the worker passes the same components to `create()`.

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

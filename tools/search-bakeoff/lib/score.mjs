// Turns a run into the four numbers that decide the bake-off.
//
// Success@1 and Success@5 are binary and computed from the expected URLs
// written before the run, so they carry no judgement. MRR is the tiebreaker
// that separates "missed" from "found it, at rank 7". Graded relevance is
// deliberately absent: it costs hours of rating and would not change the
// ordering on a corpus this size.

/**
 * Compares result URLs to expected ones on path alone. The three targets live
 * on three different origins and one of them carries a trailing slash the
 * others do not, so anything else would score hosting differences as misses.
 */
export function normalisePath(url) {
  if (!url) return '';
  let path = url;

  try {
    path = new URL(url, 'https://octopus.com').pathname;
  } catch {
    // Already a path.
  }

  return path
    .toLowerCase()
    .replace(/\/index\.html$/, '')
    .replace(/\/+$/, '');
}

export function rankOfFirstExpected(results, expected) {
  const wanted = new Set(expected.map(normalisePath));
  for (let at = 0; at < results.length; at++) {
    if (wanted.has(normalisePath(results[at].url))) return at + 1;
  }
  return null;
}

/**
 * Scores one query on one target.
 *
 * A query with no expected URLs is recorded but not scored — the typo and
 * adversarial buckets exist partly to find out what a reasonable answer even
 * is, and inventing one after seeing the results is how a bake-off talks itself
 * into a tie.
 */
export function scoreQuery(query, run) {
  const expected = query.expect ?? [];
  const rendered = run.results ?? [];

  // Only pages are ranked. A section row is extra navigation inside a result
  // that has already ranked, so counting the rows as results would penalise the
  // engine that offers them: three sections under the first hit would push the
  // second page to rank 5 without the engine having ranked it any lower.
  const results = rendered.filter((result) => !result.isSection);
  const sectionRows = rendered.length - results.length;

  const rank =
    expected.length > 0 ? rankOfFirstExpected(results, expected) : null;

  return {
    id: query.id,
    bucket: query.bucket,
    query: run.query,
    variant: run.variant,
    judged: expected.length > 0,
    resultCount: results.length,
    sectionRows,
    zeroResults: results.length === 0,
    rank,
    successAt1: expected.length > 0 && rank === 1,
    successAt5: expected.length > 0 && rank !== null && rank <= 5,
    reciprocalRank: rank === null ? 0 : 1 / rank,
    // Whether the engine marked the matched terms at all. Pagefind returns a
    // marked excerpt; the Orama engine cuts its own window. A row with no mark
    // reads as a worse result even when the ranking is identical.
    highlighted: results
      .slice(0, 5)
      .some((result) => /<mark>/i.test(result.excerptHtml ?? '')),
    emptyExcerpts: results.slice(0, 5).filter((result) => !result.excerpt)
      .length,
    topFive: results.slice(0, 5).map((result) => ({
      url: normalisePath(result.url),
      title: result.title,
    })),
  };
}

function mean(values) {
  return values.length === 0
    ? 0
    : values.reduce((total, value) => total + value, 0) / values.length;
}

export function summarise(scored) {
  const judged = scored.filter((row) => row.judged);

  return {
    queries: scored.length,
    judged: judged.length,
    successAt1: mean(judged.map((row) => (row.successAt1 ? 1 : 0))),
    successAt5: mean(judged.map((row) => (row.successAt5 ? 1 : 0))),
    mrr: mean(judged.map((row) => row.reciprocalRank)),
    zeroResultRate: mean(scored.map((row) => (row.zeroResults ? 1 : 0))),
    highlightRate: mean(scored.map((row) => (row.highlighted ? 1 : 0))),
    // A row whose excerpt is blank still occupies a full-height result. Worth
    // counting because it is a config problem rather than a ranking one.
    blankExcerptRate: mean(
      scored.map((row) =>
        row.resultCount > 0 && row.emptyExcerpts > 0 ? 1 : 0
      )
    ),
    // How often the engine could point at a heading inside a result rather than
    // only at the page. Kept out of the relevance numbers on purpose: it changes
    // where a reader lands, not which page ranks.
    sectionRate: mean(scored.map((row) => (row.sectionRows > 0 ? 1 : 0))),
  };
}

export function summariseBy(scored, key) {
  const groups = new Map();
  for (const row of scored) {
    const bucket = groups.get(row[key]) ?? [];
    bucket.push(row);
    groups.set(row[key], bucket);
  }

  return Object.fromEntries(
    [...groups].map(([name, rows]) => [name, summarise(rows)])
  );
}

export function percentile(values, fraction) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const at = Math.min(
    sorted.length - 1,
    Math.ceil(fraction * sorted.length) - 1
  );
  return sorted[Math.max(0, at)];
}

// Drives the `DocsSearch` overlay from outside.
//
// Selectors are the `data-*` contract in `src/components/DocsSearch.astro`,
// which all three targets share. Class names are only used for the parts of a
// result row that carry no data attribute of their own.

import { SETTLE } from '../config.mjs';

const INPUT = '[data-docs-search-input]';
const LIST = '[data-docs-search-results]';
const EMPTY = '[data-docs-search-empty]';
const ECHO = '[data-docs-search-echo]';
const TABS = '[data-docs-search-tabs] [data-facet]';

/**
 * Opens the site overlay. Ctrl+K rather than a click on the nav trigger: the
 * trigger's visibility depends on viewport and on which nav is active, and the
 * chord is bound unconditionally on non-Apple platforms.
 */
export async function openOverlay(page) {
  // `attached` rather than the default `visible`: a closed <dialog> is hidden by
  // the UA stylesheet, which is exactly the state it is in before this runs.
  await page.waitForSelector('[data-docs-search="site"]', {
    state: 'attached',
    timeout: 30_000,
  });
  await page.keyboard.press('Control+K');

  const opened = await page
    .waitForFunction(
      () => document.querySelector('[data-docs-search="site"]')?.open === true,
      null,
      { timeout: 5_000 }
    )
    .then(() => true)
    .catch(() => false);

  if (opened) return;

  // The chord is registered by the component's own module script, so a failure
  // here means that script has not run yet rather than that the binding is
  // missing. Clicking the trigger goes through the same `open()`.
  const trigger = page.locator('[data-docs-search-trigger]').first();
  await trigger.click({ timeout: 10_000 });
  await page.waitForFunction(
    () => document.querySelector('[data-docs-search="site"]')?.open === true,
    null,
    { timeout: 10_000 }
  );
}

/**
 * Puts a query in the field the way a user would, then waits for the list to
 * stop moving.
 *
 * The value is set through the native setter and followed by a synthetic
 * `input` event because that is exactly what the overlay debounces on; typing
 * character by character would fire a search per keystroke and the reported
 * timing would be of the last one only.
 */
export async function runQuery(page, query, { timeoutMs } = {}) {
  await page.$eval(
    INPUT,
    (element, value) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;
      setter.call(element, value);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    },
    query
  );

  await settle(page, query, timeoutMs ?? SETTLE.timeoutMs);
  return readResults(page);
}

/**
 * Waits until the overlay has rendered *this* query and the rows have held
 * still.
 *
 * The echo element is written on every render, so it is what tells a settled
 * empty list apart from a list that has not been redrawn yet — without it a
 * zero-result query is indistinguishable from a search still in flight.
 */
async function settle(page, query, timeoutMs) {
  const wanted = query.trim();
  const started = Date.now();
  let signature = null;
  let changedAt = Date.now();

  while (Date.now() - started < timeoutMs) {
    const state = await page.evaluate(
      ({ list, echo, empty }) => {
        const rows = document.querySelectorAll(`${list} [role="option"]`);
        const emptyEl = document.querySelector(empty);
        return {
          echo: document.querySelector(echo)?.textContent?.trim() ?? '',
          empty: emptyEl ? !emptyEl.hidden : false,
          signature: [...rows].map((row) => row.getAttribute('href')).join('|'),
        };
      },
      { list: LIST, echo: ECHO, empty: EMPTY }
    );

    const drawn = state.echo === wanted;
    const current = `${state.empty ? 'EMPTY' : ''}${state.signature}`;

    if (!drawn || current !== signature) {
      signature = current;
      changedAt = Date.now();
    } else if (Date.now() - changedAt >= SETTLE.quietMs) {
      return;
    }

    await page.waitForTimeout(50);
  }

  throw new Error(`overlay never settled on "${query}" within ${timeoutMs}ms`);
}

export async function readResults(page) {
  return page.evaluate(
    ({ list, tabs, empty }) => {
      const rows = [...document.querySelectorAll(`${list} [role="option"]`)];
      const text = (row, selector) =>
        row.querySelector(selector)?.textContent?.trim() ?? '';

      const counts = {};
      for (const tab of document.querySelectorAll(tabs)) {
        const raw = tab.querySelector('.docs-search__count')?.textContent ?? '';
        counts[tab.dataset.facet] = {
          count: Number(raw.replace(/[^0-9]/g, '')) || 0,
          hidden: tab.hidden,
        };
      }

      const emptyEl = document.querySelector(empty);

      return {
        results: rows.map((row) => ({
          url: row.getAttribute('href'),
          // Pagefind returns heading-level sub-results, and the overlay renders
          // each one as an option in the same listbox so the arrow keys walk
          // them. They are not results in their own right: three of them under
          // one page would otherwise push the second page down to rank 5 and
          // score as though the engine had ranked it there.
          isSection: row.classList.contains('docs-search__row--section'),
          title:
            text(row, '.docs-search__row-title') ||
            text(row, '.docs-search__section-title'),
          excerpt: text(row, '.docs-search__row-excerpt'),
          // Kept as HTML too: whether an engine highlights the matched terms at
          // all is part of what is being compared, and textContent loses it.
          excerptHtml:
            row.querySelector('.docs-search__row-excerpt')?.innerHTML ?? '',
          trail: text(row, '.docs-search__row-trail'),
        })),
        counts,
        showedEmptyState: emptyEl ? !emptyEl.hidden : false,
      };
    },
    { list: LIST, tabs: TABS, empty: EMPTY }
  );
}

/**
 * Arms an in-page observer that stamps the moment the first result row appears.
 *
 * Polling from the driver would quantise the measurement to the poll interval,
 * which is the same order as the number being measured on a warm index.
 */
export async function armFirstResultClock(page) {
  await page.evaluate((list) => {
    const target = document.querySelector(list);
    window.__firstResultAt = null;
    window.__queryStartedAt = null;

    window.__searchObserver?.disconnect();
    const observer = new MutationObserver(() => {
      if (
        window.__firstResultAt === null &&
        target.querySelector('[role="option"]')
      ) {
        window.__firstResultAt = performance.now();
      }
    });
    observer.observe(target, { childList: true, subtree: true });
    window.__searchObserver = observer;
  }, LIST);
}

/** Clears the field and the clock so the next query is timed from zero. */
export async function resetClock(page) {
  await page.evaluate(
    ({ input }) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;
      setter.call(document.querySelector(input), '');
      window.__firstResultAt = null;
      window.__queryStartedAt = performance.now();
    },
    { input: INPUT }
  );
}

export async function readFirstResultMs(page) {
  return page.evaluate(() =>
    window.__firstResultAt === null
      ? null
      : window.__firstResultAt - window.__queryStartedAt
  );
}

/**
 * Types a query one character at a time and reports how long each keystroke
 * took to reach a redrawn list. This is the interaction the overlay actually
 * has, so it is measured separately from a whole-query search.
 */
export async function typeAndTime(page, query) {
  await page.click(INPUT);
  await page.$eval(INPUT, (element) => {
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    ).set;
    setter.call(element, '');
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });

  const samples = [];

  for (let at = 1; at <= query.length; at++) {
    const prefix = query.slice(0, at);
    const started = Date.now();

    await page.$eval(
      INPUT,
      (element, value) => {
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value'
        ).set;
        setter.call(element, value);
        element.dispatchEvent(new Event('input', { bubbles: true }));
      },
      prefix
    );

    await page
      .waitForFunction(
        ({ echo, wanted }) =>
          document.querySelector(echo)?.textContent?.trim() === wanted,
        { echo: ECHO, wanted: prefix.trim() },
        { timeout: SETTLE.warmTimeoutMs }
      )
      .catch(() => {});

    samples.push(Date.now() - started);
  }

  return samples;
}

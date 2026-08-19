import { test, expect, type Page } from '@playwright/test';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  RATING_NO,
  RATING_YES,
  READING_TIME,
} from '../src/scripts/modules/feedback-form.js';

const PAGE = '/docs/kubernetes/steps/kustomize';
const ANCHOR = '#recommended-step-usages';
const SCANNER_HASH =
  '#__proto__%5Bsssied%5D=sssieda&x.__proto__.sssied=sssiede';

/**
 * Playwright drives a real browser, so `navigator.webdriver` is true and the
 * widget takes every test click for a crawler's. The tests below are about
 * what a reader gets, so they put a reader's browser back.
 */
async function asReader(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
      configurable: true,
    });
  });
}

/** Captures the body of the submission, or leaves it null if none goes out. */
async function catchSubmission(page: Page) {
  const sent = { body: null as string | null };
  await page.route('**/docs.google.com/**', (route) => {
    sent.body = route.request().postData();
    return route.fulfill({ status: 200, body: '' });
  });

  return sent;
}

/** Anything sent faster than a reader could manage is dropped unsent. */
async function readingPause(page: Page) {
  await page.waitForTimeout(READING_TIME + 100);
}

async function voteThenSend(page: Page, rating = RATING_YES) {
  await page.locator(`[data-feedback-vote="${rating}"]`).click();
  await readingPause(page);
  await page.locator('[data-feedback-send]').click();
}

test.describe('feedback widget', () => {
  test.beforeEach(async ({ page }) => {
    // Blocked for every test, so no run can post to the live form. The cases
    // below override this: Playwright matches the newest route first.
    await page.route('**/docs.google.com/**', (route) => route.abort());
    await asReader(page);
    await page.goto(PAGE);
  });

  test('asks the question alone until a rating is given', async ({ page }) => {
    await expect(page.locator('.feedback__question')).toBeVisible();
    await expect(page.locator('.feedback__comment')).toBeHidden();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
  });

  test('discloses the comment box on a rating', async ({ page }) => {
    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();

    await expect(page.locator('.feedback__comment')).toBeVisible();
    await expect(
      page.locator(`[data-feedback-vote="${RATING_YES}"]`)
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.locator(`[data-feedback-vote="${RATING_NO}"]`)
    ).toHaveAttribute('aria-pressed', 'false');
  });

  test('moves the rating to the other button', async ({ page }) => {
    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator(`[data-feedback-vote="${RATING_NO}"]`).click();

    await expect(
      page.locator(`[data-feedback-vote="${RATING_YES}"]`)
    ).toHaveAttribute('aria-pressed', 'false');
    await expect(
      page.locator(`[data-feedback-vote="${RATING_NO}"]`)
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('thanks the reader once the submission has gone out', async ({
    page,
  }) => {
    await catchSubmission(page);

    await voteThenSend(page);

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await expect(page.locator('.feedback__vote')).toBeHidden();
    await expect(page.locator('.feedback__comment')).toBeHidden();
  });

  test('sends the page title and url, the rating and the comment', async ({
    page,
    baseURL,
  }) => {
    const sent = await catchSubmission(page);

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('.feedback__textarea').fill('the kustomize page');
    await readingPause(page);
    await page.locator('[data-feedback-send]').click();
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    const body = new URLSearchParams(sent.body ?? '');
    expect(body.get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${baseURL}${PAGE}`
    );
    expect(body.get(FIELD_RATING)).toBe(RATING_YES);
    expect(body.get(FIELD_COMMENT)).toBe('the kustomize page');
  });

  test('keeps a fragment that names a section', async ({ page, baseURL }) => {
    const sent = await catchSubmission(page);
    await page.goto(`${PAGE}${ANCHOR}`);

    await voteThenSend(page);
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    expect(new URLSearchParams(sent.body ?? '').get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${baseURL}${PAGE}${ANCHOR}`
    );
  });

  test('drops a fragment that names nothing on the page', async ({
    page,
    baseURL,
  }) => {
    const sent = await catchSubmission(page);
    await page.goto(`${PAGE}${SCANNER_HASH}`);

    await voteThenSend(page);
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    expect(new URLSearchParams(sent.body ?? '').get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${baseURL}${PAGE}`
    );
  });

  test('posts nothing when a script does the clicking', async ({ page }) => {
    const sent = await catchSubmission(page);

    const click = (selector: string) =>
      page.evaluate(
        (target) => document.querySelector<HTMLElement>(target)?.click(),
        selector
      );

    // Paced out, so the untrusted click is the only thing under test here.
    await click('[data-feedback-vote]');
    await readingPause(page);
    await click('[data-feedback-send]');

    // Thanked all the same, so a crawler has nothing to work around.
    await expect(page.locator('.feedback__thanks')).toBeVisible();
    expect(sent.body).toBeNull();
  });

  test('posts nothing from a browser under automation', async ({ page }) => {
    const sent = await catchSubmission(page);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => true,
        configurable: true,
      });
    });
    await page.goto(PAGE);

    await voteThenSend(page);

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    expect(sent.body).toBeNull();
  });

  test('posts nothing when the honeypot has been filled', async ({ page }) => {
    const sent = await catchSubmission(page);
    await page.evaluate(() => {
      const trap = document.querySelector<HTMLInputElement>(
        '[data-feedback-trap]'
      );
      if (trap) trap.value = 'https://example.com/buy-things';
    });

    await voteThenSend(page);

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    expect(sent.body).toBeNull();
  });

  test('posts nothing when send follows the vote instantly', async ({
    page,
  }) => {
    const sent = await catchSubmission(page);
    // Frozen, so no time can pass between the two clicks however long
    // Playwright actually takes over them.
    await page.addInitScript(() => {
      const frozen = performance.now();
      Object.defineProperty(performance, 'now', {
        value: () => frozen,
        configurable: true,
      });
    });
    await page.goto(PAGE);

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('[data-feedback-send]').click();

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    expect(sent.body).toBeNull();
  });

  test('asks a page only once, and remembers on the next visit', async ({
    page,
  }) => {
    const sent = await catchSubmission(page);

    await voteThenSend(page);
    await expect(page.locator('.feedback__thanks')).toBeVisible();
    expect(sent.body).not.toBeNull();

    sent.body = null;
    await page.goto(PAGE);

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await expect(page.locator('.feedback__vote')).toBeHidden();
    expect(sent.body).toBeNull();
  });

  test('asks again on a page that has not been answered', async ({ page }) => {
    await catchSubmission(page);

    await voteThenSend(page);
    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await page.goto('/docs/kubernetes/steps/yaml');

    await expect(page.locator('.feedback__vote')).toBeVisible();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
  });

  test('keeps the form up when the submission never leaves the browser', async ({
    page,
  }) => {
    await voteThenSend(page, RATING_NO);

    // Send is disabled for the attempt and only comes back on the failure, so
    // this settles after the handler has run. The two checks below would each
    // pass against a handler that had not reached its catch yet.
    await expect(page.locator('[data-feedback-send]')).toBeEnabled();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
    await expect(page.locator('.feedback__vote')).toBeVisible();
  });
});

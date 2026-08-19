import { test, expect } from '@playwright/test';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  RATING_NO,
  RATING_YES,
} from '../src/scripts/modules/feedback-form.js';

const PAGE = '/docs/kubernetes/steps/kustomize';

test.describe('feedback widget', () => {
  test.beforeEach(async ({ page }) => {
    // Blocked for every test, so no run can post to the live form. The success
    // case below overrides this: Playwright matches the newest route first.
    await page.route('**/docs.google.com/**', (route) => route.abort());
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

  test('keeps send out of reach until the box has something in it', async ({
    page,
  }) => {
    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await expect(page.locator('[data-feedback-send]')).toBeDisabled();

    // Whitespace is nothing to send, so it does not count as an answer.
    await page.locator('.feedback__textarea').fill('   ');
    await expect(page.locator('[data-feedback-send]')).toBeDisabled();

    await page.locator('.feedback__textarea').fill('the diagram is wrong');
    await expect(page.locator('[data-feedback-send]')).toBeEnabled();

    await page.locator('.feedback__textarea').fill('');
    await expect(page.locator('[data-feedback-send]')).toBeDisabled();
  });

  test('sends nothing on a vote with an empty box', async ({ page }) => {
    let sent = false;
    await page.route('**/docs.google.com/**', (route) => {
      sent = true;
      return route.fulfill({ status: 200, body: '' });
    });

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    // Past the disabled attribute, which a click alone cannot get through.
    await page.locator('[data-feedback-send]').dispatchEvent('click');

    await expect(page.locator('.feedback__thanks')).toBeHidden();
    expect(sent).toBe(false);
  });

  test('thanks the reader once the submission has gone out', async ({
    page,
  }) => {
    await page.route('**/docs.google.com/**', (route) =>
      route.fulfill({ status: 200, body: '' })
    );

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('.feedback__textarea').fill('clear enough');
    await page.locator('[data-feedback-send]').click();

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await expect(page.locator('.feedback__vote')).toBeHidden();
    await expect(page.locator('.feedback__comment')).toBeHidden();
  });

  test('sends the page title and url, the rating and the comment', async ({
    page,
  }) => {
    /** @type {string | null} */
    let body = null;
    await page.route('**/docs.google.com/**', (route) => {
      body = route.request().postData();
      return route.fulfill({ status: 200, body: '' });
    });

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('.feedback__textarea').fill('the kustomize page');
    await page.locator('[data-feedback-send]').click();
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    const sent = new URLSearchParams(body ?? '');
    expect(sent.get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - http://localhost:3000${PAGE}`
    );
    expect(sent.get(FIELD_RATING)).toBe(RATING_YES);
    expect(sent.get(FIELD_COMMENT)).toBe('the kustomize page');
  });

  test('keeps the form up when the submission never leaves the browser', async ({
    page,
  }) => {
    await page.locator(`[data-feedback-vote="${RATING_NO}"]`).click();
    await page
      .locator('.feedback__textarea')
      .fill('the steps are out of order');
    await page.locator('[data-feedback-send]').click();

    // Send is disabled for the attempt and only comes back on the failure, so
    // this settles after the handler has run. The two checks below would each
    // pass against a handler that had not reached its catch yet.
    await expect(page.locator('[data-feedback-send]')).toBeEnabled();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
    await expect(page.locator('.feedback__vote')).toBeVisible();
  });
});

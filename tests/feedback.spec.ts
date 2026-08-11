import { test, expect } from '@playwright/test';
import { RATING_NO, RATING_YES } from '../src/scripts/modules/feedback-form.js';

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

  test('thanks the reader once the submission has gone out', async ({
    page,
  }) => {
    await page.route('**/docs.google.com/**', (route) =>
      route.fulfill({ status: 200, body: '' })
    );

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('[data-feedback-send]').click();

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await expect(page.locator('.feedback__vote')).toBeHidden();
    await expect(page.locator('.feedback__comment')).toBeHidden();
  });

  test('keeps the form up when the submission never leaves the browser', async ({
    page,
  }) => {
    await page.locator(`[data-feedback-vote="${RATING_NO}"]`).click();
    await page.locator('[data-feedback-send]').click();

    // Send is disabled for the attempt and only comes back on the failure, so
    // this settles after the handler has run. The two checks below would each
    // pass against a handler that had not reached its catch yet.
    await expect(page.locator('[data-feedback-send]')).toBeEnabled();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
    await expect(page.locator('.feedback__vote')).toBeVisible();
  });
});

import { test, expect, type Page } from '@playwright/test';
import {
  COMMENT_LIMIT,
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  RATING_NO,
  RATING_YES,
  VIEW_URL,
} from '../src/scripts/modules/feedback-form.js';

const PAGE = '/docs/kubernetes/steps/kustomize';
const TITLE = 'Deploy with Kustomize';

/** The prefilled form the Send link points at, in parts. */
async function sendLink(page: Page) {
  const href = await page.locator('[data-feedback-send]').getAttribute('href');

  return new URL(href ?? '');
}

test.describe('feedback widget', () => {
  test.beforeEach(async ({ page }) => {
    // Nothing is posted from the page any more, so an attempt to reach Google
    // fails the run rather than arriving.
    await page.route('**/docs.google.com/**', (route) => route.abort());
    await page.goto(PAGE);
  });

  test('asks the question alone until a rating is given', async ({ page }) => {
    await expect(page.locator('.feedback__question')).toBeVisible();
    await expect(page.locator('.feedback__comment')).toBeHidden();
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

  test('points at the form with the page filled in before anything is answered', async ({
    page,
    baseURL,
  }) => {
    const link = await sendLink(page);

    expect(link.origin + link.pathname).toBe(VIEW_URL);
    expect(link.searchParams.get('usp')).toBe('pp_url');
    expect(link.searchParams.get(FIELD_PAGE)).toBe(
      `${TITLE} - ${baseURL}${PAGE}`
    );
    expect(link.searchParams.has(FIELD_RATING)).toBe(false);
    expect(link.searchParams.has(FIELD_COMMENT)).toBe(false);
  });

  test('carries the rating and the comment as they are answered', async ({
    page,
    baseURL,
  }) => {
    await page.locator(`[data-feedback-vote="${RATING_NO}"]`).click();
    await page.locator('.feedback__textarea').fill('the diagram is wrong');

    const link = await sendLink(page);

    expect(link.searchParams.get(FIELD_PAGE)).toBe(
      `${TITLE} - ${baseURL}${PAGE}`
    );
    expect(link.searchParams.get(FIELD_RATING)).toBe(RATING_NO);
    expect(link.searchParams.get(FIELD_COMMENT)).toBe('the diagram is wrong');
  });

  test('leaves a long comment for the reader to finish on the form', async ({
    page,
  }) => {
    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page
      .locator('.feedback__textarea')
      .fill('x'.repeat(COMMENT_LIMIT * 2));

    const link = await sendLink(page);

    expect(link.searchParams.get(FIELD_COMMENT)).toHaveLength(COMMENT_LIMIT);
  });

  test('opens the form in its own tab', async ({ page }) => {
    // The site's external link handling owns this, so the widget inherits it.
    await expect(page.locator('[data-feedback-send]')).toHaveAttribute(
      'target',
      '_blank'
    );
    await expect(page.locator('[data-feedback-send]')).toHaveAttribute(
      'rel',
      'noopener'
    );
  });

  test('posts nothing itself, however the widget is worked', async ({
    page,
  }) => {
    const reached: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('docs.google.com'))
        reached.push(request.url());
    });

    await page.locator(`[data-feedback-vote="${RATING_YES}"]`).click();
    await page.locator('.feedback__textarea').fill('anything at all');
    await page.locator(`[data-feedback-vote="${RATING_NO}"]`).click();

    expect(reached).toEqual([]);
  });
});

import { test, expect } from '@playwright/test';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  FORM_ID,
  RATING_NO,
  RATING_YES,
} from '../src/scripts/modules/feedback-form.js';

const PAGE = '/docs/kubernetes/steps/kustomize';
const VIEW_FORM = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;

const SENT = [FIELD_PAGE, FIELD_RATING, FIELD_COMMENT];

type Field = { id: string; options: string[]; required: boolean };

/**
 * Google's form definition is positional and undocumented: a question is
 * [id, title, description, type, entries], and an entry is
 * [fieldId, options, required].
 */
function fields(html: string): Map<string, Field> {
  const payload = /FB_PUBLIC_LOAD_DATA_ = ([\s\S]*?);<\/script>/.exec(html);
  if (!payload) {
    throw new Error('The form page carries no FB_PUBLIC_LOAD_DATA_');
  }

  const found = new Map<string, Field>();

  for (const question of JSON.parse(payload[1])?.[1]?.[1] ?? []) {
    for (const entry of question?.[4] ?? []) {
      const id = `entry.${entry[0]}`;
      found.set(id, {
        id,
        options: (entry[1] ?? []).map((option: string[]) => option[0]),
        required: entry[2] === 1,
      });
    }
  }

  return found;
}

// The widget posts with mode: 'no-cors', so it can never read whether Google
// accepted a submission. These stand in for the response: they fail on the
// drift that would make the form start rejecting what the widget sends.
test.describe('the Google Form behind the feedback widget', () => {
  let found: Map<string, Field>;

  // `request` is test scoped, so beforeAll builds its own context.
  test.beforeAll(async ({ playwright }) => {
    const request = await playwright.request.newContext();
    const response = await request.get(VIEW_FORM);
    expect(response.status()).toBe(200);
    found = fields(await response.text());
    await request.dispose();
  });

  test('still has every field the widget posts to', () => {
    expect([...found.keys()]).toEqual(expect.arrayContaining(SENT));
  });

  test('still accepts both ratings the widget sends', () => {
    expect(found.get(FIELD_RATING)?.options).toEqual(
      expect.arrayContaining([RATING_YES, RATING_NO])
    );
  });

  test('has gained no required field the widget leaves out', () => {
    const unanswered = [...found.values()]
      .filter((field) => field.required)
      .map((field) => field.id)
      .filter((id) => !SENT.includes(id));

    expect(unanswered).toEqual([]);
  });
});

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

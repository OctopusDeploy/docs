import { test, expect, type Page } from '@playwright/test';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  HUMAN_EVENTS_NEEDED,
  MIN_READ_MS,
  MIN_VOTE_TO_SEND_MS,
  RATING_NO,
  RATING_YES,
} from '../src/scripts/modules/feedback-form.js';

const PAGE = '/docs/kubernetes/steps/kustomize';

const VOTE_YES = `[data-feedback-vote="${RATING_YES}"]`;
const VOTE_NO = `[data-feedback-vote="${RATING_NO}"]`;
const SEND = '[data-feedback-send]';

/**
 * The widget waits for the browser to report the events a person produces on
 * the way to it, and for long enough that the page could have been read. Enough
 * steps to clear the count in a single move.
 */
async function readThePage(page: Page) {
  await page.mouse.move(400, 400, { steps: HUMAN_EVENTS_NEEDED * 2 });
  await page.waitForTimeout(MIN_READ_MS);
}

/** The pause a person takes over the comment box before sending. */
async function writeAComment(page: Page, text?: string) {
  if (text) await page.locator('.feedback__textarea').fill(text);
  await page.waitForTimeout(MIN_VOTE_TO_SEND_MS);
}

test.describe('feedback widget', () => {
  test.beforeEach(async ({ page }) => {
    // Playwright reports itself through `navigator.webdriver`, which the widget
    // treats as reason enough to stay inert. The suite is here to cover what
    // the widget does for a person, so it presents itself as one; the tests
    // below that cover the automated path do their own thing.
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
        configurable: true,
      });
    });

    // Blocked for every test, so no run can post to the live form. The success
    // cases below override this: Playwright matches the newest route first.
    await page.route('**/docs.google.com/**', (route) => route.abort());
    await page.goto(PAGE);
  });

  test('asks the question alone until a rating is given', async ({ page }) => {
    await expect(page.locator('.feedback__question')).toBeVisible();
    await expect(page.locator('.feedback__comment')).toBeHidden();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
  });

  test('discloses the comment box on a rating', async ({ page }) => {
    await readThePage(page);
    await page.locator(VOTE_YES).click();

    await expect(page.locator('.feedback__comment')).toBeVisible();
    await expect(page.locator(VOTE_YES)).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.locator(VOTE_NO)).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('moves the rating to the other button', async ({ page }) => {
    await readThePage(page);
    await page.locator(VOTE_YES).click();
    await page.locator(VOTE_NO).click();

    await expect(page.locator(VOTE_YES)).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    await expect(page.locator(VOTE_NO)).toHaveAttribute('aria-pressed', 'true');
  });

  test('thanks the reader once the submission has gone out', async ({
    page,
  }) => {
    await page.route('**/docs.google.com/**', (route) =>
      route.fulfill({ status: 200, body: '' })
    );

    await readThePage(page);
    await page.locator(VOTE_YES).click();
    await writeAComment(page);
    await page.locator(SEND).click();

    await expect(page.locator('.feedback__thanks')).toBeVisible();
    await expect(page.locator('.feedback__vote')).toBeHidden();
    await expect(page.locator('.feedback__comment')).toBeHidden();
  });

  test('sends the page title and url, the rating and the comment', async ({
    page,
  }) => {
    let body: string | null = null;
    await page.route('**/docs.google.com/**', (route) => {
      body = route.request().postData();
      return route.fulfill({ status: 200, body: '' });
    });

    await readThePage(page);
    await page.locator(VOTE_YES).click();
    await writeAComment(page, 'the kustomize page');
    await page.locator(SEND).click();
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    const sent = new URLSearchParams(body ?? '');
    expect(sent.get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${new URL(page.url()).origin}${PAGE}`
    );
    expect(sent.get(FIELD_RATING)).toBe(RATING_YES);
    expect(sent.get(FIELD_COMMENT)).toBe('the kustomize page');
  });

  test('keeps the form up when the submission never leaves the browser', async ({
    page,
  }) => {
    await readThePage(page);
    await page.locator(VOTE_NO).click();
    await writeAComment(page);
    await page.locator(SEND).click();

    // Send is disabled for the attempt and only comes back on the failure, so
    // this settles after the handler has run. The two checks below would each
    // pass against a handler that had not reached its catch yet.
    await expect(page.locator(SEND)).toBeEnabled();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
    await expect(page.locator('.feedback__vote')).toBeVisible();
  });
});

test.describe('feedback widget, driven by a scanner', () => {
  /** Every request the widget made, so an empty array is the whole assertion. */
  async function watchForSubmissions(page: Page) {
    const sent: string[] = [];
    await page.route('**/docs.google.com/**', (route) => {
      sent.push(route.request().url());
      return route.fulfill({ status: 200, body: '' });
    });
    return sent;
  }

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
        configurable: true,
      });
    });

    // Blocked for every test, so no run can post to the live form.
    await page.route('**/docs.google.com/**', (route) => route.abort());
  });

  test('ships the send button disabled', async ({ page }) => {
    await page.goto(PAGE);

    await expect(page.locator(SEND)).toBeDisabled();
  });

  test('sends nothing for a run that clicks every button from script', async ({
    page,
  }) => {
    const sent = await watchForSubmissions(page);
    await page.goto(PAGE);
    await readThePage(page);

    // The observed sequence: down the widget in document order, so the vote
    // lands on No and the comment box is open by the time Send is reached.
    await page.evaluate(
      (selectors) => {
        selectors.forEach((selector) =>
          document.querySelector<HTMLElement>(selector)?.click()
        );
      },
      [VOTE_YES, VOTE_NO, SEND]
    );

    await expect(page.locator('.feedback__comment')).toBeHidden();
    await expect(page.locator('.feedback__thanks')).toBeHidden();
    expect(sent).toHaveLength(0);
  });

  test('sends nothing for a run that clicks straight through', async ({
    page,
  }) => {
    const sent = await watchForSubmissions(page);
    await page.goto(PAGE);
    await readThePage(page);

    // Real clicks this time, so only the pace of them is left to go on.
    await page.locator(VOTE_YES).click();
    await page.locator(SEND).click();

    await expect(page.locator('.feedback__thanks')).toBeHidden();
    expect(sent).toHaveLength(0);
  });

  test('sends nothing while the page is younger than a read of it', async ({
    page,
  }) => {
    const sent = await watchForSubmissions(page);
    // The page's own clock, so its age is whatever this test says it is
    // however long the run takes in real time.
    await page.addInitScript(() => {
      let age = 0;
      performance.now = () => age;
      Object.assign(window, { advance: (ms: number) => (age += ms) });
    });
    await page.goto(PAGE);
    await page.mouse.move(400, 400, { steps: HUMAN_EVENTS_NEEDED * 2 });

    const advance = (ms: number) =>
      page.evaluate(
        (by) =>
          (window as unknown as { advance(ms: number): void }).advance(by),
        ms
      );

    // Past the wait between voting and sending, short of the read.
    await advance(MIN_READ_MS - MIN_VOTE_TO_SEND_MS * 2);
    await page.locator(VOTE_YES).click();
    await advance(MIN_VOTE_TO_SEND_MS + 100);
    await page.locator(SEND).click();

    await expect(page.locator('.feedback__thanks')).toBeHidden();
    expect(sent).toHaveLength(0);
  });

  test('sends nothing when the browser reports itself as automated', async ({
    page,
  }) => {
    const sent = await watchForSubmissions(page);
    // Undoes the beforeEach, leaving Playwright's own value in place.
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => true,
        configurable: true,
      });
    });
    await page.goto(PAGE);
    await readThePage(page);

    await page.locator(VOTE_YES).click();

    await expect(page.locator('.feedback__comment')).toBeHidden();
    expect(sent).toHaveLength(0);
  });

  test('drops a fragment that names no heading on the page', async ({
    page,
  }) => {
    let body: string | null = null;
    await page.route('**/docs.google.com/**', (route) => {
      body = route.request().postData();
      return route.fulfill({ status: 200, body: '' });
    });

    // The shape the scanner used, cut down to two of its parameters.
    await page.goto(`${PAGE}#q=sssiedhqxsx&token=sssiedhtokenxsx`);
    await readThePage(page);
    await page.locator(VOTE_YES).click();
    await writeAComment(page);
    await page.locator(SEND).click();
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    const sent = new URLSearchParams(body ?? '');
    expect(sent.get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${new URL(page.url()).origin}${PAGE}`
    );
  });

  test('keeps a fragment that names a heading on the page', async ({
    page,
  }) => {
    let body: string | null = null;
    await page.route('**/docs.google.com/**', (route) => {
      body = route.request().postData();
      return route.fulfill({ status: 200, body: '' });
    });

    await page.goto(PAGE);
    const heading = await page.locator('h2[id]').first().getAttribute('id');
    expect(heading).toBeTruthy();

    await page.goto(`${PAGE}#${heading}`);
    await readThePage(page);
    await page.locator(VOTE_YES).click();
    await writeAComment(page);
    await page.locator(SEND).click();
    await expect(page.locator('.feedback__thanks')).toBeVisible();

    const sent = new URLSearchParams(body ?? '');
    expect(sent.get(FIELD_PAGE)).toBe(
      `Deploy with Kustomize - ${new URL(page.url()).origin}${PAGE}#${heading}`
    );
  });
});

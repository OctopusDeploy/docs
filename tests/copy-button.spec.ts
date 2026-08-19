import { test, expect } from '@playwright/test';

// Every copy button runs on clipboard.js, so a break in one is a break in all.
const PAGE = '/docs/kubernetes/steps/kustomize';

// The page actions live on a page whose `.md` companion the build emits.
const MD_PAGE = '/docs/argo-cd';

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
});

test('the heading button copies that heading’s URL', async ({ page }) => {
  await page.goto(PAGE);

  const heading = page.locator('.page-content h2[id]').first();
  const id = await heading.getAttribute('id');
  const button = heading.locator('.copy-heading-url');

  await expect(button).toHaveAttribute('data-tooltip', 'Copy URL');

  await heading.hover();
  await button.click();

  await expect(button).toHaveAttribute('data-tooltip', 'Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    `#${id}`
  );

  // Each button keeps its own resting label
  await expect(button).toHaveAttribute('data-tooltip', 'Copy URL', {
    timeout: 4000,
  });
});

test('the two buttons revert to different labels', async ({ page }) => {
  await page.goto(PAGE);

  const heading = page.locator('.page-content h2[id]').first();
  await heading.hover();
  await heading.locator('.copy-heading-url').click();

  const code = page.locator('.code-block__copy').first();
  await code.click();

  await expect(heading.locator('.copy-heading-url')).toHaveAttribute(
    'data-tooltip',
    'Copy URL',
    { timeout: 4000 }
  );
  await expect(code).toHaveAttribute('data-tooltip', 'Copy to clipboard');
});

// The arrow and the bubble are separate boxes. Sharing an exact edge lets them
// round to different device pixels and show the page through the join, so the
// arrow is grown into the bubble far enough that rounding cannot part them.
test('the tooltip arrow overlaps the bubble it points from', async ({
  page,
}) => {
  await page.goto(PAGE);

  const button = page.locator('.copy-heading-url').first();
  await button.locator('.tooltip').waitFor({ state: 'attached' });

  const overlap = await button.evaluate((el) => {
    const bubble = el.querySelector('.tooltip');
    if (!bubble)
      throw new Error('expected the button to have a .tooltip bubble');

    const caret = getComputedStyle(bubble, '::after');
    const bubbleHeight = bubble.getBoundingClientRect().height;
    const caretTop = parseFloat(caret.top);
    const caretShiftY = parseFloat(caret.translate.split(' ')[1] ?? '0');

    return bubbleHeight - (caretTop + caretShiftY);
  });

  expect(
    overlap,
    'expected the caret to reach past the bubble’s edge'
  ).toBeGreaterThan(0);
});

test('a failed copy reports a failure rather than a check', async ({
  page,
}) => {
  // Every rung of the write chain refused, so the button has to report one.
  await page.addInitScript(() => {
    const refuse = () => Promise.reject(new Error('refused'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { write: refuse, writeText: refuse },
    });
    document.execCommand = () => false;
  });

  await page.goto(PAGE);

  const heading = page.locator('.page-content h2[id]').first();
  const button = heading.locator('.copy-heading-url');
  const icon = () =>
    button
      .locator('.copy-heading-url__icon')
      .evaluate((el) => getComputedStyle(el).maskImage);

  const resting = await icon();

  await heading.hover();
  await button.click();

  await expect(button).toHaveAttribute('data-tooltip', 'Copy failed');
  await expect(button).toHaveAttribute('data-failed', '');
  await expect(button).not.toHaveAttribute('data-copied', '');

  expect(await icon(), 'expected no success check beside “Copy failed”').toBe(
    resting
  );
});

test('copying announces the result once, from a single live region', async ({
  page,
}) => {
  await page.goto(PAGE);

  // The code block's button is server-rendered, so it can be clicked before
  // main.js has wired the listener up. The heading buttons are built on the way
  // past, and after the code blocks, so their arrival is the signal to go.
  await expect(page.locator('.copy-heading-url').first()).toBeAttached();

  await page.locator('.code-block__copy').first().click();

  const region = page.locator('.copy-status');
  await expect(region).toHaveCount(1);
  await expect(region).toHaveText('Copied');
});

test('the copy action puts the page markdown on the clipboard', async ({
  page,
  request,
}) => {
  // clipboard.js logs on its way down the fallback chain, so a quiet console
  // is the evidence that the ClipboardItem path - the one Safari needs for a
  // value that is still being fetched - is the path actually taken.
  const fellBack: string[] = [];
  page.on('console', (message) => {
    if (message.text().includes('falling back')) fellBack.push(message.text());
  });

  await page.goto(MD_PAGE);

  const button = page.locator('.octo-copy-md .split-btn__primary');
  await button.click();
  await expect(button).toHaveAttribute('data-copied', '');

  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const source = await (await request.get(MD_PAGE + '.md')).text();

  // The Windows clipboard hands back CRLF whatever went in, so newlines are
  // normalised before the comparison rather than asserted on.
  const normalise = (text: string) =>
    text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  expect(normalise(copied)).toBe(normalise(source));
  expect(fellBack, 'expected clipboard.write to succeed first time').toEqual(
    []
  );
});

// A copy that fails says nothing, so the button has to stay as it was rather
// than claim it copied.
test('the copy action stays at rest when the markdown cannot be fetched', async ({
  page,
}) => {
  await page.goto(MD_PAGE);

  // Routed after the page has loaded, so only the copy's own fetch is refused.
  await page.route('**/*.md', (route) => route.abort());

  const button = page.locator('.octo-copy-md .split-btn__primary');
  const label = button.locator('.btn__label');
  await button.click();

  await expect(button).not.toHaveAttribute('data-copied', '');
  await expect(label).toBeVisible();
  await expect(page.locator('.copy-status')).toHaveText('');
});

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

test('copying announces the result once, from a single live region', async ({
  page,
}) => {
  await page.goto(PAGE);

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

  const button = page.locator('.octo-copy-md');
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

test('the copy action reports a failure when the markdown cannot be fetched', async ({
  page,
}) => {
  await page.goto(MD_PAGE);

  // Routed after the page has loaded, so only the copy's own fetch is refused.
  await page.route('**/*.md', (route) => route.abort());

  const button = page.locator('.octo-copy-md');
  await button.click();

  await expect(button).toHaveAttribute('data-failed', '');
  await expect(button).not.toHaveAttribute('data-copied', '');
});

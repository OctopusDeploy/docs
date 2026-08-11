import { test, expect } from '@playwright/test';

// Both buttons run on copy-button.js, so a break in one is a break in both.
const PAGE = '/docs/kubernetes/steps/kustomize';

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

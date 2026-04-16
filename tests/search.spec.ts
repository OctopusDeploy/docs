import { expect, test } from '@playwright/test';

async function search(page: Parameters<typeof test>[0]['page'], query: string) {
  await page.goto('/docs/');

  const input = page.locator('[data-site-search-query]').first();
  await input.click();
  await input.pressSequentially(query);

  await expect
    .poll(async () =>
      page.locator('.site-search-results__item .result-wrapper').count()
    )
    .toBeGreaterThan(0);
}

test.describe('docs search', () => {
  test('renders in-page search results', async ({ page }) => {
    await search(page, 'variables');

    const firstResult = page.locator(
      '.site-search-results__item .result-wrapper'
    ).first();

    await expect(firstResult).toHaveAttribute('href', /\/docs\//);
    await expect(page.locator('.result-description').first()).not.toBeEmpty();
  });

  test('prefers tenant variable docs over REST API pages', async ({ page }) => {
    await search(page, 'tenant variables');

    const firstHref = await page
      .locator('.site-search-results__item .result-wrapper')
      .first()
      .getAttribute('href');

    expect(firstHref).not.toContain('/octopus-rest-api/');
  });

  test('treats dotted executable names as command queries', async ({ page }) => {
    await search(page, 'octopus.server.exe');

    const firstHref = await page
      .locator('.site-search-results__item .result-wrapper')
      .first()
      .getAttribute('href');

    expect(firstHref).toContain('/octopus-rest-api/octopus.server.exe-command-line/');
  });
});

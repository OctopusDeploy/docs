import { test, expect } from '@playwright/test';

// A generated endpoint page. src/layouts/Api.astro was forked from
// Default.astro and has drifted from it before, so these pin the pieces of the
// chrome that the fork is meant to keep in step.
const ENDPOINTS = '/docs/api/feeds';

test.describe('api page chrome', () => {
  test('the breadcrumb trail names the section it is in', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const crumbs = page.locator('nav[aria-label="Breadcrumb"] li');
    await expect(crumbs).toHaveText(['Docs', 'Api', 'Feeds']);

    // Nothing to link to until the section has a landing page, so the Api
    // crumb is text rather than a link to a 404.
    await expect(crumbs.nth(1).locator('a')).toHaveCount(0);
  });

  test('the breadcrumb trail is published as JSON-LD, not microdata', async ({
    page,
  }) => {
    await page.goto(ENDPOINTS);

    const graph = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText()
    )['@graph'];
    const list = graph.find((node) => node['@type'] === 'BreadcrumbList');

    expect(list.itemListElement.map((item) => item.name)).toEqual([
      'Docs',
      'Api',
      'Feeds',
    ]);
    // The last crumb is the page itself and the Api crumb has no page, so only
    // the first carries a URL.
    expect(list.itemListElement.map((item) => item.item ?? null)).toEqual([
      expect.stringContaining('/docs'),
      null,
      null,
    ]);

    // Default.astro dropped microdata for JSON-LD; the fork follows.
    await expect(page.locator('[itemscope], [itemprop]')).toHaveCount(0);
  });

  test('the header search field opens the site overlay', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const overlay = page.locator('[data-docs-search="site"]');
    await expect(overlay).toHaveCount(1);

    // Both navs render on every page and one is hidden with CSS, so the
    // trigger has to be picked by what is on screen.
    await page
      .locator('input[data-docs-search-trigger]:visible')
      .first()
      .click();
    await expect(overlay).toBeVisible();
  });

  test('the section is kept out of the search index and the sitemap', async ({
    page,
    request,
  }) => {
    // Temporary, alongside src/lib/underConstruction.ts - delete with it when
    // the API reference goes live.
    //
    // Asked through the overlay rather than of an index file. This used to read
    // /docs/search.json, which no longer exists, and the two search engines ship
    // indexes of different shapes — one JSON, one a directory of compressed
    // chunks. What has to hold is the same either way: a reader searching a word
    // the API reference is full of must not be sent into it.
    await page.goto('/docs/');
    await page
      .locator('input[data-docs-search-trigger]:visible')
      .first()
      .click();
    await page.locator('[data-docs-search-input]').fill('accounts');

    // `accounts` is deliberate: it names pages in the API reference *and* pages
    // outside it, so the list is never empty. A query that matched nothing would
    // pass this test without proving anything.
    const results = page.locator('[data-docs-search-results] [role="option"]');
    await expect(results.first()).toBeVisible({ timeout: 30_000 });

    const hrefs = await results.evaluateAll((rows) =>
      rows.map((row) => row.getAttribute('href') ?? '')
    );
    expect(hrefs.filter((href) => href.includes('/docs/api/'))).toEqual([]);

    const sitemap = await (await request.get('/docs/sitemap.xml')).text();
    expect(sitemap).not.toContain('/docs/api/');
  });

  test('the pages Astro does not route are not published', async ({
    request,
  }) => {
    for (const url of ['/docs/api/', '/docs/api/README', '/docs/api/index']) {
      expect((await request.get(url)).status(), url).toBe(404);
    }
  });
});

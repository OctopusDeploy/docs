import { test, expect } from '@playwright/test';

// A generated endpoint page. src/layouts/Api.astro was forked from
// Default.astro and has drifted from it before, so these pin the pieces of the
// chrome that the fork is meant to keep in step.
const ENDPOINTS = '/docs/api/feeds';

test.describe('api page chrome', () => {
  test('the breadcrumb trail names the section it is in', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const crumbs = page.locator('nav[aria-label="Breadcrumb"] li');
    await expect(crumbs).toHaveText(['Docs', 'API', 'Feeds']);

    // The section has a landing page of its own, and the crumb links to it.
    // "API" rather than that page's own title, which is a `crumbTitle` on it.
    await expect(crumbs.nth(1).locator('a')).toHaveAttribute(
      'href',
      /\/docs\/api\/?$/
    );
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
      'API',
      'Feeds',
    ]);
    // The last crumb is the page itself, so it is the only one without a URL.
    expect(list.itemListElement.map((item) => item.item ?? null)).toEqual([
      expect.stringContaining('/docs'),
      expect.stringContaining('/docs/api'),
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
    // Asked through the overlay rather than of an index file, because the index
    // is now a directory of compressed chunks. What has to hold: a reader
    // searching a word the API reference is full of must not be sent into it.
    await page.goto('/docs/');
    await page
      .locator('input[data-docs-search-trigger]:visible')
      .first()
      .click();
    await page.locator('[data-docs-search-input]').fill('accounts');

    // The href assertion below passes on an empty list, so the visibility check
    // is what makes this test mean anything. `accounts` names pages in the API
    // reference *and* pages outside it, which is what keeps the list non-empty.
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
    // The section's own landing page is routed, and so is every generated page
    // - but from /docs/api, not from the folder it is written into.
    expect((await request.get('/docs/api/')).status()).toBe(200);
    expect((await request.get('/docs/api/channels')).status()).toBe(200);

    for (const url of ['/docs/api/_generated/channels', '/docs/api/README']) {
      expect((await request.get(url)).status(), url).toBe(404);
    }
  });
});

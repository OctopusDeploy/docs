import { test, expect } from '@playwright/test';

// A generated endpoint page
const ENDPOINTS = '/docs/api/feeds';

// The one page with deprecated endpoints on it
const DEPRECATED = '/docs/api/channels';
const DEPRECATED_HEADING = 'Get a list of Channels';

// `:endpoint{method="GET" path="..."}` is written by the generator and rendered
// by plugins/satteri-endpoint.js at build time, so it has to survive without
// scripting.
test.describe('endpoint directive, no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('renders the method as a badge beside the route', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const endpoint = page.locator('.api-endpoint').first();
    await expect(endpoint).toHaveAttribute('data-method', 'get');
    await expect(endpoint.locator('.api-get')).toHaveText('GET');

    // The braces of a route template are escaped in the directive, because the
    // parser would otherwise end the attribute block on the first one. They
    // have to arrive unescaped.
    await expect(endpoint.locator('code')).toHaveText('/api/{spaceId}/feeds');
  });

  test('leaves no directive of its own on the page', async ({ page }) => {
    await page.goto(ENDPOINTS);

    // What the generic directive handler would have rendered it as
    await expect(page.locator('endpoint')).toHaveCount(0);
  });

  test('states the method the left nav badges each row with', async ({
    page,
  }) => {
    await page.goto(ENDPOINTS);

    // One endpoint per section, and one badge per endpoint: the nav is built
    // from the directive rather than inferred from the markup around it.
    const endpoints = page.locator('.api-endpoint');
    const count = await page.locator('section.api-section').count();
    expect(count).toBeGreaterThan(0);
    await expect(endpoints).toHaveCount(count);
    await expect(
      page.locator('.site-nav__link--heading .api-icon-only')
    ).toHaveCount(count);
  });

  test('flags a deprecated endpoint on the line and in the nav', async ({
    page,
  }) => {
    await page.goto(DEPRECATED);

    // The page documents the same operation twice, once per route, and only
    // the older of the two is deprecated - so the section is found by the flag
    // rather than by its heading.
    const section = page.locator('section.api-section', {
      has: page.locator('.api-endpoint[data-deprecated="true"]'),
    });
    await expect(section.first().locator('> h2')).toHaveText(
      DEPRECATED_HEADING
    );

    // The flag marks the endpoint; the wording stays in its own warning block
    await expect(section.first().locator('.warning')).toContainText(
      'Deprecated.'
    );

    // Marked in the nav, and only where it is marked on the page
    const flagged = await page.locator('[data-deprecated="true"]').count();
    expect(flagged).toBeGreaterThan(0);
    await expect(page.locator('.site-nav__link--deprecated')).toHaveCount(
      flagged
    );
    expect(flagged).toBeLessThan(await page.locator('.api-endpoint').count());
  });
});

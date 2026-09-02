import { test, expect } from '@playwright/test';

// A generated endpoint page: every section has a request line, most have a
// response example, and the first one has both
const ENDPOINTS = '/docs/api/environments';

// The one page whose only endpoint documents no example, so the examples column
// has nothing to hold
const NO_EXAMPLES = '/docs/api/azure-dev-ops';

// Below the breakpoint in api.css, where the two columns stack
const NARROW = { width: 1100, height: 900 };

// The layout is built at build time by plugins/satteri-api-examples.js, so it
// has to survive without scripting.
test.describe('api example, no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('splits an endpoint into a heading, a body and an examples column', async ({
    page,
  }) => {
    await page.goto(ENDPOINTS);

    const section = page.locator('section.api-section').first();
    await expect(section.locator('> h2')).toHaveText(
      'Get a list of Environments'
    );
    await expect(section.locator('> .api-section__body')).toHaveCount(1);
    await expect(section.locator('> .api-section__examples')).toHaveCount(1);

    // The request line stays with the prose; the example does not
    await expect(section.locator('.api-section__body')).toContainText(
      '/api/{spaceId}/environments'
    );
    await expect(
      section.locator('.api-section__body .api-example')
    ).toHaveCount(0);
  });

  test('renders the directive as a labelled, highlighted block', async ({
    page,
  }) => {
    await page.goto(ENDPOINTS);

    const example = page
      .locator('.api-section__examples .api-example[data-example="Response"]')
      .first();
    const block = example.locator('.code-block');

    // The label the directive names the payload with, on the code block's own
    // header rather than a second one above it
    await expect(block.locator('.code-block__label')).toHaveText(
      'Example Response'
    );
    await expect(block.locator('.code-block__label')).toBeVisible();
    await expect(example.locator('.code-block')).toHaveCount(1);

    // The body of the directive is left to the normal pipeline, so the fence is
    // highlighted and named like any other on the site
    await expect(block.locator('.code-block__language')).toHaveText('JSON');
    expect(
      await block.locator('pre.astro-code .line span').count()
    ).toBeGreaterThan(0);
    await expect(block.locator('pre.astro-code')).toHaveAttribute(
      'data-language',
      'json'
    );
  });

  test('leaves no directive of its own on the page', async ({ page }) => {
    await page.goto(ENDPOINTS);

    // Neither the unrendered source nor the tag the generic directive handler
    // would emit if this one had not claimed the name first
    await expect(page.locator('api-example')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(':::api-example');
    await expect(page.locator('body')).not.toContainText('<div data-example');
  });

  test('every endpoint on the page becomes a section', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const sections = page.locator('section.api-section');
    const headings = page.locator('.page-content h2');

    expect(await sections.count()).toBeGreaterThan(1);
    expect(await headings.count()).toBe(await sections.count());

    // Nothing is left loose beside them
    await expect(page.locator('.page-content > .api-example')).toHaveCount(0);
  });

  test('omits the examples column from an endpoint with no example', async ({
    page,
  }) => {
    await page.goto(NO_EXAMPLES);

    const section = page.locator('section.api-section');
    await expect(section).toHaveCount(1);
    await expect(section.locator('.api-section__body')).toBeVisible();

    // Left out rather than left empty
    await expect(section.locator('.api-section__examples')).toHaveCount(0);
  });

  test('badges the nav with the method of each endpoint', async ({ page }) => {
    await page.goto(ENDPOINTS);

    const links = page.locator('.site-nav__link--heading');
    const sections = page.locator('section.api-section');
    expect(await links.count()).toBe(await sections.count());

    // One badge per endpoint, read off the request line under its heading
    const first = links.first();
    await expect(first.locator('.api-get.api-icon-only')).toHaveAttribute(
      'aria-label',
      'Get'
    );
    await expect(first).toContainText('Get a list of Environments');
    await expect(
      page.locator('.site-nav__link--heading .api-icon-only')
    ).toHaveCount(await sections.count());
  });

  test('puts the example beside its endpoint, and under it when narrow', async ({
    page,
  }) => {
    await page.goto(ENDPOINTS);

    const section = page.locator('section.api-section').first();
    const body = section.locator('.api-section__body');
    const examples = section.locator('.api-section__examples');

    const beside = {
      body: (await body.boundingBox())!,
      examples: (await examples.boundingBox())!,
    };
    expect(beside.examples.x).toBeGreaterThan(
      beside.body.x + beside.body.width - 1
    );

    await page.setViewportSize(NARROW);

    const stacked = {
      body: (await body.boundingBox())!,
      examples: (await examples.boundingBox())!,
    };
    expect(stacked.examples.y).toBeGreaterThan(
      stacked.body.y + stacked.body.height - 1
    );
  });
});

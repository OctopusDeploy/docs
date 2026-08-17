import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// The gallery renders a second, fixture-backed overlay alongside the page's own,
// so the results under test are fixed and no search index is fetched.
const PAGE = '/components';

const overlay = (page: Page) => page.locator('[data-docs-search="demo"]');
const siteOverlay = (page: Page) => page.locator('[data-docs-search="site"]');

async function opened(page: Page) {
  const demo = overlay(page);
  await page.locator('[data-docs-search-trigger="demo"]').click();
  await expect(demo).toBeVisible();
  return demo;
}

test('the overlay is closed until a trigger opens it', async ({ page }) => {
  await page.goto(PAGE);

  await expect(overlay(page)).toBeHidden();

  await opened(page);

  await expect(overlay(page).locator('[data-docs-search-input]')).toBeFocused();
});

// Two overlays on one page is the case the gallery creates; the site's own must
// not answer a trigger naming the demo.
test('a trigger opens only the overlay it names', async ({ page }) => {
  await page.goto(PAGE);

  await opened(page);

  await expect(siteOverlay(page)).toBeHidden();
});

test('the tab strip and results appear once there is a query', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await expect(demo.locator('[data-docs-search-tabs]')).toBeHidden();
  await expect(demo.locator('[data-docs-search-body]')).toBeHidden();

  await demo.locator('[data-docs-search-input]').fill('feed');

  await expect(demo.locator('[role="option"]')).toHaveCount(4);
  await expect(demo.locator('[data-docs-search-tabs]')).toBeVisible();
});

// Focus stays in the input the whole time, so `aria-activedescendant` is the only
// thing saying where Enter will go.
test('the arrow keys move the active result without moving focus', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);
  const input = demo.locator('[data-docs-search-input]');

  await input.fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-1'
  );
  await expect(input).toBeFocused();

  await page.keyboard.press('ArrowUp');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  // Up off the first result comes round to the last, and down off the last comes
  // back to the first.
  await page.keyboard.press('ArrowUp');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-3'
  );
  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  await page.keyboard.press('End');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-3'
  );
  await page.keyboard.press('Home');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  // Exactly one result carries the state at a time.
  await expect(demo.locator('[role="option"][data-active]')).toHaveCount(1);
});

test('Enter follows the active result', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(
    /\/docs\/deployments\/packages\/feeds\/maven-feeds$/
  );
});

test('a tab narrows the results to its own section', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  // A section the query misses has no tab at all.
  const tabs = demo.locator('[data-facet]:not([hidden])');
  await expect(tabs).toHaveText(['All (4)', 'Docs (2)', 'API (1)', 'CLI (1)']);

  await demo.locator('[data-facet="cli"]').click();

  await expect(demo.locator('[role="option"]')).toHaveCount(1);
  await expect(demo.locator('.docs-search__row-title')).toHaveText(
    'octopus feed list'
  );
});

test('a query with no results says so', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('nothingmatchesthis');

  await expect(demo.locator('[role="option"]')).toHaveCount(0);
  await expect(demo.locator('[data-docs-search-empty]')).toBeVisible();
  await expect(demo.locator('[data-docs-search-echo]')).toHaveText(
    'nothingmatchesthis'
  );
});

test('Escape closes the overlay and returns focus to the trigger', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await page.keyboard.press('Escape');

  await expect(demo).toBeHidden();
  await expect(page.locator('[data-docs-search-trigger="demo"]')).toBeFocused();
});

test('the close button closes the overlay', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-close]').click();

  await expect(demo).toBeHidden();
});

// A modal dialog fills the viewport, so the area around the panel is the dialog
// itself rather than the page behind it.
test('a click outside the panel closes the overlay', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.click({ position: { x: 8, y: 8 } });

  await expect(demo).toBeHidden();
});

// Both navs render on every page and one is hidden with CSS, so a trigger has to
// be picked by what is on screen rather than by document order.
const navField = (page: Page) =>
  page.locator('input[data-docs-search-trigger]:visible').first();

test('the query is left in the field that opened the overlay', async ({
  page,
}) => {
  await page.goto(PAGE);

  const trigger = navField(page);
  await trigger.click();

  const site = siteOverlay(page);
  await expect(site).toBeVisible();
  await site.locator('[data-docs-search-input]').fill('tentacle');
  await page.keyboard.press('Escape');

  await expect(site).toBeHidden();
  await expect(trigger).toHaveValue('tentacle');
});

// The index stores absolute production URLs. A result that keeps one sends you
// from an ephemeral environment or localhost straight to octopus.com, which is
// exactly what happened the first time this shipped.
test('results stay on the host that served them', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('tentacle');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  const hrefs = await site
    .locator('[role="option"]')
    .evaluateAll((rows) => rows.map((row) => row.getAttribute('href') ?? ''));

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href, 'a result href must be a path, not an absolute URL').toMatch(
      /^\/docs\//
    );
  }
});

// Ctrl/Cmd+K belongs to the page's own search. A demo instance in an article must
// not answer it.
test('the keyboard shortcut opens the site overlay', async ({ page }) => {
  await page.goto(PAGE);

  const shortcut = process.platform === 'darwin' ? 'Meta+k' : 'Control+k';
  await page.keyboard.press(shortcut);

  await expect(siteOverlay(page)).toBeVisible();
  await expect(overlay(page)).toBeHidden();
});

// Typing in the nav field should not be swallowed by the hand-off.
test('a character typed in the trigger carries into the overlay', async ({
  page,
}) => {
  await page.goto(PAGE);

  const trigger = navField(page);
  await trigger.focus();
  await page.keyboard.press('a');

  const site = siteOverlay(page);
  await expect(site).toBeVisible();
  await expect(site.locator('[data-docs-search-input]')).toHaveValue('a');
});

// A design system asset is drawn in `currentColor`, so handing one to an `<img>`
// leaves it black in both themes. Masking it is what lets it take a themed color.
test('result icons are masked so they theme', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  const paint = await demo
    .locator('.docs-search__row-icon')
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el);
      return { mask: style.maskImage, background: style.backgroundColor };
    });

  expect(paint.mask, 'the icon should be masked').toContain('url(');
  expect(
    paint.background,
    'an unpainted icon means no color reached it'
  ).not.toBe('rgba(0, 0, 0, 0)');
});

// Astro scopes a component's styles to the markup it can see at build time, so a
// row built in script comes out unstyled unless it is cloned from the template.
test('results are laid out, not bare markup', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await expect(demo.locator('[role="option"]').first()).toHaveCSS(
    'display',
    'grid'
  );
});

for (const width of [1440, 768, 320]) {
  test(`the panel stays on screen at ${width}px wide`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(PAGE);
    const demo = await opened(page);

    await demo.locator('[data-docs-search-input]').fill('feed');
    await expect(demo.locator('[role="option"]')).toHaveCount(4);

    const box = (await demo.locator('.docs-search__panel').boundingBox())!;
    const viewport = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(
      Math.round(box.x),
      'panel should not run off the start edge'
    ).toBeGreaterThanOrEqual(0);
    expect(
      Math.round(box.x + box.width),
      'panel should not run off the end edge'
    ).toBeLessThanOrEqual(viewport.client);
    expect(
      viewport.scroll,
      'an open overlay should not force a horizontal scrollbar'
    ).toBeLessThanOrEqual(viewport.client);
  });
}

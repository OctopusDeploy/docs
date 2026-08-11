import { test, expect } from '@playwright/test';

// The component gallery is where SplitButton is rendered on its own, away from
// whatever page happens to use it.
const PAGE = '/components';

test('the menu is closed until the caret is clicked', async ({ page }) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  const options = menu.locator('.split-btn__options');

  await expect(options).toBeHidden();

  await menu.locator('[data-split-trigger]').click();

  await expect(options).toBeVisible();
  await expect(options.locator('.split-btn__option')).toHaveCount(2);
});

test('the caret has an accessible name of its own', async ({ page }) => {
  await page.goto(PAGE);

  const trigger = page.locator('[data-split-trigger]').first();

  await expect(trigger).toHaveAccessibleName('Open in another assistant');
});

test('Escape closes the menu and returns focus to the caret', async ({
  page,
}) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  const trigger = menu.locator('[data-split-trigger]');

  await trigger.click();
  await expect(menu.locator('.split-btn__options')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(menu.locator('.split-btn__options')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('a click outside closes the menu', async ({ page }) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();

  await menu.locator('[data-split-trigger]').click();
  await expect(menu.locator('.split-btn__options')).toBeVisible();

  await page.locator('h1').first().click();

  await expect(menu.locator('.split-btn__options')).toBeHidden();
});

test('each menu opens independently of the others', async ({ page }) => {
  await page.goto(PAGE);

  const menus = page.locator('[data-split-menu]');
  await expect(menus).toHaveCount(2);

  await menus.nth(1).locator('[data-split-trigger]').click();

  await expect(menus.nth(1).locator('.split-btn__options')).toBeVisible();
  await expect(menus.nth(0).locator('.split-btn__options')).toBeHidden();
});

// A guard that the menu is never positioned off the page. The gallery gives the
// control a wide column to sit at the start of, so it has room on both sides at
// every width and the flip-to-the-other-side fallback is not what is under test
// here; that needs a layout which crowds one side, so it belongs with whichever
// page puts the control at the end of a row.
for (const width of [1200, 700, 430]) {
  test(`the open menu stays on screen at ${width}px wide`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(PAGE);

    const menu = page.locator('[data-split-menu]').first();
    await menu.locator('[data-split-trigger]').click();

    const options = menu.locator('.split-btn__options');
    await expect(options).toBeVisible();

    const box = (await options.boundingBox())!;
    const viewport = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(
      Math.round(box.x),
      'menu should not run off the start edge'
    ).toBeGreaterThanOrEqual(0);
    expect(
      Math.round(box.x + box.width),
      'menu should not run off the end edge'
    ).toBeLessThanOrEqual(viewport.client);
    expect(
      viewport.scroll,
      'an open menu should not force a horizontal scrollbar'
    ).toBeLessThanOrEqual(viewport.client);
  });
}

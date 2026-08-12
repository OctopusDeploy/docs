import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

// The component gallery is where SplitButton is rendered on its own, away from
// whatever page happens to use it.
const PAGE = '/components';

// The menu scales as it opens, so a box measured before that finishes is the
// box part way through the animation rather than the one being asserted on.
async function opened(options: Locator) {
  await expect(options).toBeVisible();
  await options.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished))
  );
}

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

// A menu left open behind the reader is one the page keeps positioning against a
// button they have moved on from, which is how it ends up stranded mid-page once
// they scroll.
test('tabbing off the menu closes it', async ({ page }) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  const options = menu.locator('.split-btn__options');

  await menu.locator('[data-split-trigger]').click();
  await expect(options).toBeVisible();

  // The items are out of the tab order, so one press leaves the whole control
  // rather than walking the menu.
  await page.keyboard.press('Tab');

  await expect(options).toBeHidden();
});

// The design system's menu holds the page still while it is open. This one lets
// the page move and closes instead, so the list is never left adrift of the
// button it hangs off, which is what happens if it is allowed to stay.
test('scrolling the page closes the menu', async ({ page }) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  const options = menu.locator('.split-btn__options');

  // Keyed onto an item first: focus inside the menu is what kept it alive.
  await menu.locator('[data-split-trigger]').focus();
  await page.keyboard.press('ArrowDown');
  await expect(options).toBeVisible();
  await expect(options.locator('[role="menuitem"]').first()).toBeFocused();

  await page.mouse.wheel(0, -800);

  await expect(options).toBeHidden();
});

// The items are reached with the arrow keys instead, which is what the design
// system's menu does and what the roles the list carries promise.
test('the arrow keys open the menu and move between its items', async ({
  page,
}) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  const options = menu.locator('.split-btn__options');
  const items = options.locator('[role="menuitem"]');

  await menu.locator('[data-split-trigger]').focus();
  await page.keyboard.press('ArrowDown');

  await expect(options).toBeVisible();
  await expect(items.first()).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect(items.nth(1)).toBeFocused();

  // Past the last item comes back to the first, and back again to the last.
  await page.keyboard.press('ArrowDown');
  await expect(items.first()).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(items.nth(1)).toBeFocused();

  await page.keyboard.press('Home');
  await expect(items.first()).toBeFocused();
  await page.keyboard.press('End');
  await expect(items.nth(1)).toBeFocused();
});

test('each menu opens independently of the others', async ({ page }) => {
  await page.goto(PAGE);

  const menus = page.locator('[data-split-menu]');
  await expect(menus).toHaveCount(2);

  await menus.nth(1).locator('[data-split-trigger]').click();

  await expect(menus.nth(1).locator('.split-btn__options')).toBeVisible();
  await expect(menus.nth(0).locator('.split-btn__options')).toBeHidden();
});

// A design system asset is drawn in `currentColor`, so handing one to an `<img>`
// leaves it black in both themes. Masking it is what lets it take the color the
// menu item carries.
test('menu item icons take the color of the item they sit in', async ({
  page,
}) => {
  await page.goto(PAGE);

  const menu = page.locator('[data-split-menu]').first();
  await menu.locator('[data-split-trigger]').click();

  const icon = menu.locator('.split-btn__option-icon').first();
  await expect(icon).toBeVisible();

  const paint = await icon.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      mask: style.maskImage,
      background: style.backgroundColor,
      color: style.color,
    };
  });

  expect(paint.mask, 'the icon should be masked').toContain('url(');
  expect(paint.background, 'the mask should take the item color').toBe(
    paint.color
  );
  expect(paint.background, 'a black icon means it took no color').not.toBe(
    'rgb(0, 0, 0)'
  );
});

// An anchor name is page-wide unless it is scoped, and an unscoped one leaves
// every menu on the page hanging off the last control that declared it. The test
// above cannot see that: both menus still open and close on their own.
test('each menu hangs off the control it belongs to', async ({ page }) => {
  await page.goto(PAGE);

  const controls = page.locator('.split-btn');
  await expect(controls).toHaveCount(2);

  for (const index of [0, 1]) {
    const control = controls.nth(index);
    const options = control.locator('.split-btn__options');

    await control.locator('[data-split-trigger]').click();
    await opened(options);

    const half = (await control.locator('[data-split-trigger]').boundingBox())!;
    const menu = (await options.boundingBox())!;

    // The design hangs the list from the menu half, so its start edge lines up
    // with that half's; a viewport too narrow for it flips it to the end edge.
    const alignment = Math.min(
      Math.abs(menu.x - half.x),
      Math.abs(menu.x + menu.width - (half.x + half.width))
    );

    expect(
      Math.round(alignment),
      `menu ${index} should line up with its own menu half`
    ).toBeLessThanOrEqual(1);

    await page.keyboard.press('Escape');
    await expect(options).toBeHidden();
  }
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
    await opened(options);

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

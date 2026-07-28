import { test, expect, type Page } from '@playwright/test';

const home = '/docs/';
const otherPage = '/docs/getting-started/';

const headerInput = '#theme-switcher';
const headerLabel = 'label[for="theme-switcher"]';
const mobileInput = '#theme-switcher-mobile';
const slider = '#theme-switcher ~ .theme-switcher__label .switch-slider';

function theme(page: Page) {
  return page.locator('html').getAttribute('data-theme');
}

function preference(page: Page) {
  return page.locator('html').getAttribute('data-theme-preference');
}

function sliderTransform(page: Page) {
  return page.locator(slider).evaluate((el) => getComputedStyle(el).transform);
}

test.describe('theme', () => {
  test.describe('with a dark OS preference', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      expect(await theme(page)).toBe('dark');
      expect(await preference(page)).toBe('system');
      await expect(page.locator(headerInput)).toBeChecked();
    });

    test('an explicit choice wins and survives navigation', async ({
      page,
    }) => {
      await page.goto(home);
      await page.locator(headerLabel).click();

      expect(await theme(page)).toBe('light');
      expect(await preference(page)).toBe('light');

      await page.goto(otherPage);
      expect(await theme(page)).toBe('light');
      await expect(page.locator(headerInput)).not.toBeChecked();
    });

    test('falls back to the OS when storage throws', async ({ page }) => {
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new Error('storage blocked');
          },
        });
      });
      await page.goto(home);

      expect(await theme(page)).toBe('dark');

      // Still usable for the life of the page, just not persisted.
      await page.locator(headerLabel).click();
      expect(await theme(page)).toBe('light');
    });
  });

  test.describe('with a light OS preference', () => {
    test.use({ colorScheme: 'light' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      expect(await theme(page)).toBe('light');
      await expect(page.locator(headerInput)).not.toBeChecked();
    });

    test('both switchers stay in sync', async ({ page }) => {
      await page.goto(home);

      await page.locator(headerLabel).click();
      expect(await theme(page)).toBe('dark');
      await expect(page.locator(headerInput)).toBeChecked();
      await expect(page.locator(mobileInput)).toBeChecked();

      await page.locator(headerLabel).click();
      expect(await theme(page)).toBe('light');
      await expect(page.locator(mobileInput)).not.toBeChecked();
    });

    test('is operable by keyboard', async ({ page }) => {
      await page.goto(home);

      await page.locator(headerInput).focus();
      await page.keyboard.press('Space');

      expect(await theme(page)).toBe('dark');
    });
  });

  // Regression guard: the knob used to be driven by a JS-applied class, so it
  // painted on the light side and slid across after hydration. Driving it from
  // data-theme means the attribute alone decides the position.
  test('the knob position is driven by data-theme, not by script', async ({
    page,
  }) => {
    await page.goto(home);

    // Polled because the slider transitions between the two positions.
    await page.evaluate(() =>
      document.documentElement.setAttribute('data-theme', 'dark')
    );
    await expect.poll(() => sliderTransform(page)).not.toBe('none');

    await page.evaluate(() =>
      document.documentElement.setAttribute('data-theme', 'light')
    );
    await expect.poll(() => sliderTransform(page)).toBe('none');
  });
});

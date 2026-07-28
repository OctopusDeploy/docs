import { test, expect, type Page } from '@playwright/test';

const home = '/docs/';
const otherPage = '/docs/getting-started/';

const headerInput = '#theme-switcher';
const headerLabel = 'label[for="theme-switcher"]';
const mobileInput = '#theme-switcher-mobile';
const slider = '#theme-switcher ~ .theme-switcher__label .switch-slider';

// Auto-retrying so a slow style/attribute write can never make these flaky.
function expectTheme(page: Page, value: string) {
  return expect(page.locator('html')).toHaveAttribute('data-theme', value);
}

function expectPreference(page: Page, value: string) {
  return expect(page.locator('html')).toHaveAttribute(
    'data-theme-preference',
    value
  );
}

function sliderTransform(page: Page) {
  return page.locator(slider).evaluate((el) => getComputedStyle(el).transform);
}

test.describe('theme', () => {
  test.describe('with a dark OS preference', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      await expectTheme(page, 'dark');
      await expectPreference(page, 'system');
      await expect(page.locator(headerInput)).toBeChecked();
    });

    test('an explicit choice wins and survives navigation', async ({
      page,
    }) => {
      await page.goto(home);
      await page.locator(headerLabel).click();

      await expectTheme(page, 'light');
      await expectPreference(page, 'light');

      await page.goto(otherPage);
      await expectTheme(page, 'light');
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

      await expectTheme(page, 'dark');

      // Still usable for the life of the page, just not persisted.
      await page.locator(headerLabel).click();
      await expectTheme(page, 'light');
    });
  });

  test.describe('with a light OS preference', () => {
    test.use({ colorScheme: 'light' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      await expectTheme(page, 'light');
      await expect(page.locator(headerInput)).not.toBeChecked();
    });

    test('both switchers stay in sync', async ({ page }) => {
      await page.goto(home);

      await page.locator(headerLabel).click();
      await expectTheme(page, 'dark');
      await expect(page.locator(headerInput)).toBeChecked();
      await expect(page.locator(mobileInput)).toBeChecked();

      await page.locator(headerLabel).click();
      await expectTheme(page, 'light');
      await expect(page.locator(mobileInput)).not.toBeChecked();
    });

    // Space is the native checkbox key; Enter is optional for role="switch"
    // but the control supported it before, so both have to keep working.
    for (const key of ['Space', 'Enter']) {
      test(`is operable with ${key}`, async ({ page }) => {
        await page.goto(home);
        await page.locator(headerInput).focus();

        await page.keyboard.press(key);
        await expectTheme(page, 'dark');
        await expect(page.locator(headerInput)).toBeChecked();

        await page.keyboard.press(key);
        await expectTheme(page, 'light');
        await expect(page.locator(headerInput)).not.toBeChecked();
      });
    }
  });

  // The design token stylesheets define their custom properties only under
  // [data-theme='light'] / [data-theme='dark'] and nothing at :root, so a page
  // with no attribute resolves no tokens at all. The server-rendered default in
  // layouts/Default.astro is what keeps that from happening without scripting.
  test.describe('with scripting disabled', () => {
    test.use({ javaScriptEnabled: false });

    test('still carries a data-theme for the tokens to key off', async ({
      page,
    }) => {
      await page.goto(home);

      await expectTheme(page, 'light');
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

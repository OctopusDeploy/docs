import { test, expect, type Page } from '@playwright/test';

const home = '/docs/';
const otherPage = '/docs/getting-started/';

const toggle = '.top-nav__trailing [data-theme-toggle-button]';
const toggleIcon = `${toggle} .btn__icon`;
const drawerToggleIcon = '.top-nav__drawer-theme .btn__icon';

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

function expectToggleOffers(page: Page, theme: string) {
  return expect(page.locator(toggleIcon)).toHaveClass(
    new RegExp(`theme-switcher__${theme === 'dark' ? 'moon' : 'sun'}_icon`)
  );
}

test.describe('theme', () => {
  test.describe('with a dark OS preference', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      await expectTheme(page, 'dark');
      await expectPreference(page, 'system');
      await expectToggleOffers(page, 'light');
    });

    test('an explicit choice wins and survives navigation', async ({
      page,
    }) => {
      await page.goto(home);
      await page.locator(toggle).click();

      await expectTheme(page, 'light');
      await expectPreference(page, 'light');

      await page.goto(otherPage);
      await expectTheme(page, 'light');
      await expectToggleOffers(page, 'dark');
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
      await page.locator(toggle).click();
      await expectTheme(page, 'light');
    });
  });

  test.describe('with a light OS preference', () => {
    test.use({ colorScheme: 'light' });

    test('follows the OS when nothing is stored', async ({ page }) => {
      await page.goto(home);

      await expectTheme(page, 'light');
      await expectToggleOffers(page, 'dark');
    });

    test('every switcher on the page stays in sync', async ({ page }) => {
      await page.goto(home);

      await page.locator(toggle).click();
      await expectTheme(page, 'dark');
      await expectToggleOffers(page, 'light');
      // The drawer's toggle is the one used when the page narrows.
      await expect(page.locator(drawerToggleIcon)).toHaveClass(
        /theme-switcher__sun_icon/
      );
    });
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
});

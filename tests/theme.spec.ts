import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

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

function iconMask(name: 'moon' | 'sun') {
  const svg = readFileSync(
    new URL(`../src/assets/icons/${name}.svg`, import.meta.url),
    'utf8'
  );
  const outline = svg.match(/ d="([^"]+)"/)![1].slice(0, 24);
  return outline.replace(/ /g, '%20').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function expectToggleOffers(page: Page, theme: string, icon = toggleIcon) {
  return expect(page.locator(icon)).toHaveCSS(
    'mask-image',
    new RegExp(iconMask(theme === 'dark' ? 'moon' : 'sun'))
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
      await expectToggleOffers(page, 'light', drawerToggleIcon);
    });
  });

  test.describe('before the deferred scripts load', () => {
    test.use({ colorScheme: 'dark' });

    test('the toggle already shows the resolved theme', async ({ page }) => {
      await page.route('**/_astro/*.js', (route) => route.abort());
      await page.goto(home);

      await expectTheme(page, 'dark');
      await expectToggleOffers(page, 'light');
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

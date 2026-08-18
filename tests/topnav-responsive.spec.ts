import { test, expect, type Page } from '@playwright/test';

const docsPage = '/docs/?newnav';
const sectionPage = '/docs/getting-started/?newnav';

const nav = '.top-nav';
const inlineLinks = `${nav} .top-nav__links`;
const sectionsTrigger = `${nav} .top-nav__sections summary`;
const sectionsList = `${nav} .top-nav__sections .menu__list`;
const toggle = '[data-top-nav-toggle]';
const panel = '[data-top-nav-panel]';
const search = `${panel} .top-nav-search`;
const drawerNav = `${panel} [data-top-nav-nav-slot] #site-nav`;
const drawerActions = `${panel} .top-nav__drawer-actions`;
const drawerTheme = `${panel} .top-nav__drawer-theme`;
const drawerProfile = `${panel} .top-nav__drawer-profile`;

const mobile = { width: 390, height: 844 };

async function signIn(
  page: Page,
  baseURL: string | undefined,
  user: Record<string, string>
) {
  await page.context().addCookies([
    {
      name: 'OctopusSignedInUser',
      value: encodeURIComponent(JSON.stringify(user)),
      url: new URL(docsPage, baseURL).toString(),
    },
  ]);
}

test.describe('top nav at narrow widths', () => {
  test.use({ viewport: mobile });

  test('collapses the bar to a logo, a sections menu, and one button', async ({
    page,
  }) => {
    await page.goto(docsPage);

    await expect(page.locator(`${nav} .top-nav__logo`)).toBeVisible();
    await expect(page.locator(sectionsTrigger)).toHaveText('Docs');
    await expect(page.locator(toggle)).toBeVisible();

    // Everything the bar can no longer fit has been moved into the drawer
    await expect(page.locator(inlineLinks)).toBeHidden();
    await expect(page.locator(search)).toBeHidden();
    await expect(page.locator(panel)).toBeHidden();
    await expect(
      page.locator(`${nav} .top-nav__trailing`).getByText('Start for free')
    ).toBeHidden();
  });

  test('does not overflow the viewport', async ({ page }) => {
    await page.goto(docsPage);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('the button opens a drawer holding search, the nav tree, and the footer', async ({
    page,
  }) => {
    await page.goto(docsPage);

    await expect(page.locator(toggle)).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    await page.locator(toggle).click();

    await expect(page.locator(toggle)).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(panel)).toBeVisible();
    await expect(page.locator(search)).toBeVisible();
    await expect(page.locator(drawerNav)).toBeVisible();
    await expect(page.locator(drawerTheme).getByText('Theme')).toBeVisible();

    // When signed out the action buttons are visible, not the profile
    await expect(page.locator(drawerActions)).toBeVisible();
    await expect(page.locator(drawerProfile)).toBeHidden();
  });

  test('keeps section rows expanding in place inside the drawer', async ({
    page,
  }) => {
    await page.goto(sectionPage);
    await page.locator(toggle).click();

    // Find a closed page section
    const groups = page.locator(`${drawerNav} details.site-nav__group`);
    const count = await groups.count();

    let closed = -1;
    for (let i = 0; i < count; i++) {
      if ((await groups.nth(i).getAttribute('open')) === null) {
        closed = i;
        break;
      }
    }

    expect(
      closed,
      'there should be a closed section to expand'
    ).toBeGreaterThan(-1);

    const group = groups.nth(closed);

    const label = group.locator('> summary > .site-nav__label');
    const name = await label.textContent();

    await expect(group).not.toHaveAttribute('open', '');
    await label.click();

    await expect(group).toHaveAttribute('open', '');
    await expect(group.locator('> .site-nav__list')).toBeVisible();
    await expect(label).toHaveText(name!);
  });

  test('checks the section the reader is in, in the sections menu', async ({
    page,
  }) => {
    await page.goto(docsPage);
    await page.locator(sectionsTrigger).click();

    await expect(page.locator(sectionsList)).toBeVisible();
    await expect(
      page.locator(`${sectionsList} [aria-current="page"]`)
    ).toHaveText('Docs');
    await expect(
      page.locator(`${sectionsList} [aria-current="page"] .top-nav__check-icon`)
    ).toBeVisible();
  });

  test('closes the drawer when Escape is pressed, hands focus back to the button', async ({
    page,
  }) => {
    await page.goto(docsPage);
    await page.locator(toggle).click();
    await expect(page.locator(panel)).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.locator(panel)).toBeHidden();
    await expect(page.locator(toggle)).toBeFocused();
  });

  test('shows the signed-in user account info in the drawer footer', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      email: 'jd@example.com',
    });
    await page.goto(docsPage);
    await page.locator(toggle).click();

    await expect(page.locator(drawerActions)).toBeHidden();
    await expect(page.locator(drawerProfile)).toBeVisible();
    await expect(
      page.locator(`${drawerProfile} .profile-menu__name`)
    ).toHaveText('John Doe');
    await expect(
      page.locator(`${drawerProfile} .profile-menu__email`)
    ).toHaveText('jd@example.com');

    const links = page.locator(`${drawerProfile} .menu__action`);
    await expect(links.first()).toBeHidden();

    await page.locator(`${drawerProfile} .profile-menu__row`).click();

    await expect(links.first()).toBeVisible();
    await expect(links).toHaveText([/Control Center/, /Profile/, /Sign out/]);
  });

  test('every account link in the drawer footer can be reached via keyboard', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      email: 'jd@example.com',
    });
    await page.goto(docsPage);
    await page.locator(toggle).click();

    const row = page.locator(`${drawerProfile} .profile-menu__row`);
    await row.focus();
    await page.keyboard.press('Enter');

    const links = page.locator(`${drawerProfile} .menu__action`);
    await expect(links.first()).toBeVisible();

    for (const label of ['Control Center', 'Profile', 'Sign out']) {
      await page.keyboard.press('Tab');
      await expect(links.filter({ hasText: label })).toBeFocused();
    }
  });

  test('keeps focus inside the drawer once the account menu is expanded', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      email: 'jd@example.com',
    });
    await page.goto(docsPage);
    await page.locator(toggle).click();
    await page.locator(`${drawerProfile} .profile-menu__row`).click();

    const row = page.locator(`${drawerProfile} .profile-menu__row`);
    await row.focus();

    for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');

    await expect(page.locator(toggle)).toBeFocused();
  });
});

test.describe('top nav across collapse width breakpoint', () => {
  test('moves the nav tree between the sidebar and the drawer', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(docsPage);

    const sidebar = page.locator('.content-group #site-nav');
    await expect(sidebar).toBeVisible();

    // Shrink the viewport...
    await page.setViewportSize(mobile);
    await expect(page.locator(drawerNav)).toHaveCount(1);
    await expect(page.locator('.content-group #site-nav')).toHaveCount(0);

    // ...then expand it again
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(sidebar).toBeVisible();
    await expect(page.locator('#site-nav')).toHaveCount(1);
  });
});

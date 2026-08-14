import { test, expect, type Page } from '@playwright/test';

const showcase = '/components';

const profile = '.top-nav-showcase .top-nav .profile-menu';
const trigger = `${profile} summary`;
const list = `${profile} .menu__list`;

async function signIn(
  page: Page,
  baseURL: string | undefined,
  user: Record<string, string>
) {
  await page.context().addCookies([
    {
      name: 'OctopusSignedInUser',
      value: encodeURIComponent(JSON.stringify(user)),
      url: new URL(showcase, baseURL).toString(),
    },
  ]);
}

async function signedIn(page: Page, baseURL: string | undefined) {
  await signIn(page, baseURL, {
    fullName: 'John Doe',
    email: 'jd@example.com',
  });
  await page.goto(showcase);
}

test('there is no profile menu until someone is signed in', async ({
  page,
}) => {
  await page.goto(showcase);

  await expect(page.locator(profile)).toBeHidden();
});

test('the avatar opens the menu', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);

  await expect(page.locator(list)).toBeHidden();

  await page.locator(trigger).click();

  const menu = page.locator(list);
  await expect(menu).toBeVisible();

  await expect(menu.locator('[data-user-details]')).toContainText('John Doe');
  await expect(menu.locator('[data-user-details]')).toContainText(
    'jd@example.com'
  );

  const items = menu.locator('[role="menuitem"]');
  await expect(items).toHaveText(['Control Center', 'Profile', 'Sign out']);
  await expect(items.nth(0)).toHaveAttribute(
    'href',
    'https://billing.octopus.com'
  );
  await expect(items.nth(1)).toHaveAttribute(
    'href',
    'https://id.octopus.com/profile'
  );
  await expect(items.nth(2)).toHaveAttribute(
    'href',
    'https://octopus.com/signout?ReturnUrl=/docs'
  );

  await expect(menu.locator('[role="separator"]')).toHaveCount(1);
});

test('the external links carry the external link indicator', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);
  await page.locator(trigger).click();

  const external1 = page.locator(`${list} [role="menuitem"]`).nth(0);
  await expect(external1.locator('.menu__icon')).toBeVisible();

  const external2 = page.locator(`${list} [role="menuitem"]`).nth(1);
  await expect(external2.locator('.menu__icon')).toBeVisible();

  const signOut = page.locator(`${list} [role="menuitem"]`).nth(2);
  await expect(signOut.locator('.menu__icon')).toHaveCount(0);
});

test('sign out is drawn as plain text rather than as a link', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);
  await page.locator(trigger).click();

  const paint = (item: number) =>
    page
      .locator(`${list} [role="menuitem"]`)
      .nth(item)
      .evaluate((el) => ({
        color: getComputedStyle(el).color,
        underline: getComputedStyle(el.querySelector('[data-menu-label]')!)
          .textDecorationLine,
      }));

  const controlCenter = await paint(0);
  expect(controlCenter.underline, 'an ordinary link row keeps its underline').toBe(
    'underline'
  );

  const signOut = await paint(2);
  expect(signOut.underline, 'sign out should not be underlined').toBe('none');
  expect(signOut.color, 'sign out should not take the link color').not.toBe(
    controlCenter.color
  );
});

test('the avatar initials are not underlined', async ({ page, baseURL }) => {
  await signedIn(page, baseURL);

  await expect(page.locator(trigger)).toHaveCSS('text-decoration-line', 'none');
});

test('the email line is dropped when there is no name', async ({
  page,
  baseURL,
}) => {
  await signIn(page, baseURL, { email: 'jd@example.com' });
  await page.goto(showcase);
  await page.locator(trigger).click();

  const details = page.locator(`${list} [data-user-details]`);

  await expect(details.locator('[data-menu-label]')).toHaveText(
    'jd@example.com'
  );

  // `displayName` falls back to the email when there is no name, so the email shouldn't be repeated
  await expect(details.locator('[data-menu-description]')).toBeHidden();
});

test('the escape key closes the menu and returns focus to the avatar', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);

  await page.locator(trigger).click();
  await expect(page.locator(list)).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.locator(list)).toBeHidden();
  await expect(page.locator(trigger)).toBeFocused();
});

test('the arrow keys open the menu and move between its items', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);

  const items = page.locator(`${list} [role="menuitem"]`);

  await page.locator(trigger).focus();
  await page.keyboard.press('ArrowDown');

  await expect(page.locator(list)).toBeVisible();
  await expect(items.first()).toBeFocused();

  await page.keyboard.press('End');
  await expect(items.nth(2)).toBeFocused();
});

test('the menu right edge lines up with the avatar right edge', async ({
  page,
  baseURL,
}) => {
  await signedIn(page, baseURL);

  await page.locator(trigger).click();

  const menu = page.locator(list);
  await expect(menu).toBeVisible();
  await menu.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished))
  );

  const avatar = (await page.locator(trigger).boundingBox())!;
  const box = (await menu.boundingBox())!;

  expect(Math.round(box.width)).toBe(256);
  expect(
    Math.round(box.x + box.width - (avatar.x + avatar.width)),
    "the menu's right edge should line up with the avatar's right edge"
  ).toBeLessThanOrEqual(1);
});

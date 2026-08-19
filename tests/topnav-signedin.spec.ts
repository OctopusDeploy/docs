import { test, expect, type Page } from '@playwright/test';

const docsPage = '/docs/';

const nav = '.top-nav';
const trailing = `${nav} .top-nav__trailing`;
const avatar = `${nav} [data-user-avatar]`;

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

test.describe('top nav signed-in state', () => {
  test('shows the sign in and sign up buttons when signed out', async ({
    page,
  }) => {
    await page.goto(docsPage);

    await expect(page.locator(trailing).getByText('Sign in')).toBeVisible();
    await expect(
      page.locator(trailing).getByText('Start for free')
    ).toBeVisible();
    await expect(page.locator(avatar)).toBeHidden();
  });

  test('swaps those buttons for an initials avatar when signed in', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      email: 'jd@example.com',
    });
    await page.goto(docsPage);

    await expect(page.locator(trailing).getByText('Sign in')).toBeHidden();
    await expect(
      page.locator(trailing).getByText('Start for free')
    ).toBeHidden();
    await expect(
      page.locator(`${trailing} [data-theme-toggle-button]`)
    ).toBeVisible();

    await expect(page.locator(avatar)).toBeVisible();
    await expect(page.locator(`${avatar} [data-user-initials]`)).toHaveText(
      'JD'
    );
    await expect(page.locator(avatar)).toHaveAttribute(
      'title',
      'John Doe'
    );
  });

  test('takes the first two characters of a single-word name', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, { fullName: 'John' });
    await page.goto(docsPage);

    await expect(page.locator(`${avatar} [data-user-initials]`)).toHaveText(
      'JO'
    );
  });

  test('falls back to the email when there is no name', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, { email: 'jd@example.com' });
    await page.goto(docsPage);

    await expect(page.locator(`${avatar} [data-user-initials]`)).toHaveText(
      'JD'
    );
  });

  test('requests the image at the avatar size and 404s rather than defaulting', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      profileImageUrl: new URL(
        '/docs/img/octopus-deploy-logo.png',
        baseURL
      ).toString(),
    });
    await page.goto(docsPage);

    const image = page.locator(`${avatar} [data-avatar-image]`);
    const src = new URL((await image.getAttribute('src')) ?? '', baseURL);
    expect(src.searchParams.get('d')).toBe('404');
    expect(src.searchParams.get('s')).toBe('36');

    const srcSet = (await image.getAttribute('srcset')) ?? '';
    expect(srcSet).toContain('s=36 1x');
    expect(srcSet).toContain('s=72 2x');
    expect(srcSet).toContain('s=108 3x');
  });

  test('shows the profile image when one loads', async ({ page, baseURL }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      profileImageUrl: new URL(
        '/docs/img/octopus-deploy-logo.png',
        baseURL
      ).toString(),
    });
    await page.goto(docsPage);

    await expect(page.locator(`${avatar} [data-avatar-image]`)).toBeVisible();
    await expect(page.locator(`${avatar} [data-avatar-fallback]`)).toBeHidden();
  });

  test('keeps the initials when the profile image fails to load', async ({
    page,
    baseURL,
  }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      profileImageUrl: new URL(
        '/docs/img/no-such-image.png',
        baseURL
      ).toString(),
    });
    await page.goto(docsPage);

    await expect(
      page.locator(`${avatar} [data-avatar-fallback]`)
    ).toBeVisible();
    await expect(page.locator(`${avatar} [data-avatar-image]`)).toBeHidden();
  });

  test('rejects a non-http profile image url', async ({ page, baseURL }) => {
    await signIn(page, baseURL, {
      fullName: 'John Doe',
      profileImageUrl: 'javascript:alert(1)',
    });
    await page.goto(docsPage);

    await expect(
      page.locator(`${avatar} [data-avatar-fallback]`)
    ).toBeVisible();
    await expect(
      page.locator(`${avatar} [data-avatar-image]`)
    ).not.toHaveAttribute('src');
  });
});

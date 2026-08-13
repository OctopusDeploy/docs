import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

// Runs against `astro preview` (built `dist/`), because the `.md` companion the
// button points at is written by the build-time integration.

const STABLE_PLAIN_MD_PATH = '/docs/argo-cd';
const STABLE_MDX_PATH = '/docs/kubernetes';

// The menu scales as it opens, so a box measured before that finishes is the
// box part way through the animation rather than the one being asserted on.
async function opened(options: Locator) {
  await expect(options).toBeVisible();
  await options.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished))
  );
}

test('every assistant is handed a working .md URL', async ({
  page,
  request,
}) => {
  await page.goto(STABLE_PLAIN_MD_PATH);

  const links = await page
    .locator('.octo-llm a[href]')
    .evaluateAll((all) => all.map((l) => (l as HTMLAnchorElement).href));

  expect(
    links.length,
    'expected the primary button plus two menu options'
  ).toBe(3);

  // Each assistant carries the page URL inside its own prompt parameter, so the
  // parameter name varies but the URL it wraps must not.
  const mdUrls = new Set(
    links.map((href) => {
      const params = new URL(href).searchParams;
      const prompt = params.get('q') ?? params.get('prompt') ?? '';
      return prompt.match(/https?:\/\/\S+\.md/)?.[0] ?? '';
    })
  );
  expect(mdUrls.size, 'every assistant should be pointed at one .md URL').toBe(
    1
  );

  const mdUrl = [...mdUrls][0];
  expect(mdUrl).toContain(STABLE_PLAIN_MD_PATH + '.md');

  // The prompt URL is absolute to production; test it against the preview host.
  const target = await request.get(mdUrl.replace(/^https?:\/\/[^/]+/, ''));
  expect(target.status()).toBe(200);
});

test('the button is absent on a page with no .md companion', async ({
  page,
}) => {
  await page.goto(STABLE_MDX_PATH);
  const count = await page.locator('.octo-llm').count();
  expect(count, 'expected no Open in Claude button on ineligible page').toBe(0);
});

// Where the menu is actually crowded: 700 puts the control at the end of a
// single row, 430 wraps it onto its own line at the start. The menu is wider
// than the control, so those two need it to open towards opposite sides.
for (const width of [700, 430]) {
  test(`the menu opens on screen at ${width}px wide`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(STABLE_PLAIN_MD_PATH);
    await page.locator('.octo-llm [data-split-trigger]').click();

    const menu = page.locator('.octo-llm .split-btn__options');
    await opened(menu);

    const box = (await menu.boundingBox())!;
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

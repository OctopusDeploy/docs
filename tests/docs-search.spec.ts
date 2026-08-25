import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// The gallery renders a second, fixture-backed overlay alongside the page's own,
// so the results under test are fixed and no search index is fetched.
const PAGE = '/components';

const overlay = (page: Page) => page.locator('[data-docs-search="demo"]');
const siteOverlay = (page: Page) => page.locator('[data-docs-search="site"]');

// Mirrors the sniff in src/scripts/docs-search.ts, so the test presses the
// modifier that page is actually listening for.
const applePlatform = (page: Page) =>
  page.evaluate(() => {
    const nav = navigator as Navigator & {
      userAgentData?: { platform: string };
    };
    return nav.userAgentData
      ? nav.userAgentData.platform === 'macOS'
      : (nav.platform || nav.userAgent).includes('Mac');
  });

async function opened(page: Page) {
  const demo = overlay(page);
  await page.locator('[data-docs-search-trigger="demo"]').click();
  await expect(demo).toBeVisible();
  return demo;
}

test('the overlay is closed until a trigger opens it', async ({ page }) => {
  await page.goto(PAGE);

  await expect(overlay(page)).toBeHidden();

  await opened(page);

  await expect(overlay(page).locator('[data-docs-search-input]')).toBeFocused();
});

// Two overlays on one page is the case the gallery creates; the site's own must
// not answer a trigger naming the demo.
test('a trigger opens only the overlay it names', async ({ page }) => {
  await page.goto(PAGE);

  await opened(page);

  await expect(siteOverlay(page)).toBeHidden();
});

test('the tab strip and results appear once there is a query', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await expect(demo.locator('[data-docs-search-tabs]')).toBeHidden();
  await expect(demo.locator('[data-docs-search-body]')).toBeHidden();

  await demo.locator('[data-docs-search-input]').fill('feed');

  await expect(demo.locator('[role="option"]')).toHaveCount(4);
  await expect(demo.locator('[data-docs-search-tabs]')).toBeVisible();
});

// Focus stays in the input the whole time, so `aria-activedescendant` is the only
// thing saying where Enter will go.
test('the arrow keys move the active result without moving focus', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);
  const input = demo.locator('[data-docs-search-input]');

  await input.fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-1'
  );
  await expect(input).toBeFocused();

  await page.keyboard.press('ArrowUp');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  // Up off the first result comes round to the last, and down off the last comes
  // back to the first.
  await page.keyboard.press('ArrowUp');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-3'
  );
  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'demo-search-option-0'
  );

  // Exactly one result carries the state at a time.
  await expect(demo.locator('[role="option"][data-active]')).toHaveCount(1);
});

test('Enter follows the active result', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(
    /\/docs\/deployments\/packages\/feeds\/maven-feeds$/
  );
});

test('a tab narrows the results to its own section', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  // A section the query misses has no tab at all.
  const tabs = demo.locator('[data-facet]:not([hidden])');
  await expect(tabs).toHaveText(['All (4)', 'Docs (2)', 'API (1)', 'CLI (1)']);

  await demo.locator('[data-facet="cli"]').click();

  await expect(demo.locator('[role="option"]')).toHaveCount(1);
  await expect(demo.locator('.docs-search__row-title')).toHaveText(
    'octopus feed list'
  );
});

// Focus stays in the input, so the tabs would be unreachable without this. The
// caret has to be at the end before Right is free to mean anything else.
test('the left and right keys move through the tabs from the input', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);
  const input = demo.locator('[data-docs-search-input]');

  await input.fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);
  await expect(demo.locator('[data-facet="all"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );

  await page.keyboard.press('ArrowRight');

  await expect(demo.locator('[data-facet="docs"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(demo.locator('[role="option"]')).toHaveCount(2);
  // The query stays editable, so the caret keeps focus rather than the strip.
  await expect(input).toBeFocused();

  // The strip wraps, so going forward reaches every tab and comes back round.
  await page.keyboard.press('ArrowRight');
  await expect(demo.locator('[data-facet="api"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await page.keyboard.press('ArrowRight');
  await expect(demo.locator('[data-facet="cli"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await page.keyboard.press('ArrowRight');
  await expect(demo.locator('[data-facet="all"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  // Back the other way, from the start of the query where Left is free. Walking
  // the caret rather than pressing Home, which is not "start of line" in an
  // input on macOS - and walking it is the better test anyway, since every
  // press has to keep editing the query until the caret runs out of room.
  for (let i = 0; i < 'feed'.length; i++) {
    await page.keyboard.press('ArrowLeft');
  }
  await expect(demo.locator('[data-facet="all"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );

  await page.keyboard.press('ArrowLeft');
  await expect(demo.locator('[data-facet="cli"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
});

// Editing the query has to keep working, or the tabs cost more than they give.
test('the arrow keys still move the caret inside the query', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);
  const input = demo.locator('[data-docs-search-input]');

  await input.fill('feed');
  // Caret off the end, so Left is an edit rather than a tab move.
  await page.keyboard.press('ArrowLeft');

  await expect(demo.locator('[data-facet="all"]')).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(input).toHaveJSProperty('selectionStart', 3);
});

test('a query with no results says so', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('nothingmatchesthis');

  await expect(demo.locator('[role="option"]')).toHaveCount(0);
  await expect(demo.locator('[data-docs-search-empty]')).toBeVisible();
  await expect(demo.locator('[data-docs-search-echo]')).toHaveText(
    'nothingmatchesthis'
  );
});

test('Escape closes the overlay and returns focus to the trigger', async ({
  page,
}) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await page.keyboard.press('Escape');

  await expect(demo).toBeHidden();
  await expect(page.locator('[data-docs-search-trigger="demo"]')).toBeFocused();
});

test('the close button closes the overlay', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-close]').click();

  await expect(demo).toBeHidden();
});

// A modal dialog fills the viewport, so the area around the panel is the dialog
// itself rather than the page behind it.
test('a click outside the panel closes the overlay', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.click({ position: { x: 8, y: 8 } });

  await expect(demo).toBeHidden();
});

// Both navs render on every page and one is hidden with CSS, so a trigger has to
// be picked by what is on screen rather than by document order.
const navField = (page: Page) =>
  page.locator('input[data-docs-search-trigger]:visible').first();

test('the query is left in the field that opened the overlay', async ({
  page,
}) => {
  await page.goto(PAGE);

  const trigger = navField(page);
  await trigger.click();

  const site = siteOverlay(page);
  await expect(site).toBeVisible();
  await site.locator('[data-docs-search-input]').fill('tentacle');
  await page.keyboard.press('Escape');

  await expect(site).toBeHidden();
  await expect(trigger).toHaveValue('tentacle');
});

// Search analytics broke once already, silently: `Plausible.astro` kept
// listening for a `searched` event after the page that fired it was deleted, and
// nothing failed. The goal name and the prop name are the contract with the
// Plausible dashboard, so they are asserted rather than described.
test('a settled query reports a Search goal to Plausible', async ({ page }) => {
  // Plausible itself is not loaded on a preview build, so stand in for it.
  await page.addInitScript(() => {
    (window as Window & { searchGoals?: unknown[] }).searchGoals = [];
    (window as Window & { plausible?: unknown }).plausible = (
      goal: string,
      options: unknown
    ) => {
      (window as Window & { searchGoals?: unknown[] }).searchGoals!.push([
        goal,
        options,
      ]);
    };
  });

  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('tentacle');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  await expect
    .poll(() =>
      page.evaluate(
        () => (window as Window & { searchGoals?: unknown[] }).searchGoals
      )
    )
    .toEqual([['Search', { props: { search: 'tentacle' } }]]);

  // Narrowing to a tab re-runs the same query. The old search page reported once
  // per distinct query and this has to match it, or every tab click inflates the
  // count.
  const docs = site.locator('[data-docs-search-tabs] [data-facet="docs"]');
  if (await docs.isVisible()) {
    await docs.click();
    await expect(site.locator('[role="option"]').first()).toBeVisible({
      timeout: 20_000,
    });
  }

  expect(
    await page.evaluate(
      () => (window as Window & { searchGoals?: unknown[] }).searchGoals
    )
  ).toHaveLength(1);
});

// The index stores absolute production URLs. A result that keeps one sends you
// from an ephemeral environment or localhost straight to octopus.com, which is
// exactly what happened the first time this shipped.
test('results stay on the host that served them', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('tentacle');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  const hrefs = await site
    .locator('[role="option"]')
    .evaluateAll((rows) => rows.map((row) => row.getAttribute('href') ?? ''));

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href, 'a result href must be a path, not an absolute URL').toMatch(
      /^\/docs\//
    );
  }
});

// A section's own page can rank far below the pages inside it on raw score -
// /docs/infrastructure/deployment-targets/ is 36th for this query - so the
// overlay runs a second search over the shallow pages alone and puts the page the
// query names at the top. Without it the first result is a getting-started page.
test('the page a query names comes first', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('deployment targets');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  await expect(site.locator('[role="option"]').first()).toHaveAttribute(
    'href',
    '/docs/infrastructure/deployment-targets/'
  );
});

// Pagefind hands over every match as a stub and only the rows on screen cost a
// fetch, so the list extends as it is scrolled rather than stopping at the first
// page. The ids matter as much as the count: `aria-activedescendant` names one,
// so a repeat would point the input at the wrong row.
test('scrolling to the end of the results loads more', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  // A query with far more matches than fit in one page.
  await site.locator('[data-docs-search-input]').fill('deployments');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  const rows = site.locator('[role="option"]');
  const first = await rows.count();
  expect(first).toBeGreaterThan(0);

  await site
    .locator('[data-docs-search-body]')
    .evaluate((body) => body.scrollTo(0, body.scrollHeight));

  await expect
    .poll(() => rows.count(), { timeout: 20_000 })
    .toBeGreaterThan(first);

  const ids = await rows.evaluateAll((options) => options.map((row) => row.id));
  expect(new Set(ids).size, 'every option needs its own id').toBe(ids.length);
});

// The two features meeting: a page pulled onto the first screen for naming the
// query still has its own stub further down the list, because ranking past
// PAGE_SIZE is why it had to be pulled forward at all. Paging has to skip it.
//
// `deployment targets` rather than a query with more results: the promotion only
// happens when nothing on the first page already names the query, and
// /docs/infrastructure/deployment-targets/ ranks 36th on raw score.
test('a page pulled forward is not listed again further down', async ({
  page,
}) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('deployment targets');
  const rows = site.locator('[role="option"]');
  await expect(rows.first()).toBeVisible({ timeout: 20_000 });
  await expect(rows.first()).toHaveAttribute(
    'href',
    '/docs/infrastructure/deployment-targets/'
  );

  // Twice, because the second stub sits on the page after the first.
  for (let round = 0; round < 2; round += 1) {
    const before = await rows.count();
    await site
      .locator('[data-docs-search-body]')
      .evaluate((body) => body.scrollTo(0, body.scrollHeight));
    await expect
      .poll(() => rows.count(), { timeout: 20_000 })
      .toBeGreaterThan(before);
  }

  const hrefs = await rows.evaluateAll((options) =>
    options.map((row) => row.getAttribute('href'))
  );
  // Section rows carry an anchor and share their page's url, so only page rows
  // are counted here.
  const pages = hrefs.filter((href) => href && !href.includes('#'));
  expect(new Set(pages).size, 'no page may be listed twice').toBe(pages.length);
});

// A word on nearly every page scores near zero, because BM25's IDF collapses when
// a term is everywhere: `octopus` is on 1177 of 1251 pages and scores 0.87
// against a floor of 8. Suppressing it is right, and calling it "no results" is
// not - there are 1177.
test('a query on nearly every page asks for a narrower one', async ({
  page,
}) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('octopus');

  await expect(site.locator('[data-docs-search-broad]')).toBeVisible({
    timeout: 20_000,
  });
  await expect(site.locator('[data-docs-search-empty]')).toBeHidden();
  await expect(site.locator('[role="option"]')).toHaveCount(0);
});

// A keyboard mash also scores below the floor, and it really has no answer, so it
// keeps the plain message. Pagefind scores partial matches, so a mash matches a
// surprising share of the corpus - `asdfgh` reaches 74% - which is why the two
// cases are told apart by more than the score.
test('a query with no answer still says no results', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('asdfgh');

  await expect(site.locator('[data-docs-search-empty]')).toBeVisible({
    timeout: 20_000,
  });
  await expect(site.locator('[data-docs-search-broad]')).toBeHidden();
});

// Three CLI pages carry the slug `create-release`, so the rule that promotes a
// page the query names would otherwise hand this to one of them. A reference page
// has to be asked for.
test('a guide beats a command of the same name', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('create release');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });
  await expect(site.locator('[role="option"]').first()).toHaveAttribute(
    'href',
    '/docs/releases/creating-a-release/'
  );
});

// The other half of that rule: ask for the command and you get the command. Every
// CLI page is titled `octopus <something>`, so a query opening that way counts as
// asking.
test('a command wins when the query asks for one', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('octopus release create');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });
  await expect(site.locator('[role="option"]').first()).toHaveAttribute(
    'href',
    '/docs/octopus-rest-api/cli/octopus-release-create/'
  );
});

// The strip counts every match Pagefind returns for a tab, so a tab offering a
// number has to show rows when it is picked. `kubernetes` had one API page
// scoring 6.59 against a floor of 8, so the strip read "API (1)" and the panel
// read "No results for kubernetes".
test('every tab with a count has results behind it', async ({ page }) => {
  await page.goto('/docs');

  const site = siteOverlay(page);
  await navField(page).click();
  await expect(site).toBeVisible();

  await site.locator('[data-docs-search-input]').fill('kubernetes');
  await expect(site.locator('[role="option"]').first()).toBeVisible({
    timeout: 20_000,
  });

  const tabs = site.locator(
    '[data-docs-search-tabs] [data-facet]:not([hidden])'
  );
  const facets = await tabs.evaluateAll((all) =>
    all.map((tab) => ({
      facet: (tab as HTMLElement).dataset.facet,
      // "Docs (123)" - the strip prints the count in brackets.
      count: Number(/\((\d+)\)/.exec(tab.textContent ?? '')?.[1] ?? 0),
    }))
  );

  // The API tab is the one that used to fail, so the test is worthless without
  // it: a run where the query stops matching an API page proves nothing.
  expect(facets.map((f) => f.facet)).toContain('api');

  for (const { facet, count } of facets) {
    if (!facet || count === 0) continue;

    await site.locator(`[data-facet="${facet}"]`).click();
    await expect(
      site.locator('[role="option"]').first(),
      `the ${facet} tab offers ${count} and has to show them`
    ).toBeVisible({ timeout: 20_000 });
  }
});

// Ctrl/Cmd+K belongs to the page's own search. A demo instance in an article must
// not answer it.
test('the keyboard shortcut opens the site overlay', async ({ page }) => {
  await page.goto(PAGE);

  // Which modifier the page honours is decided by the platform the *browser*
  // advertises, not the one the test runs on, and Playwright's Desktop Chrome
  // advertises Windows even on a Mac host. Asking process.platform there picks
  // Meta for a page that is listening for Control.
  const shortcut = (await applePlatform(page)) ? 'Meta+k' : 'Control+k';
  await page.keyboard.press(shortcut);

  await expect(siteOverlay(page)).toBeVisible();
  await expect(overlay(page)).toBeHidden();
});

// Typing in the nav field should not be swallowed by the hand-off.
test('a character typed in the trigger carries into the overlay', async ({
  page,
}) => {
  await page.goto(PAGE);

  const trigger = navField(page);
  await trigger.focus();
  await page.keyboard.press('a');

  const site = siteOverlay(page);
  await expect(site).toBeVisible();
  await expect(site.locator('[data-docs-search-input]')).toHaveValue('a');
});

// A design system asset is drawn in `currentColor`, so handing one to an `<img>`
// leaves it black in both themes. Masking it is what lets it take a themed color.
test('result icons are masked so they theme', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  const paint = await demo
    .locator('.docs-search__row-icon')
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el);
      return { mask: style.maskImage, background: style.backgroundColor };
    });

  expect(paint.mask, 'the icon should be masked').toContain('url(');
  expect(
    paint.background,
    'an unpainted icon means no color reached it'
  ).not.toBe('rgba(0, 0, 0, 0)');
});

// Astro scopes a component's styles to the markup it can see at build time, so a
// row built in script comes out unstyled unless it is cloned from the template.
test('results are laid out, not bare markup', async ({ page }) => {
  await page.goto(PAGE);
  const demo = await opened(page);

  await demo.locator('[data-docs-search-input]').fill('feed');
  await expect(demo.locator('[role="option"]')).toHaveCount(4);

  await expect(demo.locator('[role="option"]').first()).toHaveCSS(
    'display',
    'grid'
  );
});

for (const width of [1440, 768, 320]) {
  test(`the panel stays on screen at ${width}px wide`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(PAGE);
    const demo = await opened(page);

    await demo.locator('[data-docs-search-input]').fill('feed');
    await expect(demo.locator('[role="option"]')).toHaveCount(4);

    const box = (await demo.locator('.docs-search__panel').boundingBox())!;
    const viewport = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(
      Math.round(box.x),
      'panel should not run off the start edge'
    ).toBeGreaterThanOrEqual(0);
    expect(
      Math.round(box.x + box.width),
      'panel should not run off the end edge'
    ).toBeLessThanOrEqual(viewport.client);
    expect(
      viewport.scroll,
      'an open overlay should not force a horizontal scrollbar'
    ).toBeLessThanOrEqual(viewport.client);
  });
}

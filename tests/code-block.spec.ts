import { test, expect } from '@playwright/test';

// A page with two <details data-group> panels, each a lone code block
const GROUPED = '/docs/octopus-rest-api/octopus.client/using-resources';

// A page whose group panels hold prose as well as code, so they stay tabs
const TABBED = '/docs/kubernetes/targets/kubernetes-agent/permissions';

const SINGLE = '/docs/kubernetes/steps/kustomize';

// The one group in the docs with a single member
const SINGLE_GROUP =
  '/docs/administration/reporting/report-on-deployments-using-excel';

// A page holding a code block far taller than the collapse threshold
const LONG = '/docs/octopus-rest-api/octopus.server.exe-command-line/configure';

// The shell is rendered at build time, so it has to survive without scripting.
test.describe('code block, no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('renders the frame, label, language and copy button', async ({
    page,
  }) => {
    await page.goto(SINGLE);

    const block = page.locator('.code-block').first();
    await expect(block).toBeVisible();
    await expect(block.locator('.code-block__label')).toHaveText(
      'Reference a container image package by version'
    );
    await expect(block.locator('.code-block__language')).toHaveText('YAML');
    await expect(block.locator('.code-block__copy')).toBeVisible();

    // The frame, rather than bare text on the page background
    const border = await block.evaluate(
      (node) => getComputedStyle(node).borderTopWidth
    );
    expect(border).toBe('1px');
  });

  test('leaves a grouped block readable with every language shown', async ({
    page,
  }) => {
    await page.goto(GROUPED);

    // Nothing to switch with, so each language keeps its own block
    await expect(page.locator('.code-block')).toHaveCount(2);
    await expect(page.locator('.code-block__language-select')).toHaveCount(0);
  });
});

test.describe('code block', () => {
  test('wraps a fenced block in a header with its language and a copy button', async ({
    page,
  }) => {
    await page.goto(SINGLE);

    const block = page.locator('.code-block').first();
    await expect(block).toBeVisible();
    await expect(block.locator('.code-block__language')).toHaveText('YAML');
    await expect(block.locator('.code-block__copy')).toBeVisible();
  });

  test('shows the fence meta as the label', async ({ page }) => {
    await page.goto(SINGLE);

    await expect(page.locator('.code-block__label').first()).toHaveText(
      'Reference a container image package by version'
    );
  });

  test('copies the visible panel and reverts after the delay', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(SINGLE);

    const copy = page.locator('.code-block__copy').first();
    await expect(copy).toHaveAttribute('data-tooltip', 'Copy to clipboard');

    await copy.click();
    await expect(copy).toHaveAttribute('data-tooltip', 'Copied');

    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('kustomization.yaml');

    await expect(copy).toHaveAttribute('data-tooltip', 'Copy to clipboard', {
      timeout: 4000,
    });
  });

  test('turns a code-only details group into one block with a language select', async ({
    page,
  }) => {
    await page.goto(GROUPED);

    const block = page.locator('.code-block').first();
    const select = block.locator('.code-block__language-select');
    await expect(select).toHaveValue('0');
    expect(await select.locator('option').allTextContents()).toEqual([
      'PowerShell',
      'C#',
    ]);

    // Only the selected language is on the page
    await expect(block.locator('.code-block__panel:visible')).toHaveCount(1);
    await expect(block).toContainText('$repository.Machines.Modify');

    await select.selectOption({ label: 'C#' });

    await expect(block).toContainText('repository.Machines.Modify(machine)');
    await expect(block.locator('.code-block__panel:visible')).toHaveCount(1);
  });

  test('the select is reachable and operable from the keyboard', async ({
    page,
  }) => {
    await page.goto(GROUPED);

    const select = page.locator('.code-block__language-select').first();
    await select.focus();
    await expect(select).toBeFocused();

    // Free with <select>; the old menu hand-rolled all of this
    await select.press('ArrowDown');
    await expect(select).toHaveValue('1');
  });

  test('a one-member group gets no switcher', async ({ page }) => {
    await page.goto(SINGLE_GROUP);

    const block = page
      .locator('.code-block')
      .filter({ hasText: 'Invoke-RestMethod' })
      .first();

    await expect(block).toBeVisible();
    await expect(block.locator('.code-block__language-select')).toHaveCount(0);
    await expect(block.locator('.code-block__language')).toHaveText(
      'PowerShell'
    );

    // The <details> is gone either way
    await expect(page.locator('details[data-group]')).toHaveCount(0);
  });

  test('leaves a group holding more than code as a tab list', async ({
    page,
  }) => {
    await page.goto(TABBED);

    await expect(page.locator('.tab-list').first()).toBeVisible();
  });

  test('collapses a long block until it is clicked', async ({ page }) => {
    await page.goto(LONG);

    const block = page.locator('.code-block[data-collapsible]').first();
    await expect(block).toBeVisible();
    await expect(block.locator('.code-block__fade')).toBeVisible();

    const collapsed = await block.locator('.code-block__body').boundingBox();
    expect(collapsed!.height).toBe(500);

    await block.locator('.code-block__body').click();
    await expect(block).toHaveAttribute('data-expanded', '');

    // Waits out the expand transition before measuring
    await expect
      .poll(
        async () =>
          (await block.locator('.code-block__body').boundingBox())!.height
      )
      .toBeGreaterThan(500);

    // Clicking away puts it back
    await page.locator('h1').click();
    await expect(block).not.toHaveAttribute('data-expanded', '');
  });
});

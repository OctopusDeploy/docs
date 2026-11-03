import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// See https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  testDir: './tests',
  // A hung test otherwise burns 30 minutes, times the 2 retries, on a single worker.
  timeout: 60 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    // --ignore-lock keeps the server in the foreground. Without it, Astro
    // detaches the preview server when an AI agent runs it, so Playwright sees
    // the command exit early and the server is left running.
    command: 'npm run preview -- --ignore-lock',
    port: 3000,
  },
};

export default config;

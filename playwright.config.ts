import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// Override with PLAYWRIGHT_PORT to run the suite alongside a dev server.
const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);

// See https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    actionTimeout: 0,
    baseURL: `http://localhost:${port}`,
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
    command: `npm run preview -- --port ${port}`,
    port,
  },
};

export default config;

import { defineConfig, devices } from '@playwright/test';

// When using Serenity/JS with Playwright the framework doesn't export a helper
// like `serenity()` – instead you register the reporter(s) you need in the
// `reporter` section below.  The `@serenity-js/playwright` package provides
// Screenplay abilities and selectors; the actual reporting services live in
// `@serenity-js/console-reporter`, `@serenity-js/serenity-bdd`, etc.
//
// You can specify them by package name (string) or import the default factory
// and invoke it to obtain a reporter builder.  In this configuration we will
// wire up the console reporter and the Serenity BDD reporter so that Playwright
// emits the Serenity events that drive the familiar Serenity Mocha/Jasmine
// reports.

// eslint-disable-next-line unicorn/no-unused-vars
// (reporter used via string name below)
import type {} from '@serenity-js/serenity-bdd';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // - `list` keeps the default Playwright output in the terminal
  // - the console reporter mirrors events to Serenity/JS console output
  // - the Serenity BDD reporter produces JSON files that can be consumed by
  //   the Serenity BDD CLI or used with Serenity/JS services such as the
  //   Web/serenity-bdd integration.
  reporter: [
    ['list'],
    // using strings is sufficient when no custom configuration is required
    ['@serenity-js/console-reporter', { theme: 'auto' }],
    // use a string-based reporter; Playwright will `require()` the module for us
    ['@serenity-js/serenity-bdd', { specDirectory: 'specs' }],
  ],
  use: {
    // run tests in headed mode so the browser UI is visible during development
    // you can still override via CLI (e.g. `npx playwright test --headed` or
    // `HEADLESS=false npx playwright test`).
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

/* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

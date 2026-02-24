// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('1. Navigation Suite', () => {
  test('1.1. Caso 1: Navegar a la Página Principal', async ({ page }) => {
    // 1. Open browser and navigate to https://demoqa.com/
    await page.goto('https://demoqa.com/');
    // pause execution so you can inspect the browser in the Playwright Inspector

    // Verify Elements section is displayed
    await expect(page.getByText('Elements')).toBeVisible();

    // Verify Forms section is displayed
    await expect(page.getByText('Forms')).toBeVisible();

    // Verify Alerts, Frame & Windows section is displayed
    await expect(page.getByText('Alerts, Frame & Windows')).toBeVisible();

    // Verify Widgets section is displayed
    await expect(page.getByText('Widgets')).toBeVisible();

    // Verify Interactions section is displayed
    await expect(page.getByText('Interactions')).toBeVisible();

    // Verify Book Store Application section is displayed
    await expect(page.getByText('Book Store Application')).toBeVisible();
  });

  test.afterAll(async () => {
    console.log('All the sections are visible on the page');
  });
});
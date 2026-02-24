// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Suite', () => {
  test('Caso 4: Section Alerts, Frame & Windows', async ({ page, context }) => {
    // 1. Enter Alerts, Frame & Windows
    await page.goto('https://demoqa.com/');
    await page.getByText('Alerts, Frame & Windows').click();
    await expect(page).toHaveURL(/.*alertsWindows/);

    // select the Alerts subitem from the sidebar
    await page.getByRole('link', { name: 'Alerts' }).click();
    await expect(page).toHaveURL(/.*alerts/);

    // 2. Try a button that shows a simple alert
    await expect(page.locator('#alertButton')).toBeVisible();
    let alertShown = false;
    page.once('dialog', dialog => {
      alertShown = true;
      dialog.accept();
    });
    await page.click('#alertButton');
    expect(alertShown).toBe(true);

    // 4. Try a button that opens a new window/tab
    await page.getByRole('link', { name: 'Browser Windows' }).click();
    await expect(page).toHaveURL(/.*browser-windows/);
    await expect(page.locator('#windowButton')).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('#windowButton'),
    ]);
    await newPage.waitForLoadState();
    // the new page should have a different URL than the main one
    expect(newPage.url()).not.toBe(page.url());
    // Confirm the new page is opened
    expect(newPage).toBeDefined();
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 4: Section Alerts, Frame & Windows" completed successfully.');
  });
});

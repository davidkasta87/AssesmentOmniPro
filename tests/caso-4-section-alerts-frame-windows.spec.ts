// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Suite', () => {
  test('Caso 4: Section Alerts, Frame & Windows', async ({ page }) => {
    // 1. Enter Alerts, Frame & Windows
    await page.goto('https://demoqa.com/');
    await page.getByText('Alerts, Frame & Windows').click();
    await page.waitForURL('**/alertsWindows');

    // select the Alerts subitem from the sidebar
    await page.getByRole('link', { name: 'Alerts' }).click();
    await page.waitForURL('**/alerts');

    // 2. Try a button that shows a simple alert
    await page.waitForSelector('#alertButton', { state: 'visible' });
    page.once('dialog', dialog => dialog.accept());
    await page.click('#alertButton');

    // 4. Try a button that opens a new window/tab
    await page.getByRole('link', { name: 'Browser Windows' }).click();
    await page.waitForURL('**/browser-windows');
    await page.waitForSelector('#windowButton', { state: 'visible' });

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('#windowButton'),
    ]);
    await newPage.waitForLoadState();
    // the new page should have a different URL than the main one
    expect(newPage.url()).not.toBe(page.url());
  });
});

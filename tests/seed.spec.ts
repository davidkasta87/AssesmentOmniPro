import { test, expect } from '@playwright/test';
import { BASE_URL } from './constants';

test.describe('Test group', () => {
  test('seed', async ({ page }, testInfo) => {
    await page.goto(BASE_URL);
    // Add any setup or seeding steps here

    // Take screenshot for evidence
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('final-screenshot', { body: screenshot, contentType: 'image/png' });
  });
});

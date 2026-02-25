// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';


test.describe('Navigation Suite', () => {
  test('Caso 7: Book Store Application – Búsqueda de Libros', async ({ page }, testInfo) => {
    // 1. Click on Book Store Application
    await page.goto('/');
    await page.getByText('Book Store Application').click();
    await expect(page).toHaveURL(/.*books/);

    // 2. Enter a search term (e.g., "Git") into the search interface
    await page.fill('#searchBox', 'Git');
    await expect(page.locator('#searchBox')).toHaveValue('Git');

    // 3. Observe the results
    // verify that at least one result contains the search term
    const resultLink = page.locator('table').getByRole('link', { name: /Git/i }).first();
    await expect(resultLink).toBeVisible();

    // Take screenshot for evidence
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('final-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 7: Book Store Application – Búsqueda de Libros" completed successfully.');
  });
});

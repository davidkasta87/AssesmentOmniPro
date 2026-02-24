// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';


test.describe('Navigation Suite', () => {
  test('Caso 7: Book Store Application – Búsqueda de Libros', async ({ page }) => {
    // 1. Click on Book Store Application
    await page.goto('https://demoqa.com/');
    await page.getByText('Book Store Application').click();
    await expect(page).toHaveURL('**/books');

    // 2. Enter a search term (e.g., "Git") into the search interface
    await page.fill('#searchBox', 'Git');
    await expect(page.locator('#searchBox')).toHaveValue('Git');

    // 3. Observe the results
    const firstTitle = page.locator('.rt-tbody .rt-td:nth-child(2)').first();
    await expect(firstTitle).toContainText('Git');
  });
});

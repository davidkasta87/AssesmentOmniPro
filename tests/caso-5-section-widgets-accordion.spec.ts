// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Suite', () => {
  test('Caso 5: Section Widgets – Accordion', async ({ page }, testInfo) => {
    // 1. Go to Widgets
    await page.goto('/');
    await page.getByText('Widgets').click();
    await expect(page).toHaveURL(/.*widgets/);

    // 2. Select Accordion
    // Note: the site labels it "Accordian" in the sidebar
    await page.getByRole('link', { name: 'Accordian' }).click();
    await expect(page).toHaveURL(/.*accord/);
    await expect(page.locator('.accordion').first()).toBeVisible();

    // 3. Click through different panels of the accordion
    const panelButtons = page.locator('.accordion .card-header button');
    const panelBodies = page.locator('.accordion .card-body');
    const count = await panelButtons.count();
    for (let i = 0; i < count; i++) {
      // Click panel and verify body is visible and contains text
      await panelButtons.nth(i).click();
      await expect(panelBodies.nth(i)).toBeVisible();
      const bodyText = await panelBodies.nth(i).innerText();
      expect(bodyText.trim().length).toBeGreaterThan(0);
    }

    // Take screenshot for evidence
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('final-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 5: Section Widgets – Accordion" completed successfully.');
  });
});

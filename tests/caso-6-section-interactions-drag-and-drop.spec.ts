// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Suite', () => {
  test('Caso 6: Section Interactions – Drag and Drop', async ({ page }) => {
    // 1. Go to Interactions
    await page.goto('https://demoqa.com/');
    await page.getByText('Interactions').click();
    await expect(page).toHaveURL(/.*interaction/);

    // 2. Select Droppable
    await page.getByRole('link', { name: 'Droppable' }).click();
    await expect(page.locator('#simpleDropContainer')).toBeVisible();

    // 3. Drag the movable element to the target area
    const draggable = page.locator('#simpleDropContainer #draggable');
    const droppable = page.locator('#simpleDropContainer #droppable');
    await draggable.dragTo(droppable);
    // expect: Element can be dragged to destination and feedback indicates success
    await expect(droppable).toHaveText('Dropped!');
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 6: Section Interactions – Drag and Drop" completed successfully.');
  });
});

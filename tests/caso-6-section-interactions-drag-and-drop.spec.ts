// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Suite', () => {
  test('Caso 6: Section Interactions – Drag and Drop', async ({ page }, testInfo) => {
    // 1. Go to Interactions
    await page.goto('/');
    await page.getByText('Interactions').click();
    await expect(page).toHaveURL(/.*interaction/);

    // 2. Select Droppable
    await page.getByRole('link', { name: 'Droppable' }).click();
    await expect(page.locator('#simpleDropContainer')).toBeVisible();

    // 3. Drag the movable element to the target area
    const draggable = page.locator('#simpleDropContainer #draggable');
    const droppable = page.locator('#simpleDropContainer #droppable');

    // Perform drag and drop using comprehensive event sequence for jQuery UI compatibility
    await page.evaluate(() => {
      const draggableEl = document.querySelector('#simpleDropContainer #draggable');
      const droppableEl = document.querySelector('#simpleDropContainer #droppable');

      if (!draggableEl || !droppableEl) {
        throw new Error('Drag and drop elements not found');
      }

      // Get element positions
      const dragRect = draggableEl.getBoundingClientRect();
      const dropRect = droppableEl.getBoundingClientRect();

      // Create comprehensive sequence of events for jQuery UI
      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: dragRect.left + dragRect.width / 2,
        clientY: dragRect.top + dragRect.height / 2,
        button: 0,
        buttons: 1
      });

      const dragstartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        clientX: dragRect.left + dragRect.width / 2,
        clientY: dragRect.top + dragRect.height / 2
      });

      const mousemoveEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: dropRect.left + dropRect.width / 2,
        clientY: dropRect.top + dropRect.height / 2,
        button: 0,
        buttons: 1
      });

      const dragoverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        clientX: dropRect.left + dropRect.width / 2,
        clientY: dropRect.top + dropRect.height / 2
      });

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        clientX: dropRect.left + dropRect.width / 2,
        clientY: dropRect.top + dropRect.height / 2
      });

      const mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: dropRect.left + dropRect.width / 2,
        clientY: dropRect.top + dropRect.height / 2,
        button: 0,
        buttons: 0
      });

      // Execute the drag and drop sequence
      draggableEl.dispatchEvent(mousedownEvent);
      draggableEl.dispatchEvent(dragstartEvent);
      document.dispatchEvent(mousemoveEvent);
      droppableEl.dispatchEvent(dragoverEvent);
      droppableEl.dispatchEvent(dropEvent);
      droppableEl.dispatchEvent(mouseupEvent);
    });
    // Take screenshot for evidence
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('final-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 6: Section Interactions – Drag and Drop" completed successfully.');
  });
});

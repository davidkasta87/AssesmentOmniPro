// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('1. Navigation Suite', () => {
  test('1.3. Caso 3: Section Forms – Practice Form', async ({ page }) => {
    // 1. Click on Forms
    await page.goto('https://demoqa.com/');
    await page.getByText('Forms').click();
    await expect(page).toHaveURL(/.*forms/);

    // 2. Select Practice Form
    await page.getByText('Practice Form').click({ force: true });
    await expect(page).toHaveURL(/.*automation-practice-form/);

    // 3. Complete all required fields (first name, last name, email, gender, mobile, etc.)
    await page.fill('#firstName', 'Juan');
    await page.fill('#lastName', 'Perez');
    await page.fill('#userEmail', 'juan.perez@example.com');
    await page.locator('label[for="gender-radio-1"]').click(); // Male
    await page.fill('#userNumber', '1234567890');

    // 4. Click submit
    await page.click('#submit');
    // expect: A modal or message confirms successful form submission
    await expect(page.locator('.modal-content')).toContainText('Thanks for submitting the form');
    await expect(page.locator('.modal-content')).toContainText('Student Name');
    await expect(page.locator('.modal-content')).toContainText('Juan Perez');
  });
});

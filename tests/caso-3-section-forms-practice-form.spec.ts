// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('1. Navigation Suite', () => {
  test('1.3. Caso 3: Section Forms – Practice Form', async ({ page }) => {
    // 1. Click on Forms
    await page.goto('https://demoqa.com/');
    await page.getByRole('link', { name: 'Forms' }).click();

    // 2. Select Practice Form
    await page.getByRole('link', { name: 'Practice Form' }).click();

    // 3. Complete all required fields (first name, last name, email, gender, mobile, Date of Birth, Hobbies, Current Address, etc.)
    await page.getByRole('textbox', { name: 'First Name' }).fill('Juan');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Perez');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('juan.perez@example.com');
    await page.getByRole('radio', { name: 'Male', exact: true }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234567890');
    // set date of birth directly to avoid calendar issues
    await page.fill('#dateOfBirthInput', '15 Jan 1990');
    await page.getByRole('checkbox', { name: 'Sports' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill('Av. Siempre Viva 123, Springfield');

    // 4. Click submit
    await page.getByRole('button', { name: 'Submit' }).click();
    // expect: A modal or message confirms successful form submission
    const dialog = page.getByRole('dialog', { name: 'Thanks for submitting the form' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Juan Perez');
    await expect(dialog).toContainText('juan.perez@example.com');
    await expect(dialog).toContainText('Male');
    await expect(dialog).toContainText('1234567890');
    await expect(dialog).toContainText('15 January,1990');
    await expect(dialog).toContainText('Sports');
    await expect(dialog).toContainText('Av. Siempre Viva 123, Springfield');
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 3: Section Forms – Practice Form" completed successfully.');
  });
});

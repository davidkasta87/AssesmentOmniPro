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
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('combobox').first().selectOption(['January']);
    await page.getByRole('combobox').nth(1).selectOption(['1990']);
    // Select day 15
    await page.getByRole('option', { name: '1990' }).press('Enter');
    await page.getByText('15', { exact: true }).click();
    await page.getByRole('checkbox', { name: 'Sports' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill('Av. Siempre Viva 123, Springfield');

    // 4. Click submit
    await page.getByRole('button', { name: 'Submit' }).click();
    // expect: A modal or message confirms successful form submission
    await expect(page.getByRole('dialog', { name: 'Thanks for submitting the form' })).toBeVisible();
    await expect(page.getByText('Juan Perez')).toBeVisible();
    await expect(page.getByText('juan.perez@example.com')).toBeVisible();
    await expect(page.getByText('Male')).toBeVisible();
    await expect(page.getByText('1234567890')).toBeVisible();
    await expect(page.getByText('15 January,1990')).toBeVisible();
    await expect(page.getByText('Sports')).toBeVisible();
    await expect(page.getByText('Av. Siempre Viva 123, Springfield')).toBeVisible();
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 3: Section Forms – Practice Form" completed successfully.');
  });
});

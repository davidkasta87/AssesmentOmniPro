// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('1. Navigation Suite', () => {
  test('1.2. Caso 2: Section Elements – Text Box', async ({ page }) => {
    // 1. Click on the Elements card
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements').click();
    await expect(page).toHaveURL(/.*elements/);

    // 2. From the sidebar choose Text Box
    await page.getByText('Text Box').click({ force: true });
    await expect(page).toHaveURL(/.*text-box/);

    // 3. Fill in the "Full Name" field with a valid text
    await page.fill('#userName', 'Test User');
    await expect(page.locator('#userName')).toHaveValue('Test User');

    // 4. Enter a valid Email in the email field
    await page.fill('#userEmail', 'test@example.com');
    await expect(page.locator('#userEmail')).toHaveValue('test@example.com');

    // 5. Click Submit
    await page.click('#submit');
    // expect: Section displays confirmation with entered name and email
    await expect(page.getByText('Name:Test User')).toBeVisible();
    await expect(page.getByText('Email:test@example.com')).toBeVisible();
  });
});

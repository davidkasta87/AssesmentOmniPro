// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage, FormsPage, PracticeFormPage, UserFormData } from '../page-objects';

test.describe('1. Navigation Suite', () => {
  test('1.3. Caso 3: Section Forms – Practice Form', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    const formsPage = new FormsPage(page);
    const practiceFormPage = new PracticeFormPage(page);

    // 1. Navigate to Forms section
    await homePage.navigateToHomePage();
    await homePage.clickForms();

    // 2. Select Practice Form
    await formsPage.clickPracticeForm();

    // 3. Complete form with user data
    const userData: UserFormData = {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@example.com',
      gender: 'Male',
      mobile: '1234567890',
      dateOfBirth: '15 Jan 1990',
      hobbies: ['Sports'],
      currentAddress: 'Av. Siempre Viva 123, Springfield'
    };

    // 4. Execute complete form workflow (fill, submit, verify)
    await practiceFormPage.completeFormWorkflow(userData);

    // Take screenshot for evidence
    await practiceFormPage.takeScreenshot(testInfo, 'final-screenshot');
  });

  test.afterAll(async () => {
    // Confirm the scenario was completed
    console.log('Scenario "Caso 3: Section Forms – Practice Form" completed successfully.');
  });
});

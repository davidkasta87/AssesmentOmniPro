// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage, ElementsPage, TextBoxPage } from '../page-objects';

test.describe('1. Navigation Suite', () => {
  test('1.2. Caso 2: Section Elements – Text Box', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const textBoxPage = new TextBoxPage(page);

    // 1. Navigate to home page and click on Elements card
    await homePage.navigateToHomePage();
    await homePage.clickElements();

    // 2. From the sidebar choose Text Box
    await elementsPage.clickTextBox();

    // 3. Fill and submit the text box form
    await textBoxPage.fillAndSubmitForm({
      name: 'Test User',
      email: 'test@example.com'
    });

    // 4. Verify form submission results
    await textBoxPage.verifyFormSubmission({
      name: 'Test User',
      email: 'test@example.com'
    });

    // Take screenshot for evidence
    await textBoxPage.takeScreenshot(testInfo, 'final-screenshot');
  });
});

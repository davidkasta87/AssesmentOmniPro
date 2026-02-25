// spec: specs/demoqa-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';

test.describe('1. Navigation Suite', () => {
  test('1.1. Caso 1: Navegar a la Página Principal', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);

    // 1. Open browser and navigate to https://demoqa.com/
    await homePage.navigateToHomePage();

    // Verify all main sections are displayed
    await homePage.verifyAllSectionsVisible();

    // Take screenshot for evidence
    await homePage.takeScreenshot(testInfo, 'final-screenshot');
  });

  test.afterAll(async () => {
    console.log('All the sections are visible on the page');
  });
});
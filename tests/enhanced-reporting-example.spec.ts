// Enhanced test example with better reporting and evidence
import { test, expect } from '@playwright/test';
import { HomePage, ElementsPage, TextBoxPage } from '../page-objects';

test.describe('🔧 Enhanced Text Box Test with Better Reporting', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        // Add test metadata
        testInfo.annotations.push({
            type: 'feature',
            description: 'Elements Section - Text Box Form'
        });
        testInfo.annotations.push({
            type: 'severity',
            description: 'high'
        });

        // Take initial screenshot
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();

        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach('initial-state', {
            body: screenshot,
            contentType: 'image/png'
        });
    });

    test('Enhanced Text Box Workflow with Step-by-Step Evidence', async ({ page }, testInfo) => {
        const homePage = new HomePage(page);
        const elementsPage = new ElementsPage(page);
        const textBoxPage = new TextBoxPage(page);

        await test.step('🏠 Navigate to Elements section', async () => {
            await homePage.clickElements();

            // Evidence for this step
            const screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach('step-1-elements-page', {
                body: screenshot,
                contentType: 'image/png'
            });
        });

        await test.step('📝 Select Text Box option', async () => {
            await elementsPage.clickTextBox();

            // Evidence for this step
            const screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach('step-2-textbox-page', {
                body: screenshot,
                contentType: 'image/png'
            });
        });

        await test.step('✍️ Fill and submit form', async () => {
            const testData = {
                name: 'Enhanced Test User',
                email: 'enhanced.test@example.com'
            };

            await textBoxPage.fillAndSubmitForm(testData);

            // Evidence for this step  
            const screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach('step-3-form-submitted', {
                body: screenshot,
                contentType: 'image/png'
            });
        });

        await test.step('✅ Verify form submission results', async () => {
            await textBoxPage.verifyFormSubmission({
                name: 'Enhanced Test User',
                email: 'enhanced.test@example.com'
            });

            // Final evidence
            const screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach('step-4-verification-complete', {
                body: screenshot,
                contentType: 'image/png'
            });
        });
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Capture performance metrics
        const performanceEntries = await page.evaluate(() => {
            return JSON.stringify(performance.getEntriesByType('navigation'), null, 2);
        });

        await testInfo.attach('performance-metrics', {
            body: performanceEntries,
            contentType: 'application/json'
        });

        // Add test timing
        testInfo.annotations.push({
            type: 'test-duration',
            description: `Completed in: ${testInfo.duration}ms`
        });
    });
});
import { test as base, expect } from '@playwright/test';
import { BasePage } from '../page-objects';

// Global hooks and enhanced test setup
export const test = base.extend({
    // Auto-screenshot and enhanced failure evidence
    page: async ({ page }, use, testInfo) => {
        // Add test metadata
        await page.addInitScript(() => {
            (window as any).testStartTime = Date.now();
        });

        // Enhanced error handling
        page.on('pageerror', (error) => {
            testInfo.annotations.push({
                type: 'page-error',
                description: `Page Error: ${error.message}`
            });
        });

        // Console log capture for debugging
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                testInfo.annotations.push({
                    type: 'console-error',
                    description: `Console Error: ${msg.text()}`
                });
            }
        });

        await use(page);

        // Post-test cleanup and evidence
        if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
            // Capture failure context
            const screenshot = await page.screenshot({
                fullPage: true,
                animations: 'disabled'
            });
            await testInfo.attach('failure-screenshot', {
                body: screenshot,
                contentType: 'image/png'
            });

            // Capture page source for debugging
            const html = await page.content();
            await testInfo.attach('failure-page-source', {
                body: html,
                contentType: 'text/html'
            });

            // Capture current URL
            testInfo.annotations.push({
                type: 'failure-url',
                description: `Failed on: ${page.url()}`
            });
        }
    },
});
// Utility functions for enhanced test reporting

import { Page, TestInfo } from '@playwright/test';

/**
 * Capture comprehensive evidence for critical test steps
 */
export async function captureStepEvidence(
    page: Page,
    testInfo: TestInfo,
    stepName: string,
    options?: {
        includeNetwork?: boolean;
        includeConsole?: boolean;
        includeStorage?: boolean;
    }
) {
    const { includeNetwork = false, includeConsole = false, includeStorage = false } = options || {};

    // Always include screenshot
    const screenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled'
    });
    await testInfo.attach(`${stepName}-screenshot`, {
        body: screenshot,
        contentType: 'image/png'
    });

    if (includeNetwork) {
        try {
            const networkRequests = await page.evaluate(() => (window as any).networkRequests || []);
            await testInfo.attach(`${stepName}-network`, {
                body: JSON.stringify(networkRequests, null, 2),
                contentType: 'application/json'
            });
        } catch (error) {
            console.log(`Failed to capture network data: ${error}`);
        }
    }

    if (includeConsole) {
        try {
            const consoleLogs = await page.evaluate(() => (window as any).consoleLogs || []);
            await testInfo.attach(`${stepName}-console`, {
                body: JSON.stringify(consoleLogs, null, 2),
                contentType: 'application/json'
            });
        } catch (error) {
            console.log(`Failed to capture console logs: ${error}`);
        }
    }

    if (includeStorage) {
        try {
            const storage = await page.evaluate(() => ({
                localStorage: Object.fromEntries(Object.entries(localStorage)),
                sessionStorage: Object.fromEntries(Object.entries(sessionStorage))
            }));

            await testInfo.attach(`${stepName}-storage`, {
                body: JSON.stringify(storage, null, 2),
                contentType: 'application/json'
            });
        } catch (error) {
            console.log(`Failed to capture storage data: ${error}`);
        }
    }
}

/**
 * Add custom annotations for better test categorization
 */
export function addTestMetadata(testInfo: TestInfo, metadata: {
    feature?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    tags?: string[];
    jira?: string;
    author?: string;
}) {
    if (metadata.feature) {
        testInfo.annotations.push({ type: 'feature', description: metadata.feature });
    }

    if (metadata.severity) {
        testInfo.annotations.push({ type: 'severity', description: metadata.severity });
    }

    if (metadata.tags && metadata.tags.length > 0) {
        testInfo.annotations.push({ type: 'tags', description: metadata.tags.join(', ') });
    }

    if (metadata.jira) {
        testInfo.annotations.push({ type: 'jira', description: metadata.jira });
    }

    if (metadata.author) {
        testInfo.annotations.push({ type: 'author', description: metadata.author });
    }
}

/**
 * Enhanced step wrapper with automatic evidence capture
 */
export async function enhancedStep(
    stepName: string,
    page: Page,
    testInfo: TestInfo,
    stepFunction: () => Promise<void>,
    evidenceOptions?: {
        captureBeforeStep?: boolean;
        captureAfterStep?: boolean;
        includeNetwork?: boolean;
    }
) {
    const {
        captureBeforeStep = false,
        captureAfterStep = true,
        includeNetwork = false
    } = evidenceOptions || {};

    return await test.step(stepName, async () => {
        if (captureBeforeStep) {
            await captureStepEvidence(page, testInfo, `${stepName}-before`, { includeNetwork });
        }

        await stepFunction();

        if (captureAfterStep) {
            await captureStepEvidence(page, testInfo, `${stepName}-after`, { includeNetwork });
        }
    });
}

/**
 * Performance monitoring utilities
 */
export async function capturePerformanceMetrics(page: Page, testInfo: TestInfo, stepName: string) {
    try {
        const metrics = await page.evaluate(() => {
            const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            return {
                loadTime: perf.loadEventEnd - perf.loadEventStart,
                domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
            };
        });

        await testInfo.attach(`${stepName}-performance`, {
            body: JSON.stringify(metrics, null, 2),
            contentType: 'application/json'
        });
    } catch (error) {
        console.log(`Failed to capture performance metrics: ${error}`);
    }
}

// Import the test function for enhanced step wrapper
import { test } from '@playwright/test';
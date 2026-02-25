import { test, expect } from '@playwright/test';

// Global test configuration and hooks
test.beforeAll(async () => {
    console.log('🚀 Starting Test Suite Execution');
    console.log(`📅 Execution Date: ${new Date().toISOString()}`);
    console.log(`🔧 Environment: ${process.env.BASE_URL || 'https://demoqa.com'}`);
});

test.afterAll(async () => {
    console.log('✅ Test Suite Execution Completed');
    console.log(`📊 Check HTML report at: playwright-report/index.html`);
});

// Global test hooks for better evidence capture
test.beforeEach(async ({ page }, testInfo) => {
    // Add common test metadata
    testInfo.annotations.push({
        type: 'test-id',
        description: `Test-${Date.now()}`
    });

    // Console log capture setup
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
        const logEntry = `[${msg.type()}] ${msg.text()}`;
        consoleLogs.push(logEntry);
    });

    // Store logs for later access
    await page.addInitScript((logs) => {
        (window as any).consoleLogs = logs;
    }, consoleLogs);

    // Network request monitoring
    const networkRequests: any[] = [];
    page.on('request', (request) => {
        networkRequests.push({
            url: request.url(),
            method: request.method(),
            timestamp: Date.now()
        });
    });

    page.on('response', (response) => {
        const request = networkRequests.find(req => req.url === response.request().url());
        if (request) {
            request.status = response.status();
            request.responseTime = Date.now() - request.timestamp;
        }
    });

    // Store network data
    await page.addInitScript((requests) => {
        (window as any).networkRequests = requests;
    }, networkRequests);
});

test.afterEach(async ({ page }, testInfo) => {
    // Only capture additional evidence if test failed
    if (testInfo.status !== 'passed') {
        // Enhanced failure evidence
        try {
            // Network requests
            const networkRequests = await page.evaluate(() => (window as any).networkRequests || []);
            if (networkRequests.length > 0) {
                await testInfo.attach('network-requests', {
                    body: JSON.stringify(networkRequests, null, 2),
                    contentType: 'application/json'
                });
            }

            // Local storage
            const localStorage = await page.evaluate(() => {
                const storage: any = {};
                for (let i = 0; i < window.localStorage.length; i++) {
                    const key = window.localStorage.key(i);
                    if (key) storage[key] = window.localStorage.getItem(key);
                }
                return storage;
            });

            if (Object.keys(localStorage).length > 0) {
                await testInfo.attach('local-storage', {
                    body: JSON.stringify(localStorage, null, 2),
                    contentType: 'application/json'
                });
            }

            // Session storage
            const sessionStorage = await page.evaluate(() => {
                const storage: any = {};
                for (let i = 0; i < window.sessionStorage.length; i++) {
                    const key = window.sessionStorage.key(i);
                    if (key) storage[key] = window.sessionStorage.getItem(key);
                }
                return storage;
            });

            if (Object.keys(sessionStorage).length > 0) {
                await testInfo.attach('session-storage', {
                    body: JSON.stringify(sessionStorage, null, 2),
                    contentType: 'application/json'
                });
            }

        } catch (error) {
            console.log(`Failed to capture additional evidence: ${error}`);
        }
    }

    // Add execution summary
    const summary = {
        testName: testInfo.title,
        status: testInfo.status,
        duration: testInfo.duration,
        retries: testInfo.retry,
        url: page.url(),
        userAgent: await page.evaluate(() => navigator.userAgent),
        timestamp: new Date().toISOString()
    };

    await testInfo.attach('test-summary', {
        body: JSON.stringify(summary, null, 2),
        contentType: 'application/json'
    });
});
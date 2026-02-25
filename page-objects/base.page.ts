import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url - The URL to navigate to
     */
    async goto(url: string = '/') {
        await this.page.goto(url);
    }

    /**
     * Wait for the page to load completely
     */
    async waitForLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Take a screenshot for evidence
     * @param testInfo - Playwright TestInfo object
     * @param name - Name for the screenshot
   * @param options - Screenshot options
   */
    async takeScreenshot(testInfo: any, name: string = 'screenshot', options?: {
        fullPage?: boolean;
        animations?: 'disabled' | 'allow';
        mask?: any[];
    }) {
        const screenshotOptions = {
            fullPage: true,
            animations: 'disabled' as const,
            ...options
        };

        const screenshot = await this.page.screenshot(screenshotOptions);
        await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
    }

    /**
     * Capture page context for debugging
     * @param testInfo - Playwright TestInfo object
     * @param stepName - Name of the current step
     */
    async captureContext(testInfo: any, stepName: string) {
        // Screenshot
        await this.takeScreenshot(testInfo, `${stepName}-screenshot`);

        // Page source
        const html = await this.page.content();
        await testInfo.attach(`${stepName}-page-source`, {
            body: html,
            contentType: 'text/html'
        });

        // Console logs
        const logs = await this.page.evaluate(() => {
            return (window as any).consoleLogs || [];
        });

        if (logs.length > 0) {
            await testInfo.attach(`${stepName}-console-logs`, {
                body: JSON.stringify(logs, null, 2),
                contentType: 'application/json'
            });
        }

        // Current URL and title
        const pageInfo = {
            url: this.page.url(),
            title: await this.page.title(),
            timestamp: new Date().toISOString()
        };

        await testInfo.attach(`${stepName}-page-info`, {
            body: JSON.stringify(pageInfo, null, 2),
            contentType: 'application/json'
        });
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Check if current URL contains expected text
     */
    async hasUrl(urlPattern: string): Promise<boolean> {
        return this.page.url().includes(urlPattern);
    }
}
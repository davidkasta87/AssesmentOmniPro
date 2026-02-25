import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class FormsPage extends BasePage {
    private readonly practiceFormLink: Locator;

    constructor(page: Page) {
        super(page);

        // Forms section links
        this.practiceFormLink = page.getByRole('link', { name: 'Practice Form' });
    }

    /**
     * Click on Practice Form option
     */
    async clickPracticeForm() {
        await this.practiceFormLink.click({ force: true });
    }
}
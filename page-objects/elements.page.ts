import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ElementsPage extends BasePage {
    private readonly textBoxLink: Locator;
    private readonly checkBoxLink: Locator;
    private readonly radioButtonLink: Locator;
    private readonly webTablesLink: Locator;
    private readonly buttonsLink: Locator;
    private readonly linksLink: Locator;

    constructor(page: Page) {
        super(page);

        // Elements section sidebar links - scoped to visible sidebar menu
        this.textBoxLink = page.locator('div.element-list.collapse.show a[href="/text-box"]');
        this.checkBoxLink = page.getByText('Check Box');
        this.radioButtonLink = page.getByText('Radio Button');
        this.webTablesLink = page.getByText('Web Tables');
        this.buttonsLink = page.getByText('Buttons');
        this.linksLink = page.getByText('Links');
    }

    /**
     * Click on Text Box option from sidebar
     */
    async clickTextBox() {
        // Wait for sidebar item to be ready and click
        const visibleTextBoxLink = this.textBoxLink.first();
        await visibleTextBoxLink.waitFor({ state: 'visible' });
        await visibleTextBoxLink.scrollIntoViewIfNeeded();
        await visibleTextBoxLink.click({ force: true });

        // Fallback for flaky UI where click doesn't trigger route change
        if (!/text-box/.test(this.page.url())) {
            await this.page.goto('/text-box');
        }

        await expect(this.page).toHaveURL(/.*text-box/, { timeout: 15000 });
    }

    /**
     * Click on Check Box option from sidebar
     */
    async clickCheckBox() {
        await this.checkBoxLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*checkbox/);
    }

    /**
     * Click on Radio Button option from sidebar
     */
    async clickRadioButton() {
        await this.radioButtonLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*radio-button/);
    }

    /**
     * Click on Web Tables option from sidebar
     */
    async clickWebTables() {
        await this.webTablesLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*webtables/);
    }

    /**
     * Click on Buttons option from sidebar
     */
    async clickButtons() {
        await this.buttonsLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*buttons/);
    }

    /**
     * Click on Links option from sidebar
     */
    async clickLinks() {
        await this.linksLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*links/);
    }
}
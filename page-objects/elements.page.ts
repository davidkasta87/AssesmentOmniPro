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

        // Elements section sidebar links
        this.textBoxLink = page.getByText('Text Box');
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
        await this.textBoxLink.click({ force: true });
        await expect(this.page).toHaveURL(/.*text-box/);
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
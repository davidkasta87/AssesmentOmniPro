import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class TextBoxPage extends BasePage {
    private readonly userNameInput: Locator;
    private readonly userEmailInput: Locator;
    private readonly currentAddressInput: Locator;
    private readonly permanentAddressInput: Locator;
    private readonly submitButton: Locator;
    private readonly outputSection: Locator;

    constructor(page: Page) {
        super(page);

        // Text Box form fields
        this.userNameInput = page.locator('#userName');
        this.userEmailInput = page.locator('#userEmail');
        this.currentAddressInput = page.locator('#currentAddress');
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.locator('#submit');
        this.outputSection = page.locator('#output');
    }

    /**
     * Fill the full name field
     * @param name - The name to enter
     */
    async fillFullName(name: string) {
        await this.userNameInput.fill(name);
        await expect(this.userNameInput).toHaveValue(name);
    }

    /**
     * Fill the email field
     * @param email - The email to enter
     */
    async fillEmail(email: string) {
        await this.userEmailInput.fill(email);
        await expect(this.userEmailInput).toHaveValue(email);
    }

    /**
     * Fill the current address field
     * @param address - The current address to enter
     */
    async fillCurrentAddress(address: string) {
        await this.currentAddressInput.fill(address);
        await expect(this.currentAddressInput).toHaveValue(address);
    }

    /**
     * Fill the permanent address field
     * @param address - The permanent address to enter
     */
    async fillPermanentAddress(address: string) {
        await this.permanentAddressInput.fill(address);
        await expect(this.permanentAddressInput).toHaveValue(address);
    }

    /**
     * Click submit button
     */
    async clickSubmit() {
        await this.submitButton.click();
    }

    /**
     * Verify the output contains expected name
     * @param expectedName - The name that should appear in output
     */
    async verifyOutputContainsName(expectedName: string) {
        await expect(this.page.getByText(`Name:${expectedName}`)).toBeVisible();
    }

    /**
     * Verify the output contains expected email
     * @param expectedEmail - The email that should appear in output
     */
    async verifyOutputContainsEmail(expectedEmail: string) {
        await expect(this.page.getByText(`Email:${expectedEmail}`)).toBeVisible();
    }

    /**
     * Fill complete text box form and submit
     * @param userData - Object containing user data
     */
    async fillAndSubmitForm(userData: {
        name: string;
        email: string;
        currentAddress?: string;
        permanentAddress?: string;
    }) {
        await this.fillFullName(userData.name);
        await this.fillEmail(userData.email);

        if (userData.currentAddress) {
            await this.fillCurrentAddress(userData.currentAddress);
        }

        if (userData.permanentAddress) {
            await this.fillPermanentAddress(userData.permanentAddress);
        }

        await this.clickSubmit();
    }

    /**
     * Verify form submission results
     * @param expectedData - Expected data in the output
     */
    async verifyFormSubmission(expectedData: { name: string; email: string }) {
        await this.verifyOutputContainsName(expectedData.name);
        await this.verifyOutputContainsEmail(expectedData.email);
    }
}
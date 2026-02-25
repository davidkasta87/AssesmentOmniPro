import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    mobile: string;
    dateOfBirth?: string;
    subjects?: string[];
    hobbies?: string[];
    currentAddress?: string;
    state?: string;
    city?: string;
}

export class PracticeFormPage extends BasePage {
    // Form inputs
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly mobileInput: Locator;
    private readonly dateOfBirthInput: Locator;
    private readonly currentAddressInput: Locator;
    private readonly submitButton: Locator;

    // Gender radio buttons
    private readonly maleRadio: Locator;
    private readonly femaleRadio: Locator;
    private readonly otherRadio: Locator;

    // Hobby checkboxes
    private readonly sportsCheckbox: Locator;
    private readonly readingCheckbox: Locator;
    private readonly musicCheckbox: Locator;

    // Modal dialog
    private readonly confirmationDialog: Locator;

    constructor(page: Page) {
        super(page);

        // Form field locators
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        // Gender options
        this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
        this.femaleRadio = page.getByRole('radio', { name: 'Female', exact: true });
        this.otherRadio = page.getByRole('radio', { name: 'Other', exact: true });

        // Hobbies
        this.sportsCheckbox = page.getByRole('checkbox', { name: 'Sports' });
        this.readingCheckbox = page.getByRole('checkbox', { name: 'Reading' });
        this.musicCheckbox = page.getByRole('checkbox', { name: 'Music' });

        // Confirmation dialog
        this.confirmationDialog = page.getByRole('dialog', { name: 'Thanks for submitting the form' });
    }

    /**
     * Fill first name field
     */
    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Fill last name field
     */
    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Fill email field
     */
    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    /**
     * Select gender option
     */
    async selectGender(gender: 'Male' | 'Female' | 'Other') {
        const genderMap = {
            'Male': this.maleRadio,
            'Female': this.femaleRadio,
            'Other': this.otherRadio
        };
        await genderMap[gender].click();
    }

    /**
     * Fill mobile number
     */
    async fillMobile(mobile: string) {
        await this.mobileInput.fill(mobile);
    }

    /**
     * Fill date of birth (direct input to avoid calendar issues)
     */
    async fillDateOfBirth(dateString: string) {
        await this.dateOfBirthInput.fill(dateString);
    }

    /**
     * Select hobbies
     */
    async selectHobbies(hobbies: string[]) {
        const hobbyMap: { [key: string]: Locator } = {
            'Sports': this.sportsCheckbox,
            'Reading': this.readingCheckbox,
            'Music': this.musicCheckbox
        };

        for (const hobby of hobbies) {
            if (hobbyMap[hobby]) {
                await hobbyMap[hobby].click();
            }
        }
    }

    /**
     * Fill current address
     */
    async fillCurrentAddress(address: string) {
        await this.currentAddressInput.fill(address);
    }

    /**
     * Click submit button
     */
    async clickSubmit() {
        await this.submitButton.click();
    }

    /**
     * Fill complete form with user data
     */
    async fillCompleteForm(userData: UserFormData) {
        await this.fillFirstName(userData.firstName);
        await this.fillLastName(userData.lastName);
        await this.fillEmail(userData.email);
        await this.selectGender(userData.gender);
        await this.fillMobile(userData.mobile);

        if (userData.dateOfBirth) {
            await this.fillDateOfBirth(userData.dateOfBirth);
        }

        if (userData.hobbies && userData.hobbies.length > 0) {
            await this.selectHobbies(userData.hobbies);
        }

        if (userData.currentAddress) {
            await this.fillCurrentAddress(userData.currentAddress);
        }
    }

    /**
     * Submit form and wait for confirmation dialog
     */
    async submitForm() {
        await this.clickSubmit();
        await expect(this.confirmationDialog).toBeVisible();
    }

    /**
     * Verify form submission data in confirmation dialog
     */
    async verifySubmissionData(expectedData: UserFormData) {
        const fullName = `${expectedData.firstName} ${expectedData.lastName}`;

        await expect(this.confirmationDialog).toContainText(fullName);
        await expect(this.confirmationDialog).toContainText(expectedData.email);
        await expect(this.confirmationDialog).toContainText(expectedData.gender);
        await expect(this.confirmationDialog).toContainText(expectedData.mobile);

        if (expectedData.dateOfBirth) {
            // The date format changes from "15 Jan 1990" to "15 January,1990"
            await expect(this.confirmationDialog).toContainText('15 January,1990');
        }

        if (expectedData.hobbies && expectedData.hobbies.length > 0) {
            for (const hobby of expectedData.hobbies) {
                await expect(this.confirmationDialog).toContainText(hobby);
            }
        }

        if (expectedData.currentAddress) {
            await expect(this.confirmationDialog).toContainText(expectedData.currentAddress);
        }
    }

    /**
     * Fill form, submit, and verify - complete workflow
     */
    async completeFormWorkflow(userData: UserFormData) {
        await this.fillCompleteForm(userData);
        await this.submitForm();
        await this.verifySubmissionData(userData);
    }
}
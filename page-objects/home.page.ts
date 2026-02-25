import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    private readonly elementsCard: Locator;
    private readonly formsCard: Locator;
    private readonly alertsFrameWindowsCard: Locator;
    private readonly widgetsCard: Locator;
    private readonly interactionsCard: Locator;
    private readonly bookStoreCard: Locator;

    constructor(page: Page) {
        super(page);

        // Main section cards on homepage
        this.elementsCard = page.getByText('Elements');
        this.formsCard = page.getByRole('link', { name: 'Forms' });
        this.alertsFrameWindowsCard = page.getByText('Alerts, Frame & Windows');
        this.widgetsCard = page.getByText('Widgets');
        this.interactionsCard = page.getByText('Interactions');
        this.bookStoreCard = page.getByText('Book Store Application');
    }

    /**
     * Navigate to the home page
     */
    async navigateToHomePage() {
        await this.goto('/');
    }

    /**
     * Click on Elements section
     */
    async clickElements() {
        await this.elementsCard.click();
        await expect(this.page).toHaveURL(/.*elements/);
    }

    /**
     * Click on Forms section  
     */
    async clickForms() {
        await this.formsCard.click();
    }

    /**
     * Click on Alerts, Frame & Windows section
     */
    async clickAlertsFrameWindows() {
        await this.alertsFrameWindowsCard.click();
    }

    /**
     * Click on Widgets section
     */
    async clickWidgets() {
        await this.widgetsCard.click();
    }

    /**
     * Click on Interactions section
     */
    async clickInteractions() {
        await this.interactionsCard.click();
    }

    /**
     * Click on Book Store Application section
     */
    async clickBookStore() {
        await this.bookStoreCard.click();
    }

    /**
     * Verify all main sections are visible on homepage
     */
    async verifyAllSectionsVisible() {
        await expect(this.elementsCard).toBeVisible();
        await expect(this.formsCard).toBeVisible();
        await expect(this.alertsFrameWindowsCard).toBeVisible();
        await expect(this.widgetsCard).toBeVisible();
        await expect(this.interactionsCard).toBeVisible();
        await expect(this.bookStoreCard).toBeVisible();
    }
}
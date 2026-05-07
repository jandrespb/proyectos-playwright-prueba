import { Page } from 'playwright';
import { CheckoutLocators } from '../locators/CheckoutLocators';

export class CheckoutPage {
    constructor(private page: Page) { }

    async fillForm() {
        await this.page.fill(CheckoutLocators.firstName, 'John');
        await this.page.fill(CheckoutLocators.lastName, 'Doe');
        await this.page.fill(CheckoutLocators.postalCode, '12345');
        await this.page.click(CheckoutLocators.continueButton);
    }

    async finish() {
        await this.page.click(CheckoutLocators.finishButton);
    }

    async getConfirmationMessage(): Promise<string> {
        return this.page.locator(CheckoutLocators.confirmationMessage).innerText();
    }

    async getOrderNumber(): Promise<string> {
        return this.page.locator(CheckoutLocators.orderNumber).innerText();
    }
}
import { Page } from 'playwright';
import { CartLocators } from '../locators/CartLocators';
import { ProductModel } from '../model/ProductModel';

export class CartPage {
  constructor(private page: Page) {}

  async goToCart() {
    await this.page.click(CartLocators.cartIcon);
  }

  async getProduct(): Promise<ProductModel> {
    const item = this.page.locator(CartLocators.cartItem);
    return {
      name: await item.locator(CartLocators.productName).innerText(),
      price: await item.locator(CartLocators.productPrice).innerText()
    };
  }

  async goToCheckout() {
    await this.page.click(CartLocators.checkoutButton);
  }
}
import { Page } from 'playwright';
import { ProductLocators } from '../locators/ProductLocators';
import { ProductModel } from '../model/ProductModel';

export class ProductsPage {
  constructor(private page: Page) {}

  async getProduct(name: string): Promise<ProductModel> {
    const item = this.page.locator(`${ProductLocators.inventoryItem}:has-text("${name}")`);
    return {
      name: await item.locator(ProductLocators.productName).innerText(),
      price: await item.locator(ProductLocators.productPrice).innerText()
    };

   
  }

  async addToCart(name: string) {
    const item = this.page.locator(`${ProductLocators.inventoryItem}:has-text("${name}")`);
    await item.locator(ProductLocators.addToCartButton).click();
    await this.page.waitForTimeout(4000);
  }
}
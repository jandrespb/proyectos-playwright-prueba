import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../../main/pages/CartPage';
import { CheckoutPage } from '../../main/pages/CheckoutPage';
import { saveOrder } from '../../main/utils/OrderLogger';

Then('valida que el nombre y precio en el carrito coincidan', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  const cartProduct = await cartPage.getProduct();
  
  expect(cartProduct.name).toBe(this.selectedProduct!.name);
  expect(cartProduct.price).toBe(this.selectedProduct!.price);
});

Then('completa el proceso de compra', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.goToCheckout();
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.fillForm();
  await checkoutPage.finish();
});

Then('confirma que la orden fue realizada exitosamente', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  const message = await checkoutPage.getConfirmationMessage();
  const orderNumber = await checkoutPage.getOrderNumber();

  expect(message).toBe('Thank you for your order!');

  await saveOrder(orderNumber);
});
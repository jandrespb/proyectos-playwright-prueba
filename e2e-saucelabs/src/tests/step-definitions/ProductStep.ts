import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../../main/pages/ProductPage';
import { CartPage } from '../../main/pages/CartPage';



When('localiza el producto {string}', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page);
  this.selectedProduct = await productsPage.getProduct(productName);
});

When('almacena el nombre y precio del producto', async function (this: CustomWorld) {
  console.log(`Producto: ${this.selectedProduct?.name} - Precio: ${this.selectedProduct?.price}`);
});

When('añade el producto al carrito', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addToCart(this.selectedProduct!.name);

  const cartPage = new CartPage(this.page);
  await cartPage.goToCart();
});
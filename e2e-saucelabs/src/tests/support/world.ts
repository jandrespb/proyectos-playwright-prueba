import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { AllureCucumberWorld } from 'allure-cucumberjs';
import { Browser, BrowserContext, Page } from 'playwright';
import { ProductModel } from '../../main/model/ProductModel';

export class CustomWorld extends AllureCucumberWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  selectedProduct?: ProductModel;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
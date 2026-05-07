import { Before, After, AfterStep, BeforeAll} from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as allure from 'allure-js-commons';

let stepCounter = 0;

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

BeforeAll(async function () {
  if (!fs.existsSync('reports/screenshots')) {
    fs.mkdirSync('reports/screenshots', { recursive: true });
  }
});

After(async function (this: CustomWorld, scenario) {
  await this.page.screenshot({ path: `reports/screenshots/${scenario.pickle.name}.png` });

  await this.page.close();
  await this.context.close();
  await this.browser.close();
});


AfterStep(async function (this: CustomWorld, step) {
  stepCounter++;
  const screenshot = await this.page.screenshot({ 
    path: `reports/screenshots/${stepCounter}-${step.pickleStep.text}.png` 
  });
  await allure.attachment(
    step.pickleStep.text,
    screenshot,
    { contentType: 'image/png' }
  );
});
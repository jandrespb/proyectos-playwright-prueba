import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { GeneralPage } from '../../main/pages/GeneralPage';

Given('que el usuario ingresa a la página de Sauce Labs', async function (this: CustomWorld) {
    const generalPage = new GeneralPage(this.page);
    await generalPage.navigate('https://www.saucedemo.com/');
});
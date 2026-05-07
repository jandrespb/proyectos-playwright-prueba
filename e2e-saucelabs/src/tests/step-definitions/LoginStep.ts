import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../../main/pages/LoginPage';
import * as dotenv from 'dotenv';
import { LoginModel } from '../../main/model/LoginModel';

dotenv.config();

Given('realiza el login con credenciales válidas', async function (this: CustomWorld) {
  const credentials: LoginModel = {
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!
  };
  const loginPage = new LoginPage(this.page);
  await loginPage.login(credentials);
});
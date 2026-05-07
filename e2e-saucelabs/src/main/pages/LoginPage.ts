import { Page } from 'playwright';
import { LoginLocators } from '../locators/LoginLocators';
import { LoginModel } from '../model/LoginModel';

export class LoginPage {

  constructor(private page: Page) {}

  async login(credentials: LoginModel) {
    await this.page.fill(LoginLocators.username, credentials.username);
    await this.page.fill(LoginLocators.password, credentials.password);
    await this.page.click(LoginLocators.loginButton);
  }
}
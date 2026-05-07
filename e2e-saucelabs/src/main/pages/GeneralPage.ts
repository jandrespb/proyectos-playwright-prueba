import { Page } from 'playwright';

export class GeneralPage {
    
  constructor(private page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
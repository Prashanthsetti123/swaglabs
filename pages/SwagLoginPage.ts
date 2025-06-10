import { Page, Locator } from '@playwright/test';

export class SwagLoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async gotoLoginPage() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

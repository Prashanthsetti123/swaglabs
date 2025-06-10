import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly thankYouHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.thankYouHeader = page.locator('.complete-header');
  }

  async verifyOrderSuccess() {
    await expect(this.thankYouHeader).toHaveText('Thank you for your order!');
  }
}

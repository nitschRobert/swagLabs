import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBackpackButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    // Initialize other locators for inventory items as needed
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }
}

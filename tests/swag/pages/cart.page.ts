import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly itemQuantity: Locator;
  readonly itemName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemQuantity = page.getByTestId('item-quantity');
    this.itemName = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }
}

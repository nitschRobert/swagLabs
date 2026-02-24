import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PrimaryHeader } from '../pages/components/primaryHeader';
import { InventoryPage } from '../pages/inventory.page';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  primaryHeader: PrimaryHeader;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  primaryHeader: async ({ page }, use) => {
    await use(new PrimaryHeader(page));
  },
});

export { expect } from '@playwright/test';

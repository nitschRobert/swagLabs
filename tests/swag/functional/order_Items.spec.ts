import { expect, test } from '../fixtures/test';
import { PAGES, PRODUCTS } from '../test_data/test-data';

test.describe('Swag Labs functional tests', () => {
  test('should add single backpack to cart', async ({ inventoryPage, primaryHeader, cartPage }) => {
    await inventoryPage.goto();
    await expect(inventoryPage.page).toHaveURL(PAGES.INVENTORY);

    await inventoryPage.addBackpackButton.click();
    await expect(primaryHeader.cartBadge).toBeVisible();
    await expect(primaryHeader.cartBadge).toHaveText('1');

    await primaryHeader.cartLink.click();
    await expect(cartPage.page).toHaveURL(PAGES.CART);
    await expect(cartPage.itemName).toHaveCount(1);
    await expect(cartPage.itemName).toHaveText(PRODUCTS.BACKPACK.name);
    await expect(cartPage.itemQuantity).toHaveText('1');
  });

  test('should start checkout process', async ({ cartPage, checkoutPage }) => {
    await cartPage.goto();
    await expect(cartPage.page).toHaveURL(PAGES.CART);

    await cartPage.checkoutButton.click();
    await expect(checkoutPage.page).toHaveURL(PAGES.CHECKOUT_STEP_ONE);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeEnabled();
  });
});

import { test } from '@playwright/test';

test.describe('Swag Labs e2e tests', () => {
  test('should complete an order (generated code)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="username"]').press('Tab');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('1');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('2');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('3');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
  });
});

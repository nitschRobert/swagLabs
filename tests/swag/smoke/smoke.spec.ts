import { expect, test } from '../fixtures/test';
import { TEST_USERS, ERROR_MESSAGES, PAGES, API_ENDPOINTS } from '../test_data/test-data';

test.describe.configure({ mode: 'serial' });

test('Swag Labs endpoints should work correctly', async ({ request }) => {
  const response = await request.get(API_ENDPOINTS.HOMEPAGE);
  expect(response.status()).toBe(API_ENDPOINTS.EXPECTED_STATUS);
});

test.describe('Swag Labs smoke tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should not login with invalid credentials', async ({ loginPage }) => {
    await loginPage.userNameInput.fill(TEST_USERS.LOCKED_OUT.username);
    await loginPage.passwordInput.fill(TEST_USERS.LOCKED_OUT.password);
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.LOCKED_OUT_USER);
  });

  test('should login successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.userNameInput.fill(TEST_USERS.STANDARD.username);
    await loginPage.passwordInput.fill(TEST_USERS.STANDARD.password);
    await loginPage.loginButton.click();

    await expect(inventoryPage.page).toHaveURL(PAGES.INVENTORY);
  });
});

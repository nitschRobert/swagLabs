import { expect, test as setup } from '../fixtures/test';
import { TEST_USERS, PAGES } from '../test_data/test-data';

setup('should login successfully', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.userNameInput.fill(TEST_USERS.STANDARD.username);
  await loginPage.passwordInput.fill(TEST_USERS.STANDARD.password);
  await loginPage.loginButton.click();

  await expect(inventoryPage.page).toHaveURL(PAGES.INVENTORY);

  await inventoryPage.page.context().storageState({ path: 'playwright/.auth/user.json' });
});

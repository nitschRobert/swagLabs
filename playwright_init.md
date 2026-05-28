## Polecenie do inicjalizacji projektu:
npm init playwright@latest

## Polecenie do szybkiej inicjalizacji projektu (z domyślnymi opcjami):
npm init playwright@latest --yes -- --quiet 

## Polecenie do uruchomienia testów:
npx playwright test
npm run [...script name...]

## Konfiguracja Playwright playwright.config.ts po odchudzaniu:
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: process.env.CI ? 1 : undefined,
  reporter: [[ 'html' ], [ 'list' ]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

## flaky test example
import { test, expect } from "@playwright/test";


  test("flaky test 1", async ({ page }) => {
    // Arrange:
    const value1 = 1;
    const value2 = 2;
    let expectedSum = 3;


    if (Math.random() < 0.5) {
      expectedSum = 4;
    }


    // Act:
    const sum = value1 + value2;
    await page.waitForTimeout(1000);
    expect(sum).toBe(expectedSum);
  });


## https://playwright.dev/docs/intro
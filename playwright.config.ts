import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'smoke',
      testDir: './tests/swag/smoke',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'setup',
      testDir: './tests/swag/setup',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'functional',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testDir: './tests/swag/functional',
      dependencies: ['setup'],
    },
    {
      name: 'reqresApi',
      testDir: './tests/reqres',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

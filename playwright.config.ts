import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(path.dirname('/'), '.env') });

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  reporter: process.env.CI ? [['github'], ['html']] : [['html']],
  retries: process.env.CI ? 2 : 0,
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'on',
    trace: 'on',
    video: 'on',
  },

  /* Run local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'node .next/standalone/server.js' : 'pnpm start',
    reuseExistingServer: !process.env.CI,
    stderr: 'pipe',
    stdout: 'ignore',
    url: 'http://localhost:3000',
  },

  workers: process.env.CI ? 2 : undefined,
});

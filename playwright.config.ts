import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Use port 3001 (this app's dev port) instead of the default 3000, which
    // may be occupied by an unrelated dev server. Locally the running dev
    // server is reused; in CI a fresh one is started.
    command: 'next dev -p 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
});

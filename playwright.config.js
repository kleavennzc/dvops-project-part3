const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e', // Tells it to look in the e2e folder we will make later
  testMatch: /.*\.spec\.js/,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5050',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node index.js',
    url: 'http://localhost:5050',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 4173',
    // Em GitHub Actions o Vite deteta GITHUB_REPOSITORY e aplica /call-center-pro/.
    // Para testes E2E locais forçamos base='/' e URL /app.html.
    env: { GITHUB_REPOSITORY: '' },
    url: 'http://127.0.0.1:4173/app.html',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

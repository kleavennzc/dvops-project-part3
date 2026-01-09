const { test, expect } = require('@playwright/test');
import './playwright-coverage.js'; 

//  Playwright Test
test.describe('View Post Frontend', () => {
  test('Should load post page', async ({ page }) => {

    await page.goto('http://localhost:5050/post.html?id=1');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
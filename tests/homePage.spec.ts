import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

// test('Validate Salesforce Home tab is visible', async ({ page }) => {
//   await page.goto(process.env.SALESFORCE_URL!);

//   // Wait for the main layout to load completely
//   await page.waitForLoadState('networkidle');

//   const url = page.url();
//   console.log('📍 Current URL:', url);

//   const homeTab = page.locator('a[title="Home"]');

//   try {
//     await expect(homeTab).toBeVisible({ timeout: 15000 });
//     console.log('✅ Home tab is visible');
//   } catch (error) {
//     console.error('❌ Home tab not visible. Taking screenshot...');
//     await page.screenshot({ path: 'screenshots/home-tab-not-found.png', fullPage: true });
//     throw error;
//   }
// });

test('Validate Salesforce Home tab is visible', async ({ page }) => {
  console.log('📍 Navigating to Home page');
  await page.goto(process.env.SALESFORCE_URL! + '/lightning/page/home');
  await page.waitForLoadState('networkidle');

  console.log('🔍 Current URL:', page.url());
  //await page.waitForURL('**.force.com/**', { timeout: 120000 }); // ⏳ wait 2 minutes for login + MFA
  await page.waitForTimeout(12000);

  const homeTab = page.locator('text=Home');
  await expect(homeTab).toBeVisible({ timeout: 10000 });

  console.log('✅ Home tab visible. Test passed.');
});

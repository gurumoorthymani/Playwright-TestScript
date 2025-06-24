import { test, expect } from '@playwright/test';
import { loginWithSSO } from './loginWithSSO';
import * as dotenv from 'dotenv';

dotenv.config();

test('SSO login via Microsoft & validate Salesforce Home', async ({ page }) => {
  const username = process.env.SSO_USERNAME;
  const password = process.env.SSO_PASSWORD;
  const salesforceUrl = process.env.SALESFORCE_URL;

  if (!username || !password || !salesforceUrl) {
    throw new Error('❌ Missing environment variables: SSO_USERNAME, SSO_PASSWORD, or SALESFORCE_URL');
  }

  console.log(`🔐 Attempting login as: ${username}`);

  await loginWithSSO(page, username, password);

  await expect(page).toHaveURL(/.*\.salesforce\.com.*/);

  const homeTab = page.locator('a[title="Home"]');
  await expect(homeTab).toBeVisible();

  await page.screenshot({ path: 'screenshots/sso-login-success.png', fullPage: true });

  console.log('✅ SSO login test passed.');
});

// import { test as base, chromium } from '@playwright/test';
// import { loginWithMFA } from '../src/mfa';

// base('Login with MFA (fresh session)', async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext(); // brand-new session
//   const page = await context.newPage();

//   const username = 'gurumoorthy.manickam@kodak.com.dev';
//   const password = 'Awt@12345';
//   const mfaSecret = 'FXRDT3R2GEWZWWSHJNBWAHMXV5DR5L7A';

//   await loginWithMFA(username, password, mfaSecret, page);

//   await browser.close();
// });

import { test, expect, chromium } from '@playwright/test';
import { authenticator } from 'otplib';

test('Salesforce MFA login', async ({ page }) => {
  // Use a fresh context for each run
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: undefined });
  const username = 'your-username';
  const password = 'your-password';
  const totpSecret = 'YOUR_TOTP_SECRET'; // From your authenticator setup

  await page.goto('https://test.salesforce.com');

  // Step 1: Enter credentials
  await page.fill('#username', 'gurumoorthy.manickam@kodak.com.dev');
  await page.fill('#password', 'Awt@12345');
  await page.click('#Login');

  // Step 2: Wait for MFA input
  await page.waitForSelector('input[name="otp"]', { timeout: 60000 }); // Adjust selector if needed

  // Step 3: Generate and enter TOTP
  const token = authenticator.generate(totpSecret);
  console.log('Generated OTP:', token);
  await page.fill('input[name="otp"]', token);

  // Step 4: Confirm login success
  await page.waitForURL('**/home*'); // Or any post-login URL pattern
  expect(page.url()).toContain('home');
});
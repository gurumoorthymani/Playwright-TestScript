// Handle SSO alone
// import { Page } from '@playwright/test';
// import * as dotenv from 'dotenv';
// //dotenv.config({ path: './.env' });
// dotenv.config();

// export async function loginWithSSO(page: Page, username: string, password: string) {
//   await page.goto('https://kodak--uat.sandbox.lightning.force.com/');

//   await page.waitForURL('https://login.microsoftonline.com/**');

//   // Use the parameter directly (not redeclare)
//   console.log('SSO_USERNAME:', process.env.SSO_USERNAME);
//   console.log('SSO_PASSWORD:', process.env.SSO_PASSWORD ? '✔ loaded' : '✘ missing');


//   await page.fill('input[type="email"]', username);
//   await page.click('input[type="submit"]');

//   await page.waitForSelector('input[type="password"]', { timeout: 15000 });
//   await page.fill('input[type="password"]', password);
//   await page.click('input[type="submit"]');

//   const staySignedIn = page.locator('input[id="idBtn_Back"]');
//   if (await staySignedIn.isVisible({ timeout: 5000 })) {
//     await staySignedIn.click();
//   }

//   await page.waitForURL('**.force.com/**', { timeout: 30000 });
//   await page.waitForLoadState('load');
// }

// Handle SSO+MFA

import { Page } from '@playwright/test';
import { totp } from 'otplib';
import * as dotenv from 'dotenv';
dotenv.config();

export async function loginWithSSO(page: Page, username: string, password: string) {
  const salesforceUrl = process.env.SALESFORCE_URL;

  if (!salesforceUrl) {
    throw new Error('Missing SALESFORCE_URL in .env');
  }

  console.log(`🔗 Navigating to: ${salesforceUrl}`);
  await page.goto(salesforceUrl);

  // Wait for Microsoft login page
  await page.waitForURL('https://login.microsoftonline.com/**', { timeout: 30000 });

  console.log('🧑‍💼 Entering username...');
  await page.fill('input[type="email"]', username);
  await page.click('input[type="submit"]');

  console.log('🔐 Entering password...');
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });
  await page.fill('input[type="password"]', password);
  await page.click('input[type="submit"]');

  // 🔐 Handle MFA
  const mfaInput = page.locator('input[type="tel"], input[name="otc"], input[type="text"]');
  if (await mfaInput.isVisible({ timeout: 10000 }).catch(() => false)) {
    console.log('🔒 MFA page detected. Generating TOTP code...');

    const mfaSecret = process.env.MFA_SECRET;
    if (!mfaSecret) throw new Error('MFA_SECRET not set in .env');

    const mfaCode = totp.generate(mfaSecret);
    console.log(`🔑 Generated MFA code: ${mfaCode}`);

    await mfaInput.fill(mfaCode);
    await page.click('button:has-text("Verify"), button[type="submit"]');
  } else {
    console.log('ℹ️ MFA input not detected – skipping MFA step.');
  }

  // Optional: handle "Stay signed in?" dialog
  const staySignedIn = page.locator('input[id="idBtn_Back"]');
  if (await staySignedIn.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('📌 Clicking "No" on stay signed in prompt...');
    await staySignedIn.click();
  }

  // Wait for redirect back to Salesforce
  await page.waitForURL('**.force.com/**', { timeout: 60000 });
  await page.waitForLoadState('load');
  console.log('✅ SSO Login completed.');
}

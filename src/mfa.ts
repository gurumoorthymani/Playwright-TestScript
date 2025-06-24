import { Page, test} from '@playwright/test';
import { authenticator } from 'otplib';
import 'dotenv/config';


export async function loginWithMFA(
  Username: string,
  password: string,
  mfaSecret: string, // TOTP secret from Authenticator app
  page: Page
) {
  console.log('Starting login for:', Username);

  // Step 1: Navigate to Salesforce login
  await page.context().clearCookies();
    await page.goto('https://test.salesforce.com/');

  // Step 2: Enter credentials
  await page.getByRole('textbox', { name: 'Username' }).fill(Username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: /Log In to Sandbox/i }).click();

  // Step 3: Wait for MFA input
  await page.waitForSelector('input[name="otp"]', { timeout: 60000 });

  // Step 4: Generate and enter OTP using the shared secret
  const verificationCode = authenticator.generate(mfaSecret);
  console.log('Generated OTP:', verificationCode);
  await page.fill('input[name="otp"]', verificationCode);

  // Step 5: Click Verify
  await page.getByRole('button', { name: /Verify/i }).click();

  // Step 6: Wait for successful navigation
  await page.waitForURL(/lightning\.force\.com/, { timeout: 60000 });

  // Optional: Navigate to Accounts
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
}

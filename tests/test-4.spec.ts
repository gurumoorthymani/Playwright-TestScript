import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('textbox', { name: 'Verification Code' }).click();
  await page.getByRole('textbox', { name: 'Verification Code' }).fill('779093');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list');
});
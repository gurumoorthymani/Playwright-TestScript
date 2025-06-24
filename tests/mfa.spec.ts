
import { Page } from '@playwright/test';

export async function loginWithMFA(Username:string, password:string, VerificationCode: string, page:Page) {
    
  await page.goto('https://test.salesforce.com/');
  console.log('Inside the function :',Username ,password);

  await page.getByRole('textbox', { name: 'Username' }).fill(`${Username}`);
  await page.getByRole('textbox', { name: 'Password' }).fill(`${password}`);
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('textbox', { name: 'Verification Code' }).fill('779093');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list');
};
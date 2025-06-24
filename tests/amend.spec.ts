import { test, expect } from '@playwright/test';

// Update credentials and data accordingly
const USERNAME = 'gurumoorthy.manickam@kodak.com.dev';
const PASSWORD = 'Awt@12345'; // Ensure to append security token if required
const ACCOUNT_NAME = 'Aenta Life and Casualty';
const PRODUCT_NAME = '015-01284A-01 KODAK ACHIEVE';
const FIRST_COLUMN_OPTION = 'F-speed: Auto unload plate handling short table';
const SECOND_COLUMN_OPTION = 'Kodak';


test('amendAccountTest', async ({ page }) => {
  test.slow();

  // Step 1: Login
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
 // await page.waitForLoadState('networkidle');

  // Step 2: Navigate to Account
  await page.waitForURL('https://kodak--dev.sandbox.lightning.force.com/lightning/page/home');
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
  await page.getByRole('link', { name: ACCOUNT_NAME }).click();
  //await page.waitForLoadState('networkidle');

  // Step 3: Click "Amend Account"
  await page.getByText('Amend AccountAmend Account', { exact: true }).click();

   await page.getByRole('button', { name: 'ACHIEVE 800 PR - S SPEED' }).click();
   await page.locator('.strong-text lightning-primitive-input-checkbox .slds-checkbox__label .slds-checkbox_faux').first().click();

  // await page.getByRole('button', { name: '123 KODAK TRENDSETTER Q800 F-SPD PRT CNL TDL - 123' }).click();
  // await page.locator('lightning-primitive-input-checkbox input[type="checkbox"]').first().check();

  // Step 4: Click Confirm and handle popup
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Confirm' }).click();
  const popup = await page1Promise;
  await popup.waitForLoadState('load');

  // Step 5: Amend
  await popup.getByRole('button', { name: 'Amend' }).click();
  await popup.waitForLoadState('domcontentloaded');

  // Step 6: Add Products
  await popup.getByRole('button', { name: 'Add Products' }).click();

  // Step 7: Select Product
  const productRow = popup.locator('sb-swipe-container').filter({ hasText: PRODUCT_NAME });
  await productRow.getByRole('checkbox').check();
  await popup.getByRole('button', { name: 'Select', exact: true }).click();

  // Step 8: Fill dropdowns
  await popup.locator('#firstColumn select').selectOption({ label: FIRST_COLUMN_OPTION });
  await popup.locator('#secondColumn select').selectOption({ label: SECOND_COLUMN_OPTION });

  // Step 9: First Save
  await popup.getByRole('button', { name: 'Save' }).click();

  // Step 10: Final Save
  await popup.locator('.td .checkboxcontainer').first().click();
  await popup.getByRole('button', { name: 'Save', exact: true }).click();
});

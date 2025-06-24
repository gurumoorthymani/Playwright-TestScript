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
  await popup.waitForTimeout(50000);
  await popup.getByRole('button', { name: 'Add Products' }).click();

  // Step 7: Select Product
  const productRow = popup.locator('sb-swipe-container').filter({ hasText: PRODUCT_NAME });
  await productRow.getByRole('checkbox').check();
  await popup.getByRole('button', { name: 'Select', exact: true }).click();

  // Step 8: Fill dropdowns
  //await popup.waitForTimeout(60000);


  await popup.locator('#firstColumn ').selectOption({ label: `${FIRST_COLUMN_OPTION}` });
  await popup.locator('#secondColumn ').selectOption({ label: `${SECOND_COLUMN_OPTION}` });

  // Step 9: First Save
  await popup.getByRole('button', { name: 'Save' }).click();

  // Step 10: Final Save
  await popup.locator('.td .checkboxcontainer').first().click();
  await popup.getByRole('button', { name: 'Save', exact: true }).click();
});




/* import {test} from '@playwright/test';
import { loginToSalesforce } from '@utils/login';
import { readExcelData, TestData } from '@utils/excelReader';
import path from 'path';
const testData: TestData[] =readExcelData (path.resolve('C:/Users/Dharmeshwaran - 328/Downloads/loginCredential_1.xlsx'));

test.describe('Creating Work Oder and Assign Service Resource',() => {
        testData.forEach((data,index) => {

             test(`work order and Field Service`,async ({page})=>{
                test.slow();
                await loginToSalesforce(data.username,data.password,page);
                await page.getByRole('link', { name: 'Accounts', exact: true }).click();
                await page.getByRole('link', { name: 'RajKumar Testing Account' }).click();
                await page.getByText('Amend AccountAmend Account', { exact: true }).click();
                await page.locator('.strong-text > lightning-primitive-input-checkbox > .slds-form-element__control > .slds-checkbox > .slds-checkbox__label > .slds-checkbox_faux').first().click();
                const page7Promise = page.waitForEvent('popup');
                await page.getByRole('button', { name: 'Confirm' }).click();
                const page7 = await page7Promise;
                await page7.getByRole('button', { name: 'Amend' }).click();
                await page7.waitForTimeout(50000);
                //await page7.goto('https://kodak--dev--sbqq.sandbox.vf.force.com/apex/sbqq__sb?id=a22Su000000dEazIAE#quote/le?qId=a22Su000000dEazIAE');
                await page7.getByRole('button', { name: 'Add Products' }).click();
                await page7.waitForTimeout(30000);
                await page7.locator('sb-swipe-container').filter({ hasText: '015-01284A-01 KODAK ACHIEVE' }).getByRole('checkbox').click();
                await page7.getByRole('button', { name: 'Select', exact: true }).click();
                await page7.waitForTimeout(20000);
                await page7.waitForLoadState('domcontentloaded');
                //await page7.goto('https://kodak--dev--sbqq.sandbox.vf.force.com/apex/sbqq__sb?id=a22Su000000dEazIAE#/product/pc?qId=a22Su000000dEazIAE&groupKey=6&aId=a1N32000003sxdpEAA&pId=01t60000004jZW0AAM&redirectUrl=LineEditor&open=0');
                await page7.locator('#firstColumn').getByRole('combobox').selectOption('F-speed: Auto unload plate handling short table');
                await page7.waitForTimeout(20000);
                await page7.locator('#secondColumn #myselect').selectOption('Kodak');
                await page7.getByRole('button', { name: 'Save' }).click();
                await page7.waitForTimeout(20000);
                //await page7.goto('https://kodak--dev--sbqq.sandbox.vf.force.com/apex/sbqq__sb?id=a22Su000000dEazIAE#/quote/le?qId=a22Su000000dEazIAE&groupKey=6');
                await page7.locator('.td > .checkboxcontainer').first().click();
                await page7.getByRole('button', { name: 'Save', exact: true }).click();
                await page7.getByRole('button', { name: '' }).click();
            });

            
        });     

}); */
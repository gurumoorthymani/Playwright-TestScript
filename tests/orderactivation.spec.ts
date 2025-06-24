import { test, expect } from '@playwright/test';
import { loginToSalesforce } from '@utils/login';
import { openAppLauncher } from '@utils/appLauncher';
import { getOrderByQuoteId, getQuoteId } from '@utils/soqlHelper';
import { readExcelData, TestData } from '@utils/excelReader';
import path from 'path';

// Load Excel data
const filePath = path.resolve('C:/Users/Gurumoorthy-000122/Downloads/loginCredential_1.xlsx');
const testData: TestData[] = readExcelData(filePath);
 

console.log('Loaded Test Data:', testData); // Check BEFORE loop

test.describe('Order Activation tests', () => {
  test.use({viewport:{width:1920,height:1200}});
  testData.forEach((data, index) => {
    test(`Login and activate order for user #${index + 1} (${data.username})`, async ({ page }) => {
      console.log('Running test for:', data); // Confirm inside test

      // Login
      console.log(data.username);
      console.log(data.password);
      //username 
      await loginToSalesforce(data.username, data.password, page);

      // Open Salesforce CPQ
      await openAppLauncher('Salesforce CPQ', page);

      // Navigate to Quote
      await page.getByRole('link', { name: 'Quotes', exact: true }).click({ timeout: 40000 });
      await page.getByRole('link', { name: 'Q-157380' }).click();
      await page.getByRole('link', { name: 'Orders' }).click();

      // Fetch quote/order info
      const quoteId = await getQuoteId('Q-157380');
      console.log('Quote ID:', quoteId.Id);

      const order = await getOrderByQuoteId(`${quoteId.Id}`);
      console.log('Order:', order);

      // Click on order
      await page.getByRole('link', { name: order.OrderNumber }).click();

      // Add further test logic/assertions here
    });
  });
});

import { chromium, test, expect,Frame } from '@playwright/test';
import {Page}  from '@playwright/test';
import {loginToSalesforce} from '@utils/login';
import {openAppLauncher} from '@utils/appLauncher';
import { readExcelData, TestData } from '@utils/excelReader';
import path from 'path';

//test Data
const testData: TestData[] =readExcelData (path.resolve('C:/Users/Dharmeshwaran - 328/Downloads/loginCredential_1.xlsx'));
const appName = 'Asset 360';
test.describe('This test case for  Amend Account',() => {
        testData.forEach((data) => {

             test(`Amend Account`,async ({page})=>{
                test.slow();
                await loginToSalesforce(data.username,data.password,page);
                const isTitleVisible = await page.getByRole('heading', { name: appName }).isVisible();
                if (!isTitleVisible) 
                {
                    await openAppLauncher(appName, page);
                }
                await page.getByRole('link', { name: 'Locations' }).click();
                
                await page.getByRole('button', { name: 'New' }).click();
                await page.locator('label').filter({ hasText: 'PersonalPersonal Location' }).locator('span').first().click();
                await page.getByRole('button', { name: 'Next' }).click();
                await page.getByRole('textbox', { name: 'Location Name *' }).fill('Test Loction For Automation');
                await page.getByRole('textbox', { name: 'SLOC *' }).click();
                await page.getByRole('textbox', { name: 'SLOC *' }).fill('test001');
                await page.getByRole('textbox', { name: 'Description' }).click();
                await page.getByRole('textbox', { name: 'Description' }).fill('test for automation tool');
                await page.getByRole('combobox', { name: 'Field Location *' }).click();
                await page.getByRole('combobox', { name: 'Field Location *' }).fill('kodak');
                await page.waitForTimeout(7000);
                await page.getByRole('option', { name: 'Kodak SG FE Plant' }).click();
                await page.getByRole('combobox', { name: 'Service Resource Help Service' }).click();
                await page.getByRole('option', { name: 'Nishanth Sargunam Nishanth' }).click();
                await page.getByRole('textbox', { name: 'Country *' }).click();
                await page.getByRole('textbox', { name: 'Country *' }).fill('india');
                await page.getByRole('textbox', { name: 'External Reference *' }).click();
                await page.getByRole('textbox', { name: 'External Reference *' }).fill('testing Automation');
                await page.getByRole('button', { name: 'Save', exact: true }).click();
            });
        });    
    });        
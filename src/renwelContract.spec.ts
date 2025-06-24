import {test} from '@playwright/test';
import {loginToSalesforce} from '@utils/login';
import {openAppLauncher} from '@utils/appLauncher';
import { readExcelData, TestData } from '@utils/excelReader';
import {editQuoteProcess} from '@utils/editQuote';
import path from 'path';

//test Data
const testData: TestData[] =readExcelData (path.resolve('C:/Users/Dharmeshwaran - 328/Downloads/loginCredential_1.xlsx'));
export const PRODUCT_NAME = '015-01284A-01 KODAK ACHIEVE'; //015-01284A-01 KODAK ACHIEVE
export const configuration = 'F-speed: Auto unload plate handling short table';
export const plateProvider = 'Kodak';
const appName ='Salesforce CPQ'
test.describe('This test case for  Amend Account',() => {
        testData.forEach((data) => {

             test(`Amend Account`,async ({page})=>{
                test.slow();
                await loginToSalesforce(data.username,data.password,page);
                const isTitleVisible = await page.getByRole('heading', { name: appName }).isVisible();
                if (isTitleVisible) 
                {
                    await openAppLauncher(appName, page);
                }
                if (await page.getByRole('link', { name: 'Contracts' }).isVisible()) {
                    await page.getByRole('link', { name: 'Contracts' }).click();
                } else {
                    await page.getByRole('button', { name: 'Show more navigation items' }).click();
                    await page.getByRole('menuitem', { name: 'Contracts' }).click();
                }

                await page.getByRole('link', { name: '00055837' }).click();
                await page.getByRole('button', { name: 'Show more actions' }).click(); ////lightning-button-menu[@class='menu-button-item slds-dropdown_actions slds-dropdown-trigger slds-dropdown-trigger_click']//lightning-primitive-icon[@variant='bare'] //lightning-button-menu[class='menu-button-item slds-dropdown_actions slds-dropdown-trigger slds-dropdown-trigger_click'] lightning-primitive-icon[variant='bare']
                await page.getByRole('menuitem', { name: 'Amend' }).click();
                await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Amend' }).click();
                
                //await page.waitForTimeout(40000);
                
                await page.goto('https://kodak--dev.sandbox.lightning.force.com/one/one.app#eyJjb21wb25lbnREZWYiOiJvbmU6YWxvaGFQYWdlIiwiYXR0cmlidXRlcyI6eyJhZGRyZXNzIjoiaHR0cHM6Ly9rb2Rhay0tZGV2LnNhbmRib3gubGlnaHRuaW5nLmZvcmNlLmNvbS9hcGV4L3NicXFfX3NiP2lkPWEyMlN1MDAwMDAwZFVlOUlBRSJ9LCJzdGF0ZSI6e319');
                await editQuoteProcess(`${configuration}`,`${plateProvider}`,`${PRODUCT_NAME}`,page); 
            });
        });
    });
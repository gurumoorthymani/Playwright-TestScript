import { chromium, test, expect,Frame } from '@playwright/test';
import {Page}  from '@playwright/test';
import {loginToSalesforce} from '@utils/login';
import {openAppLauncher} from '@utils/appLauncher';
import { readExcelData, TestData } from '@utils/excelReader';
import path from 'path';
 
//test Data
const testData: TestData[] =readExcelData (path.resolve('C:/Users/Gurumoorthy-000122/Downloads/loginCredential_1.xlsx'));
export const appName = 'Salesforce CPQ';
export const recordToOpen = 'Aenta Life and Casualty';
export const selectAsset = 'ACHIEVE 800 PR - S SPEED'
export const productToSelect = '015-01284A-01 KODAK ACHIEVE';
 
// exexcutable steps
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
                await openTabAndRecord('Accounts',page,`${recordToOpen}`);
 
                await page.getByText('Amend AccountAmend Account', { exact: true }).click();
 
                //Selecting the Asset for amendment.
 
                await page.getByRole('button', { name: `${selectAsset}`}).click();
                await page.locator('.strong-text lightning-primitive-input-checkbox .slds-checkbox__label .slds-checkbox_faux').first().click();
 
                //this to handle the popup tab.
 
                const [popup] = await Promise.all([
                    page.waitForEvent('popup'),
                    page.getByRole('button', { name: 'Confirm' }).click(),
                ]);
 
                await popup.getByRole('button', { name: 'Amend' }).click({timeout:40000});
 
                //wait 30s for pageload
                await popup.waitForTimeout(20000);
 
                //call add product function
                await editQuoteLines(`${productToSelect}`,popup);
 
                //call configureProduct
               
                await popup.waitForTimeout(20000);
 
                await handleConfigureProduct(popup,30000);
 
                await popup.getByRole('button', { name: 'Save', exact: true }).click();
            });
        });
});
 
// function for reapted steps
 
// open sobject and select record
 
export async function openTabAndRecord(tabName:string,page:Page,record:string) {
 
    const isTabVisble = page.getByRole('link',{name:`${tabName}`,exact:true}).isVisible();
 
    if(!isTabVisble)
    {
      console.warn('tab not click')
    }
    else{
        await page.getByRole('link',{name:`${tabName}`,exact:true}).click();
    }
 
    const recordOpen = page.getByRole('link', { name:`${record}` }).isVisible();
   
    if(!recordOpen)
    {
        const objectName = tabName.slice(0,-1);
        await page.goto(`https://kodak--dev.sandbox.lightning.force.com/lightning/o/${objectName}/list?filterName=__Recent`);
        console.log('Tab Not Click')
        await page.getByRole('link', { name: `${record}` }).click();
    }
    else
    {
        await page.getByRole('link', { name: `${record}` }).click();
    }
   
 
}
 
//click amend Account and handle until new tab open
 
export async function editQuoteLines(productCode:string,currentPage:Page) {
     await currentPage.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 60000 });
        await currentPage.getByRole('button', { name: 'Add Products' }).click({timeout:20000});
 
        // Step 8: Select product
        const productToSelect = currentPage.locator('sb-swipe-container').filter({ hasText: `${productCode}`}).getByRole('checkbox').isVisible();
        if(!productToSelect){
            console.warn(`No Record found on ${productCode}`);
        }
        else{
            await currentPage.locator('sb-swipe-container').filter({ hasText: `${productCode}`}).getByRole('checkbox').click();
        }
 
        await currentPage.getByRole('button', { name: 'Select', exact: true }).waitFor();
        await currentPage.getByRole('button', { name: 'Select', exact: true }).click();
}
 
//for handle mainFrame
export async function handleConfigureProduct(currentPage:Page,timeout:number) {
   
    await currentPage.locator('#firstColumn').getByRole('combobox').click();
 
    await currentPage.locator('#firstColumn')
                .getByRole('combobox')
                .selectOption({ label: 'F-speed: Auto unload plate handling short table' });
    await currentPage.waitForTimeout(timeout);
   
    await currentPage
            .locator('#secondColumn')
            .selectOption({ label: 'Kodak' });
    await currentPage.waitForTimeout(timeout);
    await currentPage.getByRole('button', { name: 'Save' }).click();
}
 
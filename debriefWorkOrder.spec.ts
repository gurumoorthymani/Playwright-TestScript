import {test,expect} from '@playwright/test';
import { loginToSalesforce } from '@utils/login';
import { openAppLauncher } from '@utils/appLauncher';
import { readExcelData, TestData } from '@utils/excelReader';
import path from 'path';


// Load Excel data
const appToSwitch = 'Asset 360';
const  testRecord = '00021407';
const testData: TestData[] = readExcelData(
  path.resolve('C:/Users/Dharmeshwaran - 328/Downloads/loginCredential_1.xlsx'));

test.describe('Test Case For Debrief Work Order',()=>{
   testData.forEach((data)=>{
         
    test('debrief work order',async({page})=>{

        test.slow();

        await loginToSalesforce(data.username, data.password,page);
        
        await page.waitForLoadState("load");

        const currentApp = page.locator('//h1[@class="appName slds-context-bar__label-action slds-context-bar__app-name"]');
        await currentApp.waitFor({timeout:20000,state:'visible'});
        
        if(await currentApp.textContent() !== appToSwitch)
        {
            await openAppLauncher(appToSwitch,page);
        }
        
        await page.waitForLoadState("load");
        await page.waitForTimeout(5000);

        const tabToSwitch = page.locator('a[title="Work Orders"]');
        
        const countOFTab = await tabToSwitch.count();
        
        console.log(countOFTab);
        
        await tabToSwitch.click();

        await page.waitForTimeout(10000)
            
        // const button = page.locator("//button[@title='Select a List View: Work Orders']");
      
        // await button.waitFor({state:'visible',
        //     timeout:10000
        // });
        // await button.click();
        
        // const searchBox = page.getByRole('combobox', { name: 'Search lists...' });
        // await searchBox.waitFor({ state: 'visible' });
        // await searchBox.fill('All Work Orders');

        // // Step 3: Wait for the dropdown option to appear and click it
        // const option = page.locator("//span[normalize-space()='All Work Orders']");
        
        // // handle multiple element in contains same value in it 
        // const count = await option.count();
        
        // if( count > 0)
        // {
        //     for(let i=0;i< count;i++){
        //     const text = await option.nth(i).textContent();
            
        //     if(text?.trim() === 'All Work Orders')
        //     {
        //         const choice = option.nth(i);
        //         await choice.waitFor({ state: 'visible' });
        //         await choice.click();
        //     }
        //     break;
        //     }
        // }
        // else
        // {
        //     throw new Error("No All Work Order option found in the list view.");
        // }  
        
        const  searchList = page.locator("//input[@type='search' and @placeholder= 'Search this list...' and @name='Work Order-search-input']");
        await searchList.waitFor({state:'visible',timeout:10000});
        await searchList.fill(`${testRecord}`);
        await page.keyboard.press('Enter');

        const testWorkOrder = page.locator(`//a[@class='slds-truncate'and @title=${testRecord}]`);
        await testWorkOrder.waitFor({state:'visible',timeout:10000});
        await testWorkOrder.click();
        
        await page.waitForLoadState("load");
        await page.waitForTimeout(10000);

        await page.waitForSelector('xpath=//div[@data-id="Debrief Work Order"]/..', {
            state: "visible",
            timeout: 15000,
        });

        const Debrief = page.locator('xpath=//div[@data-id="Debrief Work Order"]/..');
        await page
            .locator('xpath=//div[@data-id="Debrief Work Order"]/..')
            .evaluate((ele) => {
            ele.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "center",
            });
            });
            
        await Debrief.click();
        const pageTitle = page.locator(`//div[text()='Work Order ${testRecord} - Debrief']`);
        await pageTitle.waitFor({state:'visible',timeout:10000});
        
        const addLabourAllowance = page.locator('//button[@title="Add Labor, Travel or Fee"]');
        await addLabourAllowance.waitFor({state:'visible',timeout:5000});
        await addLabourAllowance.click();
        
        await page.waitForSelector('//h2[text()="Labor, Travel & Fee Items"]');
        const  reason = 'TRAVEL';

        const selectFee = page.locator('//button[@aria-label="Select Labor, Travel or Fee Item"]')
        await selectFee.click();
        
        const optionToSelect = page.getByRole('option', { name: `${reason}` });
        await optionToSelect.waitFor({state:'visible',timeout:5000});
        await optionToSelect.click();

        const  serviceResource = page.locator('//label[text()="Select Service Resource"]');
        await serviceResource.waitFor({state:'visible',timeout:5000});
        await serviceResource.click();

        const person = 'Guru';
        const resource = page.locator('//div[@aria-label="Select Service Resource"]')
        await resource.click();
        
        await page.getByRole('combobox', { name: 'Select Service Resource' }).click();
        await page.getByRole('option', { name: `${person}` }).click();
        
        await page.waitForSelector('//lightning-datepicker//input[@name="startDt"]',{state:'visible',timeout:5000});
        
        await page.locator('//lightning-datepicker//input[@name="startDt"]').clear();
        await page.locator('//lightning-timepicker//input[@name="startDt"]').clear();
        
        await page.waitForTimeout(5000);

        

        await page.locator('//lightning-datepicker//input[@name="startDt"]').fill('Jun 22, 2025');
        
        await page.waitForTimeout(5000);
        
        await page.waitForSelector('//lightning-datepicker//input[@name="endDt" ]',{state:'visible',timeout:5000});
    
        await page.locator('//lightning-datepicker//input[@name="endDt"]').first().fill('Jun 23, 2025');
        await page.locator('//lightning-timepicker//input[@name="endDt"]').fill('1:00 PM');

        await page.getByRole('button', { name: 'Save' }).click();
        
        await page.waitForTimeout(15000);

        const consumePart = page.locator('//button[@title="Consume Part" and @type="button"]');
        await consumePart.click();

        await page.waitForSelector("//h2[text()='Product Consumption Process']",{timeout:5000,state:'visible'});

        const consignment = page.locator('//button[@type="button" and text()="Consignment"]');
        await consignment.waitFor({state:'visible',timeout:2000});
        await consignment.click();
        await page.waitForSelector("//div[text() = 'Consignment Items']",{state:'visible',timeout:7000});
        
        const noOfQuantity = '1';
        
        const tableHeader1 = page.locator('//div[@title="Qty Consumed" and text()="Quantity Consumed"]');
        
        await tableHeader1.waitFor({state:'visible',timeout:5000});
    
        const inputBox = page.locator('//input[@name="qtyConsumed"]');
        await inputBox.waitFor({state:'visible',timeout:5000});
        
        await inputBox.fill(`${noOfQuantity}`);
        
        await page.waitForTimeout(5000);

        const  tableHeader2 = page.locator('//table//thead//tr//th//div[text()="Select"]');
         await tableHeader2.waitFor({state:'visible',timeout:5000});
         
        const inputcheckBox = page.locator('//input[@type="checkbox" and @name="prodSelect"]');
        
        await inputcheckBox.waitFor({state:'visible',timeout:5000});  

        if((await inputcheckBox.isEditable())){
            
            //await inputcheckBox.click();
            await page.getByRole('row', { name: 'PR-6269 SP500-06113C ASSY,EM,' }).locator('lightning-primitive-input-checkbox span').nth(1).click();
        }
        
        await page.getByRole('button', { name: 'Save' }).click();

       await page.waitForSelector('//a[@data-label="Products Consumed" and @role="tab"]',{state:'visible',timeout:5000});
       await page.locator('//a[@data-label="Products Consumed" and @role="tab"]').click();

       await page.waitForSelector('//button[@title="Consume All" and @type="button"]',{state:'visible',timeout:5000});
       await page.locator('//button[@title="Consume All" and @type="button"]').click();

       await page.locator('//button[@title="Finish Debrief Process and Return to Work Order"]').click();
       
   
    });
   });
});

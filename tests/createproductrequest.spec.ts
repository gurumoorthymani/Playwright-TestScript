import {test,expect,Page} from "@playwright/test";
 
test('CreateProductRequest',async({page}) =>{
   
    test.slow();
    await page.goto('https://test.salesforce.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
    await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
 
    await page.getByRole('link', { name: 'Work Orders' }).click();
    await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/WorkOrder/list?filterName=__Recent');
    await page.getByRole('link', { name: '00021472' }).click();
    await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/r/WorkOrder/0WOSu000004hKxFOAU/view');
    await page.getByText('Create Product RequestCreate Product Request', { exact: true }).click();
    await page.getByRole('button', { name: 'SEARCH WAREHOUSE STOCK' }).click();
    await page.getByRole('searchbox', { name: 'Search Parts' }).fill('ASSY-PUSH BUTTON ENCLOSURE (FRU)');
    await page.getByRole('button', { name: 'Search for Parts in Central' }).click();
    const Product =  await page.getByRole('gridcell', { name: 'Select Item' });
    await Product.locator('span').nth(1).click();
    await expect(Product.locator('span').nth(1)).toBeChecked();
    await page.getByRole('button', { name: 'Add Part(s)' }).click();
    let timesRunComboBox = 0 //this to move next comboBox so need to increment this after first execution
    await comboboxHandler('Next Day Saturday',page,timesRunComboBox);
    console.log(timesRunComboBox);
    timesRunComboBox++; //icreament here
    console.log(timesRunComboBox);
    await comboboxHandler('Impaired',page,timesRunComboBox);
    await page.getByRole('button', { name: 'CHECK AVAILABILITY' }).click();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
});
async function comboboxHandler(needtoSelect:string,page:Page,nthTime:number)
{  
    const comboboxes = page.locator("button[role='combobox']:has(span.slds-truncate)");
    if(comboboxes && nthTime!== null)
      {
          await comboboxes.nth(nthTime).click();
          await page.getByRole('option', { name: `${needtoSelect}` }).click()
        }
}
 
import {test,expect,Page} from "@playwright/test";

test('TestForProductRequest',async({page}) =>{
    
    test.slow();
    await page.goto('https://kodak--uat.sandbox.lightning.force.com//');
    await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.uat');
    // await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
    await page.getByRole('textbox', { name: 'Password' }).fill('Gowri@4878');
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

async function dynamic_Dropdown (needtoSelect:string, locator:string, page:Page)
    {
      let choiceToBeSelected = needtoSelect;
      const currentDropdownValues =  await page.locator(`${locator} option`).allInnerTexts();
      for(let i=0;i<currentDropdownValues.length;i++)
      {
        if(currentDropdownValues[i].trim() === choiceToBeSelected)
        {
          await page.locator(locator).selectOption({ label: choiceToBeSelected });
        }
      }
    }
 /* await page.locator('#combobox-button-1119').click();
    await page.getByRole('option', { name: 'Next Day Saturday' }).locator('span').nth(1).click();
    await page.locator('#combobox-button-1123').click();
    await page.getByText('Impaired', { exact: true }).click();
    await page.getByRole('button', { name: 'CHECK AVAILABILITY' }).click();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.getByRole('button', { name: 'SEARCH PERSONAL/TACTICAL STOCK' }).click();
    await page.getByRole('searchbox', { name: 'Search Other Field Inventory' }).click();
    await page.getByRole('button', { name: 'Close', exact: true }).click(); */

    /* id attribute is not available for this element
      name attribute is not available for this element
      //span[normalize-space()='Select Shipping method']  //span[normalize-space()='Select Shipping method']
      button[id='combobox-button-1979'] span[class='slds-truncate'] //button[id='combobox-button-161'] span[class='slds-truncate']
      document.querySelector("button[id='combobox-button-1979'] span[class='slds-truncate']")  //document.querySelector("button[id='combobox-button-161'] span[class='slds-truncate']")

    */
   /* button[id='combobox-button-165'] span[class='slds-truncate'] 
   //span[normalize-space()='Select Severity']
   */
  //await dynamic_Dropdown('Next Day Saturday','#combobox-button-1120',page);
    //await dynamic_Dropdown('Impaired','#combobox-button-1124',page);
    /* await page.locator('div#dropdown-element-1119').click();
    await page.locator('combobox-button-1119-0').selectOption({ label: 'Next Day Saturday' }) */
    // Click on the combobox/dropdown
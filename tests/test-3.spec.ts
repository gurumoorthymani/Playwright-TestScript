import { test, expect } from '@playwright/test';
import {Page}  from '@playwright/test';
 
test('test', async ({ page }) => {
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
  await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('link', { name: 'Assets', exact: true }).click({timeout:20000});
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Asset/list?filterName=__Recent');
  await page.getByRole('link', { name: 'VIRT WF SERVER, TIER 2-SECOND (HYPERV)' }).click({timeout:30000});
 
  await page.getByText('Create CaseCreate Case', { exact: true }).click({timeout:50000});
  await page.locator('[name=CaseTypeSelect]').click({timeout:30000});
  await dynamic_Dropdown('Service Request','[name=CaseTypeSelect]',page);
 
  await page.locator('[name=SRContactPicklist1]').click({timeout:20000});
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
 
  await page.locator("xpath=//button[normalize-space()='Next']").click();
 
  await dynamic_Dropdown('ServiceAndRepair','[name=Case_Subtype1]',page);
  await dynamic_Dropdown('Email','[name=Case_Origin]',page);
  await dynamic_Dropdown('Impaired','[name=Severity]',page);
  await dynamic_Dropdown('Yes','[name=Connection_Permitted]',page);
 
  await page.getByRole('textbox', { name: 'Subject' }).fill('test for automation tool');
  await page.getByRole('textbox', { name: 'Description' }).fill('Test for playwright automation tool');
  await page.locator("xpath=//button[normalize-space()='Next']").click();
 
});
async function dynamic_Dropdown (needtoSelect:string, locator:string, page:Page)
{
  let choiceToBeSelected = needtoSelect;
  const currentDropdownValues =  await page.locator(`${locator} option`).allInnerTexts();
  console.log(currentDropdownValues);
  console.log(choiceToBeSelected);
  for(let i=0;i<currentDropdownValues.length;i++)
  {
    if(currentDropdownValues[i].trim() === needtoSelect)
    {
     console.log(currentDropdownValues[i].trim()); 
    await page.locator(locator).selectOption({ label: needtoSelect });
    }
  }
}
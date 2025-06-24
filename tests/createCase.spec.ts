import { test, expect, chromium } from '@playwright/test';
import {Page}  from '@playwright/test';

test('TestForCaseCreation', async ({page} ) => {
  test.slow();
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
 
  await page.locator('[name=SRContactPicklist1]').waitFor({ state: 'visible', timeout: 20000 });
  await waitForElementAndRetry(page,5,'[name=SRContactPicklist1]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
 
  await page.locator("xpath=//button[normalize-space()='Next']").click();
 
  await page.locator('[name=Case_Subtype1]').waitFor({ state: 'visible', timeout: 20000 });

  await dynamic_Dropdown('Service And Repair','[name=Case_Subtype1]',page);
  await dynamic_Dropdown('Email','[name=Case_Origin]',page);
  await dynamic_Dropdown('Impaired','[name=Severity]',page);
  await dynamic_Dropdown('Yes','[name=Connection_Permitted]',page);
 
  await toHandleTextbox(page,'Subject','test for automation tool',5,'textbox');
  await toHandleTextbox(page,'Description','Test for playwright automation tool',5,'textbox');
  await page.locator("xpath=//button[normalize-space()='Next']").click();

});

//this function is to handle the picklist field in the  custom component 

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

// this function is used to retry current test step untill the element found (need send no of retries ) specifically for page.locator

async function waitForElementAndRetry(page: Page, maxRetries: number, selector: string): Promise<void> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try 
    {
      if (page.isClosed()) {
        throw new Error('Page is closed — aborting retry.');
      }
      await page.waitForSelector(selector, { timeout: 5000 }); // Optional short timeout
      await page.locator(selector).click();  
      return;
    } 
    catch (error) {
      console.warn(`Attempt ${attempt + 1} failed, retrying...`, error);
      if (page.isClosed()) {
        throw new Error('Page was closed during retry logic.');
      }
      await page.waitForTimeout(60000); // Wait 60 seconds before retry
      attempt++;
      
    }
  }

  throw new Error(`Failed to click selector "${selector}" after ${maxRetries} retries`);
}



async function  toHandleTextbox(page:Page,locator:string, textValue:string,maxRetries:number,dataType:String) 
{
let attempt = 0;
  while (attempt < maxRetries) 
    {
      try 
        {
          if (page.isClosed()) 
          {
            throw new Error('Page is closed — aborting retry.');
          }
          if(dataType === 'textbox')
          {
            await page.getByRole('textbox',{ name: `${locator}` }).fill(`${textValue}`);
            
            return;
          }          
    } 
    catch (error) 
    {
      console.warn(`Attempt ${attempt + 1} failed, retrying...`,error);
      if (page.isClosed()) 
      {
        throw new Error('Page was closed during retry logic.');
      }
      await page.waitForTimeout(50000);
      
      attempt++;
     }
  }
  throw new Error('Failed to select option after maximum retries');
}

// this function is used to retry current test step untill the element found (need send no of retries ) specifically for page.getByRole(link)

async function toHandleNavTabs (page:Page,locator:string,dataType:string,maxRetries:number){
let attempt = 0;
  while (attempt < maxRetries) 
    {
      try 
        {
          if (page.isClosed()) 
          {
            throw new Error('Page is closed — aborting retry.');
          }
          if(dataType === 'link')
          {
            await page.getByRole('link',{ name: `${locator}` }).click();
            return;
          }          
    } 
    catch (error) 
    {
      console.warn(`Attempt ${attempt + 1} failed, retrying...`,error);
      if (page.isClosed()) 
      {
        throw new Error('Page was closed during retry logic.');
      }
      await page.waitForTimeout(60000);
      attempt++;
     }
  }
  throw new Error('Failed to select option after maximum retries');
}

/* 
const caseOptions = await page.locator('[name="CaseTypeSelect"] option').allInnerTexts();
  console.log('Dropdown options:', caseOptions);
  for (let i = 0; i < caseOptions.length; i++) {
  if (caseOptions[i].trim() === caseType) 
    {
      console.log(`Found '${caseType}' at index ${i}`);
      await page.locator('[name="CaseTypeSelect"]').selectOption({ label: caseType });
      break;
    }
  }
*/

/* export default defineConfig(
  {
    use :{
      browserName:'chromium',
      headless:false,
      launchOptions:{
        slowMo: 10000,
      },
    },
  });  
*/

/* const browser = await chromium.launch({ headless: false, slowMo: 10000 });
  const context = await browser.newContext();
  const page = await context.newPage(); 
*/
//await page.getByText('Create CaseCreate Case',{exact:true}).click({timeout:50000});
//await page.locator('[name=CaseTypeSelect]').click({timeout:30000});

//await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
//await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
//await page.getByRole('link', { name: 'Assets', exact: true }).click({timeout:20000});
//await page.getByRole('link', { name: 'VIRT WF SERVER, TIER 2-SECOND (HYPERV)' }).click({timeout:40000});
// this function is used to retry current test step untill the element found (need send no of retries ) specifically for page.getByText

async function retryCurrentStep(page: Page, selector: string, maxRetries: number): Promise<void> 
{
  let attempt = 0;
  while (attempt < maxRetries) 
    {
      try 
      {
        if (page.isClosed()) 
        {
         throw new Error('Page is closed — aborting retry.');
        }
        await page.getByText(selector, { exact: true }).click();
       
        return;
      }  
      catch (error) 
      {
        console.warn(`Attempt ${attempt + 1} failed, retrying in 20s...`, error);
        if (page.isClosed()) 
        {
          throw new Error('Page was closed during retry logic.');
        }
        await page.waitForTimeout(30000);
        attempt++;
       
      }
    }
  throw new Error(`Failed to click selector "${selector}" after ${maxRetries} attempts`);
}

// this function is used to retry current test step untill the element found (need send no of retries ) specifically for page.getByRole(textbox)

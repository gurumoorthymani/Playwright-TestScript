import { chromium, test, expect, Frame } from '@playwright/test';

import { defineConfig } from '@playwright/test';
 export default defineConfig(
  {
    use :{
      browserName:'chromium',
      headless:false,
      launchOptions:{
        slowMo: 10000,
      },
    },
  });  
 
test('test', async ({page}) => {
  test.slow();

  /*const browser = await chromium.launch({ headless: false, slowMo: 10000 });
  const context = await browser.newContext();
  const page = await context.newPage();*/

 await page.goto('https://test.salesforce.com/');
 await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
 await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
 await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  //await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
 /* await page.getByRole('button', { name: 'App Launcher' }).click({timeout: 30000});
  await page.getByRole('option', { name: 'Salesforce CPQ' }).click({timeout: 30000});*/
  await page.getByRole('link', { name: 'Quotes', exact: true }).click();
  await page.getByRole('link', { name: 'Q-157678' }).click();
  await page.getByRole('button', { name: 'Edit Lines' }).click({timeout: 60000});
  //await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().getByRole('button', { name: 'Add Products' }).click();
 // await page.waitForTimeout(10000);

 // Step 1: Wait for the iframe to be attached and get its handle
const iframeHandle = await page.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 30000 });

// Step 2: Get the frame's content safely
const frame = await iframeHandle.contentFrame();
if (!frame) throw new Error('iframe contentFrame is null - frame may not be loaded');

// Step 3: Wait for the "Add Products" button and click it
await frame.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 20000 });
await frame.getByRole('button', { name: 'Add Products' }).click();


  // const iframeHandle = await page.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 30000 });
  // //const iframeHandle = await page.waitForSelector('iframe', { timeout: 1000 });

// console.log('iframeHandle:', iframeHandle);
// const frame = await iframeHandle.contentFrame();
// const allIframes = await page.$$('iframe');
//console.log(`Found ${allIframes.length} iframes`);


if (!frame) {
  throw new Error('Iframe contentFrame is null - iframe not loaded yet');
}

// Now you can safely use `frame`
// await frame.waitForSelector('button:has-text("Add Products")', { timeout: 15000 });
// const button = frame.locator('button', { hasText: 'Add Products' });
// const buttonId = await button.getAttribute('id');
// console.log('Button ID:', buttonId);

  // const button = page.locator('button', { hasText: 'Add Products' });
  // const buttonId = await button.getAttribute('id');
  // console.log('Button ID:', buttonId);

  // if (buttonId) {
  //   console.log('Clicking button with ID:', buttonId);
  //   await page.click(`#${buttonId}`); // Use backticks here ✅
  // } else {
  //   console.error('Button ID not found!');
  // }


//await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().getByRole('button', { name: 'Add Products' }).click();
//await page.frameLocator('iframe[name="vfFrameId_1748933208752"]').getByRole('button', { name: 'Add Products' }).click();
//await page.locator('iframe[name^="vfFrameId_"]').waitFor({ state: 'attached', timeout: 10000 });
//const button = page.getByRole(('#mainButton').getByRole('button', { name: 'Add Products' });

// await expect(button).toBeVisible({ timeout: 10000 });
// await button.click();



/*async function clickButtonInIframe() {
    const frame = await page.frameLocator('iframe[name="vfFrameId_1748933208752"]');
    for (let i = 0; i < 3; i++) { // Retry 3 times if needed
        try {
            await frame.locator('button:has-text("Add Products")').click();
            console.log('Button clicked successfully');
            return;
        } catch (error) {
            console.warn(`Retry ${i + 1}: Button not found, waiting...`);
            await page.waitForTimeout(2000);
        }
    }
    console.error('Failed to click the button after retries.');
}

await clickButtonInIframe();*/
//await page.waitForTimeout(60000);

/*async function clickButton() {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const frame = await page.frameLocator('iframe[name="vfFrameId_1748933208752"]');
            await page.waitForTimeout(30000);
            await frame.locator('.groupButton notLast --desktop').click({timeout: 30000});
            console.log('Button clicked successfully.');
            return;
        } catch (error) {
            console.warn(`Retry ${attempt + 1}: Waiting before trying again...`);
           // await page.waitForTimeout(2000);
        }
    }
    console.error('Failed to click the button after multiple attempts.');
}
await clickButton();
await page.waitForTimeout(60000);*/



  // await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('sb-swipe-container').filter({ hasText: '015-01284A-01 KODAK ACHIEVE' }).getByRole('checkbox').click();
  // await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Select', exact: true }).click();
  
//   // Step 1: Wait for the iframe and get its frame object
// const iframeElement = await page.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 30000 });
// const vfFrame = await iframeElement.contentFrame();
// if (!vfFrame) throw new Error('iframe contentFrame is null');

// // Step 2: Wait for the checkbox inside 'sb-swipe-container' with matching text
// await vfFrame.locator('sb-swipe-container')
//   .filter({ hasText: '015-01284A-01 KODAK ACHIEVE' })
//   .getByRole('checkbox')
//   .waitFor({ timeout: 20000 });
//   await page.getByRole('checkbox').click();

// // await vfFrame
// //   .locator('sb-swipe-container')
// //   .filter({ hasText: '015-01284A-01 KODAK ACHIEVE' })
// //   .getByRole('checkbox')
// //   .click();

// // Step 3: Wait for and click the 'Select' button
// const selectButton = vfFrame.getByRole('button', { name: 'Select', exact: true });
// await selectButton.waitFor({ timeout: 20000 });
// await selectButton.click();

// Wait for all matching iframes
 const iframeLocators = page.locator('iframe[name^="vfFrameId_"]');
 const iframeCount = await iframeLocators.count();
 console.log(`Found ${iframeCount} matching iframes`);

 for (let i = 0; i < iframeCount; i++) {
   const singleIframe = iframeLocators.nth(i);
   const isVisible = await singleIframe.isVisible();
   if (isVisible) {
     const vfFrame = await singleIframe.contentFrame();
     if (vfFrame) {
       // Now interact with vfFrame here
       console.log(`Using iframe index ${i}`);
      
       // Your checkbox logic
       await vfFrame
         .locator('sb-swipe-container')
         .filter({ hasText: '015-01284A-01 KODAK ACHIEVE' })
         .getByRole('checkbox')
         .waitFor({ timeout: 20000 });
  
       await vfFrame
         .locator('sb-swipe-container')
         .filter({ hasText: '015-01284A-01 KODAK ACHIEVE' })
         .getByRole('checkbox')
         .click();

//       // Your 'Select' button logic
       const selectButton = vfFrame.getByRole('button', { name: 'Select', exact: true });
       await selectButton.waitFor({ timeout: 20000 });
       await selectButton.click();

       break; // Stop once successful
    }
 }
 }
  
  // await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('#firstColumn').getByRole('combobox').selectOption('F-speed: Auto unload plate handling short table');
  // await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().locator('#firstColumn').getByRole('combobox').selectOption('Kodak');
  // await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().getByRole('button', { name: 'Save' }).click();
  // await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().locator('#mask').click();
  // await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().getByRole('button', { name: 'Save', exact: true }).click();
  // await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/r/SBQQ__Quote__c/a22Su000000bSYPIA2/view');
}
);
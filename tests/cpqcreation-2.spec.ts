import { chromium, test, expect, Frame,ElementHandle } from '@playwright/test';

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

  await page.goto('https://test.salesforce.com/');
 await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
 await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
 await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('link', { name: 'Quotes', exact: true }).click();
  await page.getByRole('link', { name: 'Q-157678' }).click();
  await page.getByRole('button', { name: 'Edit Lines' }).click({timeout: 90000});
 
// Step 1: Wait for the iframe to be attached and get its handle
const iframeHandle = await page.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 10000 });

// // Step 2: Get the frame's content safely
 const frame = await iframeHandle.contentFrame();
 if (!frame) throw new Error('iframe contentFrame is null - frame may not be loaded');

// // Step 3: Wait for the "Add Products" button and click it
 await frame.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 9000 });
 await frame.getByRole('button', { name: 'Add Products' }).click();

// await page.waitForTimeout(9000);

// // Step 1: Wait for multiple matching iframes

// // Wait for the page to load completely
// //await page.waitForLoadState('networkidle');

// // Get all iframes whose name starts with vfFrameId_
// const iframeHandles = await page.$$('iframe[name^="vfFrameId_"]');

// if (iframeHandles.length === 0) {
//   throw new Error('No iframes with name starting "vfFrameId_" found');
// }

// let usableFrame: Frame | null = null;

// // Try to get a usable content frame from the iframes, with retries
// for (const handle of iframeHandles) {
//   for (let i = 0; i < 5; i++) {  // Retry up to 5 times, 1 sec interval
//     usableFrame = await handle.contentFrame();
//     if (usableFrame) break;
//     await page.waitForTimeout(1000);
//   }
//   if (usableFrame) break;
// }

// if (!usableFrame) {
//   throw new Error('No usable iframe contentFrame was found after retries');
// }

// // Now inside the usable iframe's frame, wait for the "Add Products" button
// await usableFrame.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 9000 });

// // Click the "Add Products" button
// await usableFrame.getByRole('button', { name: 'Add Products' }).click();

// console.log('Clicked Add Products button inside iframe.');




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

  const frameLocators = page.locator('iframe[name^="vfFrameId_"]');
const frameCount = await iframeLocators.count();

for (let i = 0; i < frameCount; i++) {
  const iframe = frameLocators.nth(i);
  const isVisible = await iframe.isVisible();

  if (isVisible) {
    const frame = page.frameLocator(`iframe[name="${await iframe.getAttribute('name')}"]`);

    // Select from first combobox
    await frame
      .locator('#firstColumn >> role=combobox')
      .selectOption({ label: 'F-speed: Auto unload plate handling short table' });
      await page.waitForTimeout(10000);

    // Select second option (if required)
    await frame
      .locator('#firstColumn >> role=combobox')
      .selectOption({ label: 'Kodak' });

    break; // Stop once we succeeded
  }
}


//  await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('#firstColumn').getByRole('combobox').selectOption('F-speed: Auto unload plate handling short table');
//  await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().locator('#firstColumn').getByRole('combobox').selectOption('Kodak');
 await page.locator('iframe[name="vfFrameId_1748933208752"]').contentFrame().getByRole('button', { name: 'Save' }).click();

await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Save' }).click();
await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('#mask').click();
await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Save', exact: true }).click();
  // await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/r/SBQQ__Quote__c/a22Su000000bSYPIA2/view');
});
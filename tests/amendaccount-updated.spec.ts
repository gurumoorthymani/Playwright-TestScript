import { test, expect, Page, Frame } from '@playwright/test';

test('amendAccountTest', async ({ page }) => {
  test.slow();

  // Step 1: Login
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
  await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.waitForTimeout(2000);

  // Step 2: Navigate to Account
 await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
  await page.getByRole('link', { name: 'RajKumar Testing Account' }).click();

  // Step 3: Click "Amend Account"
  await page.getByText('Amend AccountAmend Account', { exact: true }).click();
  await page.getByRole('button', { name: '123 KODAK TRENDSETTER Q800 F-' }).click();
  await page.locator('.strong-text lightning-primitive-input-checkbox .slds-checkbox__label .slds-checkbox_faux').first().click();

  // Step 4: Click Confirm and handle popup
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Confirm' }).click();
  const page1 = await page1Promise;

  // Ensure popup is fully loaded
  await page1.waitForLoadState('load');

  // Step 5: Wait for iframe and switch
  //const iframeElement = await page1.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 60000 });
//   const saveFrame = await iframeElement.contentFrame();
//   if (!saveFrame) throw new Error('Could not switch to iframe');

  // Step 6: Click Amend button
  //await page1.goto('https://kodak--dev--sbqq.sandbox.vf.force.com/apex/sbqq__sb?id=a22Su000000cv3iIAA#quote/le?qId=a22Su000000cv3iIAA');
  //await page1.getByRole('button', { name: 'Amend' }).waitFor({ timeout: 40000 });
  await page1.getByRole('button', { name: 'Amend' }).click();

  // Step 7: Add Products
  await page1.waitForLoadState('domcontentloaded');
  await page1.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 80000 });
  await page1.getByRole('button', { name: 'Add Products' }).click();

  // Select Product
  const productRow = page1.locator('sb-swipe-container').filter({ hasText: '015-01284A-01 KODAK ACHIEVE' });
  await productRow.getByRole('checkbox').check();

  // Click Select
  await page1.getByRole('button', { name: 'Select', exact: true }).click();

  // Fill dropdowns
  await page1.waitForLoadState('domcontentloaded');
  //await page1.locator('#spinner').waitFor({ state: 'hidden', timeout: 30000 });
  await page1.locator('#firstColumn').getByRole('combobox').selectOption({ label: 'F-speed: Auto unload plate handling short table' });
  await page1.locator('#secondColumn').getByRole('combobox').selectOption({ label: 'Kodak' });

  // Save first time
  await page1.waitForLoadState('domcontentloaded');
  await page1.getByRole('button', { name: 'Save' }).waitFor({ timeout: 60000 });
  await page1.getByRole('button',{name: 'Save'}).click();

//   const saveButton = page1.getByRole('button', { name: 'Save' });
//   await saveButton.waitFor({ timeout: 60000 });
//   await saveButton.click();

  // Step 8: Final Save

//   const iframeElement = await page.locator('iframe[name^="vfFrameId_"]').elementHandle();
//   if (!iframeElement) throw new Error("iframe not found");

//   const saveFrame = await iframeElement.contentFrame();
//   if (!saveFrame) throw new Error("contentFrame not found");

//   await saveFrame.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 15000 });


 // let saveFrame : Frame | null = null;

//  const frameHandle = await page.frameLocator('iframe[name^="vfFrameId_"]').elementHandle();

// // Make sure it exists
// if (!frameHandle) throw new Error("Iframe not found");

//   const saveFrame: Frame | null = await .contentFrame();

// if (!saveFrame) {
//   throw new Error('No frame with Save button found.');
// }

// Wait and click the Save button
await page1.getByRole('button', { name: 'Save', exact: true }).waitFor({ timeout: 15000 });
await page1.getByRole('button', { name: 'Save', exact: true }).click();

//   await page1.waitForLoadState('domcontentloaded');
//   await page1.locator('.td .checkboxcontainer').waitFor({timeout:60000});
//   await page1.locator('.td .checkboxcontainer').first().click();
//   await page1.getByRole('button', { name: 'Save', exact: true }).click();
});

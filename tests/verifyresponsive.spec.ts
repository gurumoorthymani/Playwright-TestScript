import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 15 Pro Max'] ,
  browserName: 'chromium',
  headless: false,
  });

test('Kodak Portal - SSO Login and Case Flow', async ({ page }) => { 
  await page.goto('https://dev.customer.kodak.com/');

  // Step 1 - Click LOGIN button
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Step 2 - Email input
  await page.getByRole('textbox', { name: 'Please type your email' }).fill('dharmeshwaran@aintiram.com');
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 3 - Password input
  await page.locator('#i0118').fill('Dharmesh@2003$2005');

  // Step 4 - Click Sign in (handle retries and wait)
  const signInBtn = page.getByRole('button', { name: 'Sign in' });
  await signInBtn.waitFor({ state: 'visible', timeout: 60000 });
  await signInBtn.click();

  // Step 5 - "Yes" button for staying signed in
  const yesBtn = page.getByRole('button', { name: 'Yes' });
  //await page.waitForTimeout(80000);
  await yesBtn.waitFor({ state: 'visible', timeout: 60000 });
  await yesBtn.click();

  // Step 6 - Wait for redirect to Salesforce portal
 // await page.waitForURL('**/s/', { timeout: 60000 });

  // Step 7 - Ensure full load
 //await page.waitForLoadState('domcontentloaded');
//  await page.waitForLoadState('networkidle');
  // console.log ('clicked sign in button, waiting for other');
  //await page.waitForTimeout(80000);


//   // Step 8 - Click Logo after load
//   await page.waitForLoadState ('load');
//   await page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }).click();

// Wait until page appears visually ready
// await page.waitForLoadState('load');

// Wait until the logo is visible and ready
// const logoLocator = page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' });
// await expect(logoLocator).toBeVisible({ timeout: 60000 }); // Optional: can increase timeout

// // Click on logo
// await logoLocator.click();

// Step 1 - Wait for final redirected URL (Salesforce)
//await page.waitForURL('**/s/', { timeout: 60000 });

// Step 2 - Wait for a solid anchor that confirms page has loaded
//await page.waitForSelector('img[alt="Logo"], img[title="Logo"]', { timeout: 60000 }); // Adjust alt/title if needed

// // Step 3 - Find logo directly and click
// const logo = page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }); // Use actual attributes from your page
// await expect(logo).toBeVisible({ timeout: 60000 });
// await logo.click();

// // Step 2 - Wait for the element with both classes
// await page.waitForSelector('.applink.c-customapplauncher_customapplauncher', { timeout: 60000 });

// // Step 3 - Click the element if needed
// const appLauncher = page.locator('.applink.c-customapplauncher_customapplauncher');
// await expect(appLauncher).toBeVisible({ timeout: 60000 });
// await appLauncher.click();


// // Wait for the page to be stable first
// await page.waitForLoadState('networkidle');

// // Wait up to 60 seconds for the element
// const appLauncher = page.locator('.applink.c-customapplauncher_customapplauncher');
// await expect(appLauncher).toBeVisible({ timeout: 60000 });

// // Click after confirming visibility
// await appLauncher.click();

// await page.waitForLoadState('domcontentloaded');
// //await page.waitForTimeout(35000); // buffer time for dynamic content

// // Use partial match if unsure
// const launcher = page.locator('div').filter({ hasText: /^Service & Support$/ }).nth(4);
// //await expect(launcher).toBeVisible({ timeout: 60000 });
// await launcher.click();

await page.waitForURL('https://dev.customer.kodak.com/s/', { timeout: 120000 }); // confirm redirect done

const item = page.locator('div', { hasText: 'Service & Support' }).first();
//await expect(item.locator('text=Service & Support')).toBeVisible({ timeout: 90000 });

await item.click();

  console.log('✅ Login and redirect successful');
});

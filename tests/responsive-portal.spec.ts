import { test, expect, devices } from '@playwright/test';

// Use iPad landscape for responsive testing
test.use({
  ...devices['iPad (gen 7) landscape'],
  browserName: 'chromium'
});

test('Kodak Portal - Responsive & Case Creation Flow', async ({ page, context }) => {
  // Start login process
  await page.goto('https://dev.customer.kodak.com/s/');

  // Login - Step 1
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('textbox', { name: 'Please type your email' }).fill('dharmeshwaran@aintiram.com');
  await page.getByRole('button', { name: 'Next' }).click();

  // Login - Step 2 (password entry)
  await page.locator('#i0118').fill('Dharmesh@2003$2005');
  await page.getByRole('button', { name: 'Sign in' }).click();

//   // Wait for 'Yes' button and continue
//  await Promise.all([
//   page.waitForNavigation({ waitUntil: 'load', timeout: 45000 }),
//   page.getByRole('button', { name: 'Yes' }).click()
// ]);

//await page.getByRole('button', { name: 'Yes' }).click({ force: true, noWaitAfter: true });

// Wait for the Yes button to be attached and visible
const yesBtn = page.getByRole('button', { name: 'Yes' });

await yesBtn.waitFor({ state: 'visible', timeout: 60000 });

// Use Promise.all to catch any navigation that clicking Yes might trigger
await Promise.all([
  page.waitForNavigation({ waitUntil: 'load', timeout: 60000 }),
  yesBtn.click({ force: true }) // use force if still flaky
]);



//  await page.waitForNavigation({waitUntil: 'load'}),
//  await page.getByRole('button', {name: 'Yes'}).click();
 //await page.waitForURL('https://dev.customer.kodak.com/s/');
 //await page.waitForTimeout(60000);

  // Confirm login complete
  //await page.waitForURL(/\/s\/$/, { timeout: 60000 });
  //await page.screenshot({ path: 'after-login.png' });
  console.log('✅ Login successful:', page.url());

  // Wait for the "Service & Support" section
  await page.waitForLoadState('load');
  //await page.waitForTimeout(5000); // buffer for dynamic rendering

  // Handle popup triggered by clicking logo/service menu
//   const [popup] = await Promise.all([
//     context.waitForEvent('page'),
//     page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }).click()
//   ]);

// Wait until the KMSI page is fully loaded
await page.waitForURL(/kmsi/, { timeout: 60000 });
await page.waitForLoadState('domcontentloaded');

// Optionally wait for the "Yes" button on KMSI page if it's visible
// await page.getByRole('button', { name: 'Yes' }).waitFor({ timeout: 60000 });
// await page.getByRole('button', { name: 'Yes' }).click({ force: true, noWaitAfter: true });


 const yesButton = page.getByRole('button', { name: 'Yes' });
if (await yesButton.isVisible({ timeout: 15000 })) {
  await yesButton.click({ force: true });
  // Optional wait for Salesforce to load
  await page.waitForURL(/\/s\/$/, { timeout: 60000 });
} else {
  console.log('⚠️ "Yes" button not visible — likely already navigated to Salesforce');
}

// //✅ Now ensure /s/ page is ready before proceeding
// await page.waitForLoadState('domcontentloaded');
// await page.waitForLoadState('networkidle');

// // ✅ Click on logo
// await page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }).click();



// // // Wait for redirection to Salesforce after Yes click
// // await page.waitForURL(/\/s\//, { timeout: 60000 });

// // // Extra buffer wait if needed
// // await page.waitForLoadState('networkidle');

// // ✅ Now wait for the Logo to be visible and stable
// await page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }).waitFor({ timeout: 60000 });
// await page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' }).click();



// ✅ Wait for navigation to complete (i.e., to /s/ page)
await page.waitForURL('**/s/', { timeout: 60000 }); // or stricter: 'https://dev.customer.kodak.com/s/'

// ✅ Ensure page is fully loaded
await page.waitForLoadState('domcontentloaded'); // DOM ready
await page.waitForLoadState('networkidle');      // Network activity done

// ✅ Extra buffer for UI rendering delay (if needed)
await page.waitForTimeout(2000);

// ✅ Wait for logo to appear before clicking
const logo = page.getByRole('main').locator('span').getByRole('img', { name: 'Logo' });
await logo.waitFor({ state: 'visible', timeout: 30000 });

// ✅ Click on the logo
await logo.click();









  // Ensure popup loaded
  await popup.waitForLoadState('load');
  await popup.goto('https://kodak--dev.sandbox.my.site.com/ServiceandSupportPortal/s/');

  // Start portal navigation
  await popup.getByRole('link', { name: 'My Assets' }).click();
  await popup.getByRole('menuitem', { name: 'MY CASES' }).click();
  await popup.getByRole('menuitem', { name: 'Home' }).click();
  await popup.getByRole('paragraph').filter({ hasText: 'New Service Request' }).getByRole('link').click();
  await popup.getByRole('menuitem', { name: 'Home' }).click();
  await popup.getByRole('paragraph').filter({ hasText: 'New Inquiry Request' }).click();

  // Filter and select account
  await popup.getByRole('button', { name: 'Select a List View: Accounts' }).click();
  await popup.getByText('My Accounts Service & Support').click();
  await popup.getByRole('link', { name: 'Aenta Life and Casualty' }).click();

  // Switch tabs
  await popup.getByRole('tab', { name: 'Assets' }).click();
  await popup.getByRole('tab', { name: 'Contacts' }).click();

  // Create inquiry case
  await popup.getByRole('button', { name: 'Create Inquiry Case' }).click();
  await popup.getByRole('combobox', { name: '*Contact Name' }).click(); // If needed, select a contact
  await popup.getByRole('combobox', { name: 'Sub Type' }).click();
  await popup.getByText('Customer Master Updates').click();
  await popup.getByRole('textbox', { name: '*Description' }).fill('testing');
  await popup.getByRole('button', { name: 'Submit' }).click();

  // Validate case creation
  await expect(popup).toHaveURL(/.*Case.*/);
  console.log('✅ Inquiry Case created successfully on responsive layout.');
});

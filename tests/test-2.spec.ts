import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
  await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  //await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
  await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByRole('combobox', { name: 'Search apps and items...' }).fill('Asset 360');
  await page.getByRole('option', { name: 'Asset 360', exact: true }).click();

  //await page.getByRole('link', { name: 'Assets' }).click();
  const assetsLink = page.getByRole('link', { name: 'Assets' });
  await assetsLink.waitFor({ timeout: 30000 });
  await assetsLink.click();
  await page.getByRole('link', { name: 'VIRT WF SERVER, TIER 2-SECOND' }).click();
  await page.getByText('Create CaseCreate Case', { exact: true }).click();
  await page.getByLabel('*').selectOption('ServiceRequest');

  await page.locator('#select-1880').selectOption('ShipToContactPicklist.07kSu00000A7cyrIAB');

  await page.getByText('Next', { exact: true }).click();

  await page.locator('#select-1995').selectOption('ServiceAndRepair');
  await page.locator('#select-2025').selectOption('OriginPicklist.Phone');
  await page.locator('#select-1998').selectOption('SeverityList.Impaired');
  await page.locator('#select-2028').selectOption('ConPermList.Yes');
  await page.locator('#input-2043').click();
  await page.locator('#input-2043').fill('Test For Playwright Automation');
  await page.locator('#input-2047').click();
  await page.locator('#input-2047').fill('Test For Playwright Automation');
  await page.getByText('Next', { exact: true }).click();
});
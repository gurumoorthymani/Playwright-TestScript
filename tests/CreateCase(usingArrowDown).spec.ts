import { test, expect } from '@playwright/test';

test('CreateCase', async ({ page }) => {
  test.slow();
  await page.goto('https://test.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
  await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('link', { name: 'Assets', exact: true }).click({timeout:10000});
  await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Asset/list?filterName=__Recent');
  await page.getByRole('link', { name: 'VIRT WF SERVER, TIER 2-SECOND (HYPERV)' }).click({timeout:20000});
  await page.getByText('Create CaseCreate Case', { exact: true }).click();
  await page.locator('[name=CaseTypeSelect]').click({timeout:40000});
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('[name=SRContactPicklist1]').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator("xpath=//button[normalize-space()='Next']").click();
  await page.locator('[name=Case_Subtype1]').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('[name=Case_Origin]').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('[name=Severity]').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('[name=Connection_Permitted]').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.getByRole('textbox', { name: 'Subject' }).fill('test for automation tool');
  await page.getByRole('textbox', { name: 'Description' }).fill('Test for playwright automation tool');
  await page.locator("xpath=//button[normalize-space()='Next']").click();
});

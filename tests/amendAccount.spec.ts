import { chromium, test, expect,Frame } from '@playwright/test';
import {Page}  from '@playwright/test';

test('amendAccountTest', async ({page} ) => {
    test.slow();
    await page.goto('https://test.salesforce.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
    await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
    await page.getByRole('link', { name: 'Accounts', exact: true }).click({timeout:20000});
    await page.goto('https://kodak--dev.sandbox.lightning.force.com/lightning/o/Account/list?filterName=__Recent');
    await page.getByRole('link', { name: 'RajKumar Testing Account' }).click();
    await page.getByText('Amend AccountAmend Account', { exact: true }).click();
    await page.getByRole('button', { name: '123 KODAK TRENDSETTER Q800 F-' }).click();
    await page.locator('.strong-text > lightning-primitive-input-checkbox > .slds-form-element__control > .slds-checkbox > .slds-checkbox__label > .slds-checkbox_faux').first().click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Confirm' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Amend' }).click();
   
    await page1.waitForTimeout(40000);
    await page1.getByRole('button', { name: 'Add Products' }).click();
    await page1.locator('sb-swipe-container').filter({ hasText: '015-01284A-01 KODAK ACHIEVE' }).getByRole('checkbox').click();
    await page1.waitForTimeout(30000);
    await page1.getByRole('button', { name: 'Select', exact: true }).click();
    await page1.waitForTimeout(30000);
    await page1.locator('#firstColumn').getByRole('combobox').selectOption('F-speed: Auto unload plate handling short table');
    await page1.waitForTimeout(30000);
    await page1.locator('#secondColumn').getByRole('combobox').selectOption('Kodak');
    await page1.waitForTimeout(30000);
    await page1.getByRole('button', { name: 'Save' }).click();
    //await page1.locator('sb-attribute-item').filter({ hasText: 'Configuration --None-- F-' }).locator('#attributeField').click();
    /* await page1.locator('#firstColumn >> role=combobox').selectOption({ label: 'F-speed: Auto unload plate handling short table' });
    await page1.waitForTimeout(10000);
    await page1.locator('#secondColumn').getByRole('combobox').click();
    await page1.locator('#secondColumn >> role=combobox').selectOption({ label: 'Kodak' });
    await page1.getByRole('button', { name: 'Save' }).waitFor({ timeout: 15000 });
    await page1.getByRole('button', { name: 'Save' }).click(); */
    await page1.locator('.td > .checkboxcontainer').first().click();
    await page1.getByRole('button', { name: 'Save', exact: true }).click();
});
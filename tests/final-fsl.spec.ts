import {test,expect} from "@playwright/test";
 
test('TestForFSL',async({page}) =>{
   
    test.slow();
    await page.goto('https://test.salesforce.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('gurumoorthy.manickam@kodak.com.dev');
    await page.getByRole('textbox', { name: 'Password' }).fill('Awt@12345');
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
   
    await page.getByRole('link', { name: 'Field Service' }).click();
    await page.waitForTimeout(20000);
    await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('textbox', { name: 'Search Service Appointment...' }).fill('SA-12496');
    await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Search All Records' }).click();
    //await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByTitle('Jump to a specific date').click();
    await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('textbox', { name: 'Search resources' }).fill('nishanth');
    //await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByText('SA-').dragTo(page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('.dhx_marked_timespan'));

const frameLocator = page.frameLocator('iframe[name^="vfFrameId_"]');

// Drag 'SA-' text to the first matching drop target inside the same iframe
await frameLocator.getByText('SA-').dragTo(
  frameLocator.locator('.dhx_marked_timespan').first()

  //await frameLocator.getByText('SA-').dragTo(frameLocator.locator('div:nth-child(4) > div:nth-child(18)')
);



});
 
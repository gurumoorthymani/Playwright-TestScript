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
    await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('textbox', { name: 'Search resources' }).fill('nishanth');
    const frameHandle = await page.locator('iframe[name^="vfFrameId_"]').first().contentFrame();

    if (frameHandle) {
        const source = frameHandle.getByText('SA-');
        const targetList = frameHandle.locator('.dhx_marked_timespan');
        const count = await targetList.count();

        let target;
        for (let i = 0; i < count; i++) {
            const element = targetList.nth(i);
            if (await element.isVisible()) {
                target = element;
                break;
            }
        }

        if (target) {
            await source.dragTo(target);
        } else {
            console.warn('No visible .dhx_marked_timespan found');
        }
    } else {
        console.error('Frame not found');
    }

    
});
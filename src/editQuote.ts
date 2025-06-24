import { Page, Frame } from '@playwright/test';

export async function editQuoteProcess(configuration: string, plateProvider: string, PRODUCT_NAME: string, page: Page) {
  const iframeHandle = await page.waitForSelector('iframe[name^="vfFrameId_"]', { timeout: 5000 });
  await page.waitForLoadState('domcontentloaded'); // Ensures full iframe readiness
  const frame = await iframeHandle.contentFrame();

  if (!frame) throw new Error('iframe contentFrame is null - frame may not be loaded');

  // Click 'Add Products' button inside iframe
  await frame.getByRole('button', { name: 'Add Products' }).waitFor({ timeout: 15000 });
  await frame.getByRole('button', { name: 'Add Products' }).click();

  // Debugging: Log the count of available iframes
  const iframeLocators = page.locator('iframe[name^="vfFrameId_"]');
  const iframeCount = await iframeLocators.count();
  console.log(`Found ${iframeCount} matching iframes`);

  // Loop through visible iframes
  for (let i = 0; i < iframeCount; i++) {
    const singleIframe = iframeLocators.nth(i);
    const isVisible = await singleIframe.isVisible();
    if (isVisible) {
      const vfFrame = await singleIframe.contentFrame();
      if (vfFrame) {
        console.log(`Using iframe index ${i}`);

        // Select checkbox inside iframe
        await vfFrame.locator('sb-swipe-container')
          .filter({ hasText: `${PRODUCT_NAME}` })
          .getByRole('checkbox')
          .waitFor({ timeout: 20000 });

        await vfFrame.locator('sb-swipe-container')
          .filter({ hasText: `${PRODUCT_NAME}` })
          .getByRole('checkbox')
          .click();

        // Click 'Select' button
        const selectButton = vfFrame.getByRole('button', { name: 'Select', exact: true });
        await selectButton.waitFor({ timeout: 20000 });
        await selectButton.click();
        break; // Stop once successful
      }
    }
  }

  // Handling dropdown inside iframe
  const frameLocators = page.locator('iframe[name^="vfFrameId_"]');
  const frameCount = await frameLocators.count();

  for (let i = 0; i < frameCount; i++) {
    const iframe = frameLocators.nth(i);
    const isVisible = await iframe.isVisible();

    if (isVisible) {
      const frame = page.frameLocator(`iframe[name="${await iframe.getAttribute('name')}"]`);

      await frame.locator('#firstColumn >> role=combobox').selectOption({ label: `${configuration}` });

      await page.waitForTimeout(10000); // Short delay for stability

      await frame.locator('#secondColumn >> role=combobox').selectOption({ label: `${plateProvider}` });

      break; // Stop once successful
    }
  }
  await page.waitForTimeout(16000);
  // Save actions
  // await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Save' }).click();


  // Wait for iframes to load
  await page.waitForLoadState('domcontentloaded');

  // Get all matching iframes
  const iframeElements = await page.$$('iframe[name^="vfFrameId_"]');

  let usableFrame: Frame | null = null;

  // Try to find the frame which contains the "Save" button
  for (const iframeElement of iframeElements) {
    const frame = await iframeElement.contentFrame();
    if (!frame) continue;

    // Check if "Save" button exists inside this frame
    const saveButton = frame.getByRole('button', { name: 'Save' });
    if (await saveButton.count() > 0) {
      usableFrame = frame;
      break;
    }
  }

  if (!usableFrame) {
    throw new Error('No usable iframe containing "Save" button was found');
  }

  // Click the Save button
  await usableFrame.getByRole('button', { name: 'Save' }).waitFor({ timeout: 15000 });
  await usableFrame.getByRole('button', { name: 'Save' }).click();

  //await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('#mask').click();
  //await page.locator('iframe[name^="vfFrameId_"]').contentFrame().getByRole('button', { name: 'Save', exact: true }).click();


  // Wait until DOM is ready
  await page.waitForLoadState('domcontentloaded');

  // Get all matching iframes
  const iframeHandles = await page.$$('iframe[name^="vfFrameId_"]');

  let saveFrame: Frame | null = null;;

  for (const handle of iframeHandles) {
    const frame = await handle.contentFrame();
    if (!frame) continue;

    const saveButton = frame.getByRole('button', { name: 'Save', exact: true });
    if (await saveButton.count() > 0) {
      saveFrame = frame;
      break;
    }
  }

  if (!saveFrame) {
    throw new Error('No frame with Save button found.');
  }
  await page.locator('iframe[name^="vfFrameId_"]').contentFrame().locator('.td > .checkboxcontainer').first().click();
  // Wait and click the Save button
  await saveFrame.getByRole('button', { name: 'Save', exact: true }).waitFor({ timeout: 10000 });
  await saveFrame.getByRole('button', { name: 'Save', exact: true }).click();


  console.log('Test execution completed successfully!');


}
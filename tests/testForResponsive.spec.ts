import { test } from '@playwright/test';

test.use({
  viewport: { width: 390, height: 844 }, // iPhone 12 screen resolution
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  deviceScaleFactor: 3, // Retina display
  isMobile: true,
  hasTouch: true,
});

test('Custom iPhone 12 Test', async ({ page }) => {
  await page.goto('https://dev.customer.kodak.com/s/');
  await page.screenshot({ path: 'iphone12-test.png' }); // Take a screenshot
});



//await page.goto('https://dev.customer.kodak.com/s/');
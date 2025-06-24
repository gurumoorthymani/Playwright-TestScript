import { test, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12'],
  browserName: 'chromium'
});

test('Check responsive layout with device emulation', async ({ page }) => {
  await page.goto('https://dev.customer.kodak.com/s/');

  await page.screenshot({ path: 'iPhone12_view.png' });

  // Check for out-of-viewport elements
  const elementsOutOfViewport = await page.evaluate(() => {
    const outOfBoundsElements: { tag: string, class: string, rect: any }[] = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();

      // Check if any part of the element is out of viewport
      if (rect.right > vw || rect.bottom > vh || rect.left < 0 || rect.top < 0) {
        outOfBoundsElements.push({
          tag: el.tagName,
          class: (el.className || '').toString(),
          rect: {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          }
        });
      }
    });

    return outOfBoundsElements;
  });

  // Log results in Node.js context
  if (elementsOutOfViewport.length > 0) {
    console.log('❌ Elements out of viewport detected:');
    console.table(elementsOutOfViewport);
  } else {
    console.log('✅ All elements are within viewport.');
  }
});



// import { test, expect, Page } from '@playwright/test';

// test('Check responsive layout issues', async ({ page }: { page: Page }) => {
//     // Set viewport to a mobile size
//     await page.setViewportSize({ width: 320, height: 640 });

//     // Navigate to the website
//     await page.goto('https://dev.customer.kodak.com/s/');

//     // Capture screenshot for reference
//     await page.screenshot({ path: 'mobile_view.png' });

//     // Check if an element exceeds screen width
//     const element = await page.locator('selector');
//     const boundingBox = await element.boundingBox();

//     if (boundingBox && boundingBox.width > 320) {
//         console.log('⚠️ Element exceeds mobile screen width!');
//     } else {
//         console.log('✅ Element fits within screen width.');
//     }

//     // Check if text is overflowing or wrapping incorrectly
//     const textOverflow = await page.evaluate(() => {
//         const elem = document.querySelector('selector');
//         if (!elem) return 'not-found'; // Handle the case where the element is missing
//         return window.getComputedStyle(elem).overflow;
//     });

//     if (textOverflow === 'not-found') {
//         console.log('⚠️ Element not found, skipping overflow check.');
//     } else {
//         console.log(`Text overflow setting: ${textOverflow}`);
//         expect(textOverflow).not.toBe('hidden');
//         expect(textOverflow).not.toBe('scroll');
//     }

//     // Additional check: Ensure text wraps correctly
//     const isWrapping = await page.evaluate(() => {
//         const elem = document.querySelector('selector');
//         if (!elem) return false;
//         return elem.scrollHeight > elem.clientHeight; // Indicates wrapping
//     });

//     if (isWrapping) {
//         console.log('✅ Text is wrapping correctly.');
//     } else {
//         console.log('⚠️ Text may be cut off or overflowing.');
//     }
// });
import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import { loginWithSSO } from './loginWithSSO';

dotenv.config();
console.log('Loaded env:', process.env.SSO_USERNAME, process.env.SSO_PASSWORD ? '✔ present' : '✘ missing');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = process.env.SSO_USERNAME;
  const password = process.env.SSO_PASSWORD;

  if (!username || !password) {
    throw new Error('SSO_USERNAME or SSO_PASSWORD not set in .env');
  }

  await loginWithSSO(page, username, password);

  await context.storageState({ path: 'storageState.json' });
  console.log('📝 Session saved to storageState.json');

  await browser.close();
})();

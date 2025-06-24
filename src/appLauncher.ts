import{Page} from '@playwright/test';

export async function openAppLauncher(appName:string,page:Page) { 
   await page.getByRole('button', { name: 'App Launcher' }).click();
   await page.getByRole('combobox', { name: 'Search apps and items...' }).fill(`${appName}`);
   await page.getByRole('option', { name:`${appName}`, exact: true }).click(); 
}
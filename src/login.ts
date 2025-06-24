import{Page} from '@playwright/test'
export async function loginToSalesforce(Username:string,password:string,page:Page)
{
    await page.goto('https://test.salesforce.com/');
    
    console.log('Inside the function :',Username ,password);

    await page.getByRole('textbox', { name: 'Username' }).fill(`${Username}`);
    await page.getByRole('textbox', { name: 'Password' }).fill(`${password}`);
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
}
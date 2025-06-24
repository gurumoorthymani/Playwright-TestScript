import {test} from '@playwright/test';
import { loginToSalesforce } from '@utils/login';
import { openAppLauncher } from '@utils/appLauncher';
import { getCase,getWorkOrder,getServiceAppointment } from '@utils/soqlHelper';
import { readExcelData, TestData } from '@utils/excelReader';
import {assignResorceToServiceAppoinment} from '@utils/FSLDragAndDrop';

import path from 'path';
const filePath = path.resolve('C:/Users/Gurumoorthy-000122/Downloads/loginCredential_1.xlsx');
const testData: TestData[] = readExcelData(filePath);
 
test.describe('Creating Work Oder and Assign Service Resource',() => {
        testData.forEach((data,index) => {

             test(`work order and Field Service`,async ({page})=>{
                test.slow();
                await loginToSalesforce(data.username,data.password,page);
                await openAppLauncher('Asset 360',page);
                await page.getByRole('link',{name:'Cases',exact:true}).click();
                
                await page.getByRole('link',{name:'00038788'}).click();
                
                const caseId = await getCase(`00038788`);
                await page.getByRole('tab', { name: 'Work Order' }).click();

                const workOrder = await getWorkOrder(`${caseId.Id}`);

                await page.getByRole('link', { name: `${workOrder.WorkOrderNumber}` }).click();
                await page.getByRole('button', { name: 'New Service Appointment' }).click();
                await page.getByRole('group', { name: 'Earliest Start Permitted' }).getByLabel('*Date').click();
                await page.getByLabel('-06-11').getByRole('button', { name: '11' }).click();
                await page.getByRole('group', { name: 'Due Date' }).getByLabel('*Date').click();
                await page.getByRole('button', { name: '13' }).click();
                await page.getByRole('button', { name: 'Save' }).click();

                const serviceAppoinment = await getServiceAppointment(`${workOrder.Id}`);
                await openAppLauncher('Field Service',page);
                const serviceResource ='Nishanth Sargunam';
                
                await assignResorceToServiceAppoinment(`${serviceAppoinment.AppointmentNumber}`,`${serviceResource}`,page);

        });
    });
    
});
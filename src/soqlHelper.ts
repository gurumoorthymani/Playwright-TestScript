import jsforce from 'jsforce';

export const conn = new jsforce.Connection({
    loginUrl: 'https://test.salesforce.com', 
  });

// fetch order related to quote
export async function getOrderByQuoteId(quoteId: string) {

  await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx'); 

  const result = await conn.query(`SELECT Id, OrderNumber FROM Order WHERE SBQQ__Quote__c = '${quoteId}' ORDER BY CreatedDate DESC LIMIT 1`);

  if (result.records.length === 0) {
    throw new Error(`No order found for the given quoteId:'${quoteId}'`);
  }

  return result.records[0];
}

// to fetch quote

export async function getQuoteId(quoteNumber: any) 
{
  await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx'); 
  
  const resultQuote = await conn.query(`SELECT Id FROM SBQQ__Quote__c WHERE Name = '${quoteNumber}' `);

  if (resultQuote.records.length === 0) {
    throw new Error(`No quote found for the given quoteNumber :'${quoteNumber}'`);
  }

  return resultQuote.records[0];
}

// to fetch case

export async function getCase(caseNumber:string) {
  await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx');

  const resultCase = await conn.query(`SELECT ID,CaseNumber FROM Case WHERE CaseNumber = '${caseNumber}'`);

  if(resultCase.records.length === 0){
    throw new Error(`No case found for the given CaseNumber :'${caseNumber}'`);
  }
  return resultCase.records[0];
}

// to fetch work order related to quote
export async function getWorkOrder(caseId:string){
   await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx');

   const resultWorkOrder = await conn.query(`SELECT ID,WorkOrderNumber,CaseId FROM WorkOrder WHERE CaseId='${caseId}' ORDER BY CreatedDate DESC LIMIT 1`);
   if(resultWorkOrder.records.length === 0){
    throw new Error(`No WorkOrder found for the given Case :'${caseId}'`);
   }
   return resultWorkOrder.records[0];
}

// get service appoinment related to work order

export async function getServiceAppointment(WorkOrderId:string) {
  await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx');

  const resutltServiceAppointment = await conn.query(`SELECT Id,AppointmentNumber FROM ServiceAppointment WHERE Work_Order__c ='${WorkOrderId}' and Status = 'None' ORDER BY CreatedDate DESC LIMIT 1`);

  if(resutltServiceAppointment.records.length === 0){
    throw new Error(`No Service Appointment found for the gvien WorkOrder :'${WorkOrderId}'`);
  }

  return resutltServiceAppointment.records[0];
  
}
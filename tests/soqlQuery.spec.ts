import jsforce from 'jsforce';
//import {page} from '@playwright/test'
const conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com',
});
 
(async () => {
  try {
    await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx');
    const result = await conn.query("SELECT Name FROM Order");
    console.log('SOQL Query Result:', result.records);
  } catch (err) {
    console.error('Error:', err);
  }
})();
/* 
Quote
Q-157380 */
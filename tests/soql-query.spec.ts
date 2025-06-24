import jsforce from 'jsforce';

const conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com',
});

(async () => {
  try {
    await conn.login('gurumoorthy.manickam@kodak.com.dev', 'Awt@12345'+'IVIR1OpooAsJZNWlAnm9urxx');
    const result = await conn.query("SELECT Name FROM Account where id = '001Su00000I9N4fIAF'");
    console.log('SOQL Query Result:', result.records);
  } catch (err) {
    console.error('Error:', err);
  }
})();

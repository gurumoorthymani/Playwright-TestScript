import { test, expect, request } from '@playwright/test';

test('POST new user', async ({ request }) => {
  const newUser = {
    name: 'Gurumoorthy Manickam',
    email: 'guru@moorthy.com',
    username: 'Guru'
  };

  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: newUser
  });

  expect(response.status()).toBe(201); // Created
  const data = await response.json();
  expect(data.name).toBe(newUser.name);
  console.log(data);
});


// test('GET users list from dummy API', async ({ request }) => {
//   const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
//   expect(response.ok()).toBeTruthy();
//   expect(response.status()).toBe(200);

//   const users = await response.json();
//   expect(users.length).toBeGreaterThan(0);
//   console.log(users);
// });

test('Authenticated GET request', async () => {
  const context = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com/users',
    extraHTTPHeaders: {
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`
    }
  });

  const res = await context.get('/protected/data');
  expect(res.status()).toBe(200);
  console.log(res);
});

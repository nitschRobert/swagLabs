import test, { expect } from '@playwright/test';
import { API_KEYS } from '../swag/test_data/test-data';

test.describe('Reqres API smoke tests', () => {
  let headers: { [key: string]: string };

  test('GET users returns status code 200', async ({ request }) => {
    const expectedStatusCode = 200;
    const usersUrl = 'https://reqres.in/api/users?page=1';
    headers = {
      'x-api-key': API_KEYS.REQRES,
    };

    const response = await request.get(usersUrl, {
      headers,
    });
    expect(response.status()).toBe(expectedStatusCode);

    const responseBody = await response.json();
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data).toHaveLength(6);
  });
});

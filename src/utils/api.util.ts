import { testUser1 } from '@_src/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

interface Headers {
  [key: string]: string;
}

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginUrl = '/api/login';

  const loginData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };

  const responseLogin = await request.post(loginUrl, {
    data: loginData,
  });

  const loginBody = await responseLogin.json();
  return {
    Authorization: `Bearer ${loginBody.access_token}`,
  };
}

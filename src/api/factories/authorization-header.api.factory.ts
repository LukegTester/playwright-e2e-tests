import { Headers } from '@_src/api/models/header.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { testUser1 } from '@_src/ui/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export async function getAuthorizationHeader(request: APIRequestContext): Promise<Headers> {
  const loginUrl = apiUrls.loginUrl;

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

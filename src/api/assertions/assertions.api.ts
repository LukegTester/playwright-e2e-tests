import { Headers } from '@_src/api/models/header.api.model';
import { expect } from '@_src/ui/fixtures/merge.fixtures';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function expectGetResponseStatus(
  request: APIRequestContext,
  url: string,
  expectedStatusCode: number,
  headers?: Headers,
): Promise<APIResponse> {
  const responseGet = await request.get(url, { headers });
  expect(
    responseGet.status(),
    `status code expected: ${expectedStatusCode} but received: ${responseGet.status()}`,
  ).toBe(expectedStatusCode);

  return responseGet;
}

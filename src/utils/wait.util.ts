import { RESPONSE_TIMEOUT } from '@_pw-config';
import { Page, Response } from '@playwright/test';

export async function waitForResponse(
  page: Page,
  url: string,
): Promise<Response> {
  return page.waitForResponse(url, {
    timeout: RESPONSE_TIMEOUT,
  });
}

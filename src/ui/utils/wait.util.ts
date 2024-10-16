import { RESPONSE_TIMEOUT } from '@_pw-config';
import { Page, Response } from '@playwright/test';

interface WaitParameters {
  page: Page;
  url: string;
  method?: string;
  status?: number;
  text?: string;
}

export async function waitForResponse(waitParams: WaitParameters): Promise<Response> {
  return waitParams.page.waitForResponse(
    async (response) => {
      // console.log(
      //   response.status(),
      //   response.request().method(),
      //   response.url(),
      // );
      return (
        response.url().includes(waitParams.url) &&
        (!waitParams.method || response.request().method() === waitParams.method) &&
        (!waitParams.status || response.status() === waitParams.status) &&
        (!waitParams.text || (await response.text()).includes(waitParams.text))
      );
    },
    {
      timeout: RESPONSE_TIMEOUT,
    },
  );
}

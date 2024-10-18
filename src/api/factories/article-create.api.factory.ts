import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_src/api/models/article.api.model';
import { Headers } from '@_src/api/models/header.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect } from '@_src/ui/fixtures/merge.fixtures';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function createArticleWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleData?: ArticlePayload,
): Promise<APIResponse> {
  const articleDataFinal = articleData || prepareArticlePayload();
  const responseArticle = await request.post(apiUrls.articlesUrl, {
    headers,
    data: articleDataFinal,
  });

  // assert article exist
  const articleJson = await responseArticle.json();
  const expectedGetArticleStatusCode = 200;

  await expect(async () => {
    const responseArticleCreated = await request.get(`${apiUrls.articlesUrl}/${articleJson.id}`);

    expect(
      responseArticleCreated.status(),
      `Expected to receive status code ${expectedGetArticleStatusCode} but received status: ${responseArticleCreated.status()}`,
    ).toBe(expectedGetArticleStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseArticle;
}

import { ArticlePayload, Headers, apiUrls } from '@_src/api/utils/api.util';
import { prepareArticlePayload } from '@_src/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_src/factories/authorization-header.api.factory';
import { prepareRandomArticle } from '@_src/ui/factories/article.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles CRUD operations', { tag: '@crud' }, () => {
  test('should not create an article without logged-in user', { tag: '@GAD-R09-01' }, async ({ request }) => {
    // Arrange
    const expectedStatusCode = 401;

    const randomArticleData = prepareRandomArticle();
    const articleData = {
      title: randomArticleData.articleTitle,
      body: randomArticleData.articleBody,
      date: new Date().toISOString(),
      image: 'string',
    };

    // Act
    const response = await request.post(apiUrls.articlesUrl, {
      data: articleData,
    });

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
  test.describe('CRUD operations', () => {
    let headers: Headers;
    let articleData: ArticlePayload;
    let responseArticle: APIResponse;

    test.beforeAll('should login', async ({ request }) => {
      headers = await getAuthorizationHeader(request);
    });

    test.beforeEach('create an article', async ({ request }) => {
      articleData = prepareArticlePayload();

      responseArticle = await request.post(apiUrls.articlesUrl, {
        headers,
        data: articleData,
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
    });
    test('should create an article with logged user', { tag: '@GAD-R09-01' }, async () => {
      // Arrange
      const expectedStatusCode = 201;

      // Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const articleJson = await responseArticle.json();

      const fieldsToCheck = ['title', 'body', 'date', 'image'];
      fieldsToCheck.forEach((field) => {
        expect
          .soft(articleJson[field], `Field: ${field} mismatch between request and response payload`)
          .toEqual(articleData[field]);
      });
    });
    test('should delete an article with logged user', { tag: '@GAD-R09-03' }, async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await request.delete(`${apiUrls.articlesUrl}/${articleId}`, {
        headers,
      });

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert 2
      const expectedStatusCodeAfterDelete = 404;

      const responseArticleGet = await request.get(`${apiUrls.articlesUrl}/${articleId}`);
      const actualGetResponseStatus = responseArticleGet.status();
      expect(
        actualGetResponseStatus,
        `status code expected: ${expectedStatusCodeAfterDelete} but received: ${actualGetResponseStatus}`,
      ).toBe(expectedStatusCodeAfterDelete);
    });
    test('should no delete an article with non logged user', { tag: '@GAD-R09-03' }, async ({ request }) => {
      // Arrange
      const expectedStatusCode = 401;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await request.delete(`${apiUrls.articlesUrl}/${articleId}`);

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);
    });
  });
});

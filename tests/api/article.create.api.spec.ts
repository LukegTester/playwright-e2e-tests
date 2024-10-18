import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { Headers } from '@_src/api/models/header.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { prepareRandomArticle } from '@_src/ui/factories/article.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify articles CREATE operations', { tag: ['@crud', '@article', '@create', '@api'] }, () => {
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

    test.beforeAll('should login', async ({ request }) => {
      headers = await getAuthorizationHeader(request);
    });

    test('should create an article with logged user', { tag: '@GAD-R09-01' }, async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;

      // Assert
      const articleData = prepareArticlePayload();
      const responseArticle = await createArticleWithApi(request, headers, articleData);
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
  });
});

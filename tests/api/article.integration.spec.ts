import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';
import { getAuthorizationHeader } from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations', { tag: '@crud' }, () => {
  test(
    'should not create an article without logged-in user',
    { tag: '@GAD-R09-01' },
    async ({ request }) => {
      // Arrange
      const expectedStatusCode = 401;
      const articlesUrl = '/api/articles';

      const randomArticleData = prepareRandomArticle();
      const articleData = {
        title: randomArticleData.articleTitle,
        body: randomArticleData.articleBody,
        date: new Date().toISOString(),
        image: 'string',
      };

      // Act
      const response = await request.post(articlesUrl, {
        data: articleData,
      });

      // Assert
      expect(response.status()).toBe(expectedStatusCode);
    },
  );
  test(
    'should create an article with logged user',
    { tag: '@GAD-R09-01' },
    async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;
      const articlesUrl = '/api/articles';

      const randomArticleData = prepareRandomArticle();
      const articleData = {
        title: randomArticleData.articleTitle,
        body: randomArticleData.articleBody,
        date: new Date().toISOString(),
        image:
          '.\\data\\images\\256\\presentation_04aafc8b-7a49-4112-bf1c-5d7d9e338c97.jpg',
      };

      // Login
      const headers = await getAuthorizationHeader(request);

      // Act
      const responseArticle = await request.post(articlesUrl, {
        headers,
        data: articleData,
      });

      // Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const article = await responseArticle.json();

      const fieldsToCheck = ['title', 'body', 'date', 'image'];
      fieldsToCheck.forEach((field) => {
        expect
          .soft(
            article[field],
            `Field: ${field} mismatch between request and response payload`,
          )
          .toEqual(articleData[field]);
      });
    },
  );
});

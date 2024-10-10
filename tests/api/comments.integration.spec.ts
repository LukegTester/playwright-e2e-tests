import { expect, test } from '@_src/fixtures/merge.fixtures';
import {
  apiLinks,
  getAuthorizationHeader,
  prepareArticlePayload,
  prepareCommentPayload,
} from '@_src/utils/api.util';

test.describe('Verify comments CRUD operations', { tag: '@crud' }, () => {
  let headers: { [key: string]: string };
  let articleId: number;
  test.beforeAll('login and create article', async ({ request }) => {
    // Login
    headers = await getAuthorizationHeader(request);

    // Create article
    const articleData = prepareArticlePayload();

    const responseArticle = await request.post(apiLinks.articlesUrl, {
      headers,
      data: articleData,
    });

    const article = await responseArticle.json();
    articleId = article.id;
  });
  test(
    'should not create comment without logged-in user',
    { tag: '@GAD-R09-02' },
    async ({ request }) => {
      // Arrange
      const expectedCommentsStatusCode = 401;

      const commentData = prepareCommentPayload(articleId);

      // Act
      const responseComment = await request.post(apiLinks.commentsUrl, {
        data: commentData,
      });

      // Assert
      const actualCommentStatus = responseComment.status();
      expect(
        actualCommentStatus,
        `status code expected: ${expectedCommentsStatusCode} but received: ${actualCommentStatus}`,
      ).toBe(expectedCommentsStatusCode);
    },
  );
  test(
    'should create a comment with logged user',
    { tag: '@GAD-R09-02' },
    async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;
      const commentData = prepareCommentPayload(articleId);

      // Act
      const responseComment = await request.post(apiLinks.commentsUrl, {
        headers,
        data: commentData,
      });

      // Assert
      const actualCommentStatus = responseComment.status();
      expect(
        actualCommentStatus,
        `status code expected: ${expectedStatusCode} but received: ${actualCommentStatus}`,
      ).toBe(expectedStatusCode);

      const comment = await responseComment.json();

      const fieldsToCheck = ['article_id', 'body', 'date'];
      fieldsToCheck.forEach((field) => {
        expect
          .soft(
            comment[field],
            `Field: ${field} mismatch between request and response payload`,
          )
          .toEqual(commentData[field]);
      });
    },
  );
});

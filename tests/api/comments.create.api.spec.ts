import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.factory';
import { Headers } from '@_src/api/models/header.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify comments CREATE operations', { tag: ['@crud', '@comment', '@create', '@api'] }, () => {
  let headers: Headers;
  let articleId: number;
  test.beforeAll('login and create article', async ({ request }) => {
    // Login
    headers = await getAuthorizationHeader(request);

    // Create article
    const responseArticle = await createArticleWithApi(request, headers);

    const article = await responseArticle.json();
    articleId = article.id;
  });
  test('should not create comment with non logged-in user', { tag: '@GAD-R09-02' }, async ({ request }) => {
    // Arrange
    const expectedCommentsStatusCode = 401;

    const commentData = prepareCommentPayload(articleId);

    // Act
    const responseComment = await request.post(apiUrls.commentsUrl, {
      data: commentData,
    });

    // Assert
    const actualCommentStatus = responseComment.status();
    expect(
      actualCommentStatus,
      `status code expected: ${expectedCommentsStatusCode} but received: ${actualCommentStatus}`,
    ).toBe(expectedCommentsStatusCode);
  });
  test.describe('CREATE operations', () => {
    test('should create a comment with logged user', { tag: '@GAD-R09-02' }, async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;

      // Act
      const commentData = prepareCommentPayload(articleId);
      const responseComment = await createCommentWithApi(request, headers, articleId, commentData);

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
          .soft(comment[field], `Field: ${field} mismatch between request and response payload`)
          .toEqual(commentData[field]);
      });
    });
  });
});

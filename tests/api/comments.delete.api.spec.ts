import { expectGetResponseStatus } from '@_src/api/assertions/assertions.api';
import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { Headers } from '@_src/api/models/header.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';
import { APIResponse } from '@playwright/test';

test.describe('Verify comments DELETE operations', { tag: ['@crud', '@comment', '@delete', '@api'] }, () => {
  let headers: Headers;
  let articleId: number;
  let responseComment: APIResponse;
  test.beforeAll('login and create article', async ({ request }) => {
    // Login
    headers = await getAuthorizationHeader(request);

    // Create article
    const responseArticle = await createArticleWithApi(request, headers);

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test.beforeEach('create a comment with logged user', async ({ request }) => {
    responseComment = await createCommentWithApi(request, headers, articleId);
  });
  test('should delete a comment with logged user', { tag: '@GAD-R09-04' }, async ({ request }) => {
    // Arrange
    const expectedStatusCode = 200;
    const commentJson = await responseComment.json();
    const commentId = commentJson.id;

    // Act
    const responseCommentDelete = await request.delete(`${apiUrls.commentsUrl}/${commentId}`, {
      headers,
    });

    // Assert
    const actualResponseStatus = responseCommentDelete.status();
    expect(
      actualResponseStatus,
      `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert 2
    const expectedStatusCodeAfterDelete = 404;
    await expectGetResponseStatus(
      request,
      `$${apiUrls.commentsUrl}/${commentId}`,
      expectedStatusCodeAfterDelete,
      headers,
    );
  });
  test('should no delete a comment with non logged user', { tag: '@GAD-R09-04' }, async ({ request }) => {
    // Arrange
    const expectedStatusCode = 401;
    const commentJson = await responseComment.json();
    const commentId = commentJson.id;

    // Act
    const responseCommentDelete = await request.delete(`${apiUrls.commentsUrl}/${commentId}`);

    // Assert
    const actualResponseStatus = responseCommentDelete.status();
    expect(
      actualResponseStatus,
      `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert get comment after delete
    const expectedStatusCodeAfterDelete = 200;
    await expectGetResponseStatus(request, `${apiUrls.commentsUrl}/${commentId}`, expectedStatusCodeAfterDelete);
  });
});

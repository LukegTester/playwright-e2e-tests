import { expect, test } from '@_src/fixtures/merge.fixtures';
import {
  CommentPayload,
  Headers,
  apiLinks,
  getAuthorizationHeader,
  prepareArticlePayload,
  prepareCommentPayload,
} from '@_src/utils/api.util';
import { APIResponse } from '@playwright/test';

test.describe('Verify comments CRUD operations', { tag: '@crud' }, () => {
  let headers: Headers;
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
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
  test.describe('CRUD operations', () => {
    let commentData: CommentPayload;
    let responseComment: APIResponse;
    test.beforeEach(
      'create a comment with logged user',
      async ({ request }) => {
        commentData = prepareCommentPayload(articleId);
        responseComment = await request.post(apiLinks.commentsUrl, {
          headers,
          data: commentData,
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
      },
    );

    test(
      'should create a comment with logged user',
      { tag: '@GAD-R09-02' },
      async () => {
        // Arrange
        const expectedStatusCode = 201;

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
    test(
      'should delete a comment with logged user',
      { tag: '@GAD-R09-04' },
      async ({ request }) => {
        // Arrange
        const expectedStatusCode = 200;
        const commentJson = await responseComment.json();
        const commentId = commentJson.id;

        // Act
        const responseCommentDelete = await request.delete(
          `${apiLinks.commentsUrl}/${commentId}`,
          {
            headers,
          },
        );

        // Assert
        const actualResponseStatus = responseCommentDelete.status();
        expect(
          actualResponseStatus,
          `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);

        // Assert 2
        const expectedStatusCodeAfterDelete = 404;

        const responseCommentGet = await request.get(
          `${apiLinks.commentsUrl}/${commentId}`,
        );
        const actualGetResponseStatus = responseCommentGet.status();
        expect(
          actualGetResponseStatus,
          `status code expected: ${expectedStatusCodeAfterDelete} but received: ${actualGetResponseStatus}`,
        ).toBe(expectedStatusCodeAfterDelete);
      },
    );
    test(
      'should no delete a comment with non logged user',
      { tag: '@GAD-R09-04' },
      async ({ request }) => {
        // Arrange
        const expectedStatusCode = 401;
        const commentJson = await responseComment.json();
        const commentId = commentJson.id;

        // Act
        const responseCommentDelete = await request.delete(
          `${apiLinks.commentsUrl}/${commentId}`,
        );

        // Assert
        const actualResponseStatus = responseCommentDelete.status();
        expect(
          actualResponseStatus,
          `status code expected: ${expectedStatusCode} but received: ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);
      },
    );
  });
});

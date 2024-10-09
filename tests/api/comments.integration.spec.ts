import { prepareRandomArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';
import { getAuthorizationHeader } from '@_src/utils/api.util';

test.describe('Verify comments CRUD operations', { tag: '@crud' }, () => {
  let headers: { [key: string]: string };
  let articleId: number;
  test.beforeAll('login and create article', async ({ request }) => {
    headers = await getAuthorizationHeader(request);

    // Create article
    const articlesUrl = '/api/articles';
    const randomArticleData = prepareRandomArticle();
    const articleData = {
      title: randomArticleData.articleTitle,
      body: randomArticleData.articleBody,
      date: new Date().toISOString(),
      image:
        '.\\data\\images\\256\\presentation_04aafc8b-7a49-4112-bf1c-5d7d9e338c97.jpg',
    };

    const responseArticle = await request.post(articlesUrl, {
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
      const commentsUrl = '/api/comments';

      const randomCommentData = prepareRandomComment();
      const commentData = {
        article_id: articleId,
        body: randomCommentData.body,
        date: new Date().toISOString(),
      };

      // Act
      const responseComment = await request.post(commentsUrl, {
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
    'should create an comment with logged user',
    { tag: '@GAD-R09-02' },
    async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;
      const commentsUrl = '/api/comments';

      const randomCommentData = prepareRandomComment();
      const commentData = {
        article_id: articleId,
        body: randomCommentData.body,
        date: new Date().toISOString(),
      };

      // Act
      const responseComment = await request.post(commentsUrl, {
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

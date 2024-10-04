import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';

test.describe('Verify articles CRUD operations', { tag: '@API' }, () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const articlesUrl = '/api/articles';

    const randomArticleData = prepareRandomArticle();
    const articleData = {
      title: randomArticleData.articleTitle,
      body: randomArticleData.articleBody,
      date: Date.now(),
      image: 'string',
    };

    // Act
    const response = await request.post(articlesUrl, {
      data: articleData,
    });

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
});

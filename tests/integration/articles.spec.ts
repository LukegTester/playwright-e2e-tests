import { RESPONSE_TIMEOUT } from '@_pw-config';
import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';

test.describe('Verify articles', () => {
  test(
    'article is not created without mandatory fields - title not provided',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ addArticlesView, page }) => {
      // Arrange
      const expectedMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticle();
      articleData.articleTitle = '';

      const responsePromise = page.waitForResponse('/api/articles', {
        timeout: RESPONSE_TIMEOUT,
      });

      // Act
      await addArticlesView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      expect(response.status()).toBe(expectedResponseCode);
    },
  );
  test(
    'article is not created without mandatory fields - body not provided',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ addArticlesView }) => {
      // Arrange
      const expectedMessage = 'Article was not created';

      const articleData = prepareRandomArticle();
      articleData.articleBody = '';

      // Act
      await addArticlesView.createArticle(articleData);

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
    },
  );
  test.describe('Title length', () => {
    test(
      'article should not be created when title exceed 128 signs',
      { tag: ['@GAD-R04-02', '@logged'] },
      async ({ addArticlesView }) => {
        // Arrange
        const expectedMessage = 'Article was not created';

        const articleData = prepareRandomArticle(129);

        // Act
        await addArticlesView.createArticle(articleData);

        // Assert
        await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      },
    );
    test(
      'create article with title having 128 signs',
      { tag: ['@GAD-R04-02', '@logged'] },
      async ({ addArticlesView }) => {
        // Arrange
        const articleData = prepareRandomArticle(128);

        // Act
        const articlePage = await addArticlesView.createArticle(articleData);

        // Assert
        await expect(articlePage.articleTitle).toHaveText(
          articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
          articleData.articleBody,
        );
      },
    );
  });
});

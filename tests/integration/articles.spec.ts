import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';

test.describe('Verify articles', () => {
  test(
    'article is not created without mandatory fields - title not provided',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ addArticlesView }) => {
      // Arrange
      const expectedMessage = 'Article was not created';

      const createArticleData = prepareRandomArticle();
      createArticleData.articleTitle = '';

      // Act
      await addArticlesView.createArticle(createArticleData);

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
    },
  );
  test(
    'article is not created without mandatory fields - body not provided',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ addArticlesView }) => {
      // Arrange
      const expectedMessage = 'Article was not created';

      const createArticleData = prepareRandomArticle();
      createArticleData.articleBody = '';

      // Act
      await addArticlesView.createArticle(createArticleData);

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

        const createArticleData = prepareRandomArticle(129);

        // Act
        await addArticlesView.createArticle(createArticleData);

        // Assert
        await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      },
    );
    test(
      'create article with title having 128 signs',
      { tag: ['@GAD-R04-02', '@logged'] },
      async ({ addArticlesView }) => {
        // Arrange
        const createArticleData = prepareRandomArticle(128);

        // Act
        const articlePage =
          await addArticlesView.createArticle(createArticleData);

        // Assert
        await expect(articlePage.articleTitle).toHaveText(
          createArticleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
          createArticleData.articleBody,
        );
      },
    );
  });
});

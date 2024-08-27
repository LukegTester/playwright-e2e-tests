import { prepareRandomArticle } from '@_src/factories/article.factory';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticlesView } from '@_src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);

    await articlesPage.goto();
    addArticlesView = await articlesPage.clickAddArticleButtonLogged();
    await expect.soft(addArticlesView.addNewHeader).toBeVisible();
  });
  test(
    'article is not created without mandatory fields - title not provided',
    { tag: ['@GAD-R04-01', '@logged'] },
    async () => {
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
    async () => {
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
      async () => {
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
      async () => {
        // Arrange
        const createArticleData = prepareRandomArticle(128);

        // Act
        const articlePage = await addArticlesView.createArticle(createArticleData);

        // Assert
        await expect(articlePage.articleTitle).toHaveText(createArticleData.articleTitle);
        await expect(articlePage.articleBody).toHaveText(createArticleData.articleBody);
      },
    );
  });
});

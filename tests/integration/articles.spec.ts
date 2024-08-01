import { prepareRandomArticle } from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticlesView } from '../../src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticlesView = new AddArticlesView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
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
      async ({ page }) => {
        // Arrange
        const articlePage = new ArticlePage(page);

        const createArticleData = prepareRandomArticle(128);

        // Act
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

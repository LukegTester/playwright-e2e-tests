import { prepareRandomArticle } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
  });
  test(
    'create new article with mandatory fields',
    { tag: ['@GAD-R04-01', '@logged'] },
    async () => {
      // Arrange
      articleData = prepareRandomArticle();

      // Act
      const addArticlesView = await articlesPage.clickAddArticleButtonLogged();
      await expect.soft(addArticlesView.addNewHeader).toBeVisible();
      const articlePage = await addArticlesView.createArticle(articleData);

      // Assert
      await expect(articlePage.articleTitle).toHaveText(
        articleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(articleData.articleBody);
    },
  );
  test(
    'User can access single article',
    { tag: ['@GAD-R04-03', '@logged'] },
    async () => {
      // Act
      const articlePage = await articlesPage.goToArticle(
        articleData.articleTitle,
      );

      // Assert
      await expect(articlePage.articleTitle).toHaveText(
        articleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(articleData.articleBody);
    },
  );

  test(
    'User can delete his own article',
    { tag: ['@GAD-R04-04', '@logged'] },
    async () => {
      // Arrange
      const expectedArticlesTitle = 'Articles';
      const expectedTextMessage = 'No data';
      const articlePage = await articlesPage.goToArticle(
        articleData.articleTitle,
      );

      // Act
      articlesPage = await articlePage.deleteArticle();

      // Assert
      await articlesPage.waitForPageToLoadUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedArticlesTitle);

      await articlesPage.searchArticle(articleData.articleTitle);
      await expect(articlesPage.noResultText).toHaveText(expectedTextMessage);
    },
  );
});

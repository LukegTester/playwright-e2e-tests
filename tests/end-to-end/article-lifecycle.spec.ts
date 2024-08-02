import { prepareRandomArticle } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticlesView } from '@_src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;
  let articlePage: ArticlePage;
  let createArticleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticlesView = new AddArticlesView(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });
  test(
    'create new article with mandatory fields',
    { tag: ['@GAD-R04-01', '@logged'] },
    async () => {
      // Arrange
      createArticleData = prepareRandomArticle();

      // Act
      await articlesPage.addArticleButtonLogged.click();
      await expect.soft(addArticlesView.addNewHeader).toBeVisible();
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
  test(
    'User can access single article',
    { tag: ['@GAD-R04-03', '@logged'] },
    async () => {
      // Act
      await articlesPage.goToArticle(createArticleData.articleTitle);

      // Assert
      await expect(articlePage.articleTitle).toHaveText(
        createArticleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(
        createArticleData.articleBody,
      );
    },
  );

  test(
    'User can delete his own article',
    { tag: ['@GAD-R04-04', '@logged'] },
    async () => {
      // Arrange
      const expectedArticlesTitle = 'Articles';
      const expectedTextMessage = 'No data';
      await articlesPage.goToArticle(createArticleData.articleTitle);

      // Act
      await articlePage.deleteArticle();

      // Assert
      await articlesPage.waitForPageToLoadUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedArticlesTitle);

      await articlesPage.searchArticle(createArticleData.articleTitle);
      await expect(articlesPage.noResultText).toHaveText(expectedTextMessage);
    },
  );
});

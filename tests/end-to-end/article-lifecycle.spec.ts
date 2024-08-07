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
  let articleData: AddArticleModel;

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
      articleData = prepareRandomArticle();

      // Act
      await articlesPage.addArticleButtonLogged.click();
      await expect.soft(addArticlesView.addNewHeader).toBeVisible();
      await addArticlesView.createArticle(articleData);

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
      await articlesPage.goToArticle(articleData.articleTitle);

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
      await articlesPage.goToArticle(articleData.articleTitle);

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

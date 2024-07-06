import { randomArticleData } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticlesView } from '../../src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;
  let articlePage: ArticlePage;
  let createArticleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticlesView = new AddArticlesView(page);
    articlePage = new ArticlePage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
  });
  test(
    'create new article with mandatory fields',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange
      createArticleData = randomArticleData();

      // Act
      await articlesPage.addArticleButtonLogged.click();
      await expect.soft(addArticlesView.header).toBeVisible();
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
  test('User can access single article', { tag: '@GAD-R04-03' }, async () => {
    // Act
    await articlesPage.goToArticle(createArticleData.articleTitle);

    // Assert
    await expect(articlePage.articleTitle).toHaveText(
      createArticleData.articleTitle,
    );
    await expect(articlePage.articleBody).toHaveText(
      createArticleData.articleBody,
    );
  });
});

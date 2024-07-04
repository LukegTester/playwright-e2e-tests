import { randomArticleData } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticlesView } from '../src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test(
    'Verify creating article with mandatory fields',
    { tag: '@GAD-R04-01' },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(testUser1);

      const articlesPage = new ArticlesPage(page);
      await articlesPage.goto();

      // Act
      await articlesPage.addArticleButtonLogged.click();
      const addArticlesView = new AddArticlesView(page);
      await expect.soft(addArticlesView.header).toBeVisible();

      const createArticleData = randomArticleData();
      await addArticlesView.createArticle(createArticleData);

      // Assert
      const articlePage = new ArticlePage(page);
      await expect(articlePage.articleTitle).toHaveText(
        createArticleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(
        createArticleData.articleBody,
      );
    },
  );
});

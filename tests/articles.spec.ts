import { randomArticleData } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticlesView } from '../src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticlesView = new AddArticlesView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticlesView.header).toBeVisible();
  });
  test(
    'Verify creating article with mandatory fields',
    { tag: '@GAD-R04-01' },
    async ({ page }) => {
      // Arrange
      const articlePage = new ArticlePage(page);

      const createArticleData = randomArticleData();

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
  test(
    'Verify not creating article without mandatory fields - title not provided',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange
      const expectedMessage = 'Article was not created';

      const createArticleData = randomArticleData();
      createArticleData.articleTitle = '';

      // Act
      await addArticlesView.createArticle(createArticleData);

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
    },
  );
  test(
    'Verify not creating article without mandatory fields - body not provided',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange
      const expectedMessage = 'Article was not created';

      const createArticleData = randomArticleData();
      createArticleData.articleBody = '';

      // Act
      await addArticlesView.createArticle(createArticleData);

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
    },
  );
  test.describe('Title length', () => {
    test(
      'Verify article title - should not exceed 128 signs',
      { tag: '@GAD-R04-02' },
      async () => {
        // Arrange
        const expectedMessage = 'Article was not created';

        const createArticleData = randomArticleData(129);

        // Act
        await addArticlesView.createArticle(createArticleData);

        // Assert
        await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      },
    );
    test(
      'Verify article title - create article with title having 128 signs',
      { tag: '@GAD-R04-02' },
      async ({ page }) => {
        // Arrange
        const articlePage = new ArticlePage(page);

        const createArticleData = randomArticleData(128);

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

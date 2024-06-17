import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test(
    'comments button navigate to comments page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act
      await articlesPage.goto();
      await commentsPage.mainMenu.commentsButton.click();

      // Assert
      const title = await commentsPage.title();
      expect(title).toContain('Comments');
    },
  );
  test(
    'article button navigate to articles page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act
      await commentsPage.goto();
      await articlesPage.mainMenu.articlesButton.click();

      // Assert
      const title = await articlesPage.title();
      expect(title).toContain('Articles');
    },
  );
  test(
    'home page button navigate to home page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const articlesPage = new ArticlesPage(page);
      const homePage = new HomePage(page);

      // Act
      await articlesPage.goto();
      await articlesPage.mainMenu.homePage.click();

      // Assert
      const title = await homePage.title();
      expect(title).toContain('GAD');
    },
  );
});

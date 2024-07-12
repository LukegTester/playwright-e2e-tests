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
      const expectedCommentsTitle = 'Comments';
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act
      await articlesPage.goto();
      await commentsPage.mainMenu.commentsButton.click();

      // Assert
      const title = await commentsPage.getTitle();
      expect(title).toContain(expectedCommentsTitle);
    },
  );
  test(
    'article button navigate to articles page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const expectedArticlesTitle = 'Articles';
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act
      await commentsPage.goto();
      await articlesPage.mainMenu.articlesButton.click();

      // Assert
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedArticlesTitle);
    },
  );
  test(
    'home page button navigate to home page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const expectedHomepageTitle = 'GAD';
      const articlesPage = new ArticlesPage(page);
      const homePage = new HomePage(page);

      // Act
      await articlesPage.goto();
      await articlesPage.mainMenu.homePage.click();

      // Assert
      const title = await homePage.getTitle();
      expect(title).toContain(expectedHomepageTitle);
    },
  );
});

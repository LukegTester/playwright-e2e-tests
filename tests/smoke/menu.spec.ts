import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

const test = baseTest.extend<{ articlesPage: ArticlesPage }>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(articlesPage);
  },
});

test.describe('Verify menu main buttons', () => {
  test(
    'comments button navigate to comments page',
    { tag: '@GAD-R01-03' },
    async ({ articlesPage }) => {
      // Arrange
      const expectedCommentsTitle = 'Comments';

      // Act
      const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
      const title = await commentsPage.getTitle();

      // Assert
      expect(title).toContain(expectedCommentsTitle);
    },
  );
  test(
    'article button navigate to articles page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      // Arrange
      const expectedArticlesTitle = 'Articles';
      const commentsPage = new CommentsPage(page);

      // Act
      await commentsPage.goto();
      const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
      const title = await articlesPage.getTitle();

      // Assert
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

      // Act
      await articlesPage.goto();
      const homePage = await articlesPage.mainMenu.clickHomePageButton();
      const title = await homePage.getTitle();

      // Assert
      expect(title).toContain(expectedHomepageTitle);
    },
  );
});

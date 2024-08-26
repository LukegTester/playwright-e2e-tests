import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

interface Pages {
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
}

const test = baseTest.extend<Pages>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(articlesPage);
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();
    await use(commentsPage);
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
    async ({ commentsPage }) => {
      // Arrange
      const expectedArticlesTitle = 'Articles';

      // Act
      const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
      const title = await articlesPage.getTitle();

      // Assert
      expect(title).toContain(expectedArticlesTitle);
    },
  );
  test(
    'home page button navigate to home page',
    { tag: '@GAD-R01-03' },
    async ({ articlesPage }) => {
      // Arrange
      const expectedHomepageTitle = 'GAD';

      // Act
      const homePage = await articlesPage.mainMenu.clickHomePageButton();
      const title = await homePage.getTitle();

      // Assert
      expect(title).toContain(expectedHomepageTitle);
    },
  );
});

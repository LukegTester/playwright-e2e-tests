import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify menu main buttons', () => {
  test('comments button navigate to comments page', { tag: '@GAD-R01-03' }, async ({ articlesPage }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Act
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });
  test('article button navigate to articles page', { tag: '@GAD-R01-03' }, async ({ commentsPage }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Act
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });
  test('home page button navigate to home page', { tag: '@GAD-R01-03' }, async ({ articlesPage }) => {
    // Arrange
    const expectedHomepageTitle = 'GAD';

    // Act
    const homePage = await articlesPage.mainMenu.clickHomePageButton();
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomepageTitle);
  });
});

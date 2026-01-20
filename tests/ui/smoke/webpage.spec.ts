import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify service main pages', () => {
  test('home page title', { tag: ['@smoke', '@GAD-R01-01'] }, async ({ homePage }) => {
    // Arrange
    const expectedHomepageTitle = 'GAD';

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomepageTitle);
  });

  test('articles page title', { tag: ['@smoke', '@GAD-R01-02'] }, async ({ articlesPage }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);
  });

  test('comments page title', { tag: ['@smoke', '@GAD-R01-02'] }, async ({ commentsPage }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsTitle);
  });
});

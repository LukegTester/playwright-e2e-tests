import { expect, test } from '@_src/fixtures/merge.fixtures';

test.describe('Verify search component for articles', () => {
  test('go button should fetch articles @GAD-R07-01', async ({
    articlesPage,
    page,
  }) => {
    // Arrange
    const expectedDefaultArticlesLength = 6;
    await expect(articlesPage.goSearchButton).toBeInViewport();
    const responsePromise = page.waitForResponse('/api/articles*');

    // Act
    await articlesPage.searchArticle('');
    const response = await responsePromise;
    const body = await response.json();

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(body).toHaveLength(expectedDefaultArticlesLength);
  });
});

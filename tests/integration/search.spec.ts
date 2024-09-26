import { expect, test } from '@_src/fixtures/merge.fixtures';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify search component for articles', () => {
  test(
    'go button should fetch articles',
    { tag: ['@GAD-R07-01', '@GAD-R07-03'] },
    async ({ articlesPage, page }) => {
      // Arrange
      const expectedDefaultArticlesLength = 6;
      await expect(articlesPage.goSearchButton).toBeInViewport();
      const responsePromise = waitForResponse(page, '/api/articles');

      // Act
      await articlesPage.searchArticle('');
      const response = await responsePromise;
      const body = await response.json();

      // Assert
      expect(response.ok()).toBeTruthy();
      expect(body).toHaveLength(expectedDefaultArticlesLength);
    },
  );
});

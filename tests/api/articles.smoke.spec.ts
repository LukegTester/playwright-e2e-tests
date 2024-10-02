import { expect, test } from '@_src/fixtures/merge.fixtures';

test.describe(
  'Verify articles API endpoint',
  { tag: ['@GAD-R08-01', '@API'] },
  () => {
    test('GET articles', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;

      const articlesUrl = '/api/articles';

      // Act
      const response = await request.get(articlesUrl);

      // Assert
      expect(response.status()).toBe(expectedStatusCode);
    });
  },
);

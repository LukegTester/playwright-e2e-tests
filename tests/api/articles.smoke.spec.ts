import { apiLinks } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify articles API endpoint', { tag: ['@GAD-R08-01', '@smoke'] }, () => {
  test.describe('Verify each condition in separate test', () => {
    test('GET articles returns status code 200', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;

      // Act
      const response = await request.get(apiLinks.articlesUrl);

      // Assert
      expect(response.status()).toBe(expectedStatusCode);
    });
    test('GET articles should return at least one article', { tag: '@predefined_data' }, async ({ request }) => {
      // Arrange
      const expectedMinArticleCount = 1;

      // Act
      const response = await request.get(apiLinks.articlesUrl);
      const responseJson = await response.json();

      // Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(expectedMinArticleCount);
    });
    test('GET articles should return article object', { tag: '@predefined_data' }, async ({ request }) => {
      // Arrange

      const expectedRequiredFields = ['id', 'user_id', 'title', 'body', 'date', 'image'];

      // Act
      const response = await request.get(apiLinks.articlesUrl);
      const responseJson = await response.json();
      const article = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((key) => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });
  test('GET articles should return objects with required fields', { tag: '@predefined_data' }, async ({ request }) => {
    // Arrange

    const response = await request.get(apiLinks.articlesUrl);

    await test.step('GET articles returns status code 200', async () => {
      const expectedStatusCode = 200;

      expect(response.status()).toBe(expectedStatusCode);
    });

    const responseJson = await response.json();
    await test.step('GET articles should return at least one article', async () => {
      const expectedMinArticleCount = 1;

      expect(responseJson.length).toBeGreaterThanOrEqual(expectedMinArticleCount);
    });

    const expectedRequiredFields = ['id', 'user_id', 'title', 'body', 'date', 'image'];
    const article = responseJson[0];

    expectedRequiredFields.forEach(async (key) => {
      await test.step(`GET articles response contains required object key: ${key}`, async () => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });
});

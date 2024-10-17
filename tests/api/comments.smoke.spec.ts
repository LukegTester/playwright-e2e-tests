import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test.describe('Verify comments API endpoint', { tag: ['@GAD-R08-02', '@smoke'] }, () => {
  test('GET comments should return objects with required fields', { tag: '@predefined_data' }, async ({ request }) => {
    // Arrange

    const response = await request.get(apiUrls.commentsUrl);

    await test.step('GET comments returns status code 200', async () => {
      const expectedStatusCode = 200;

      expect(response.status(), `For GET method expected status code is ${expectedStatusCode}`).toBe(
        expectedStatusCode,
      );
    });

    const responseJson = await response.json();
    await test.step('GET comments should return at least one comment', async () => {
      const expectedMinCommentCount = 1;

      expect(
        responseJson.length,
        `Expected to receive at least ${expectedMinCommentCount} comments`,
      ).toBeGreaterThanOrEqual(expectedMinCommentCount);
    });

    const expectedRequiredFields = ['id', 'user_id', 'article_id', 'body', 'date'];
    const comment = responseJson[0];

    expectedRequiredFields.forEach(async (key) => {
      await test.step(`GET comments response contains required object key: ${key}`, async () => {
        expect
          .soft(comment, `Expected /comments API response contains required object key: ${key}`)
          .toHaveProperty(key);
      });
    });
  });
});

import { RESPONSE_TIMEOUT } from '@_pw-config';
import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify articles', () => {
  test(
    'article is not created without mandatory fields - title not provided',
    { tag: ['@GAD-R04-01', '@GAD-R07-03', '@logged'] },
    async ({ addArticlesView, page }) => {
      // Arrange
      const expectedMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticle();
      articleData.articleTitle = '';

      const responsePromise = waitForResponse(page, '/api/articles');

      // Act
      await addArticlesView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      expect(response.status()).toBe(expectedResponseCode);
    },
  );
  test(
    'article is not created without mandatory fields - body not provided',
    { tag: ['@GAD-R04-01', '@GAD-R07-03', '@logged'] },
    async ({ addArticlesView, page }) => {
      // Arrange
      const expectedMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticle();
      articleData.articleBody = '';
      const responsePromise = waitForResponse(page, '/api/articles');

      // Act
      await addArticlesView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
      expect(response.status()).toBe(expectedResponseCode);
    },
  );
  test.describe('Title length', () => {
    test(
      'article should not be created when title exceed 128 signs',
      { tag: ['@GAD-R04-02', '@GAD-R07-03', '@logged'] },
      async ({ addArticlesView, page }) => {
        // Arrange
        const expectedMessage = 'Article was not created';
        const expectedResponseCode = 422;

        const articleData = prepareRandomArticle(129);
        const responsePromise = waitForResponse(page, '/api/articles');

        // Act
        await addArticlesView.createArticle(articleData);
        const response = await responsePromise;

        // Assert
        await expect(addArticlesView.alertPopup).toHaveText(expectedMessage);
        expect(response.status()).toBe(expectedResponseCode);
      },
    );
    test(
      'create article with title having 128 signs',
      { tag: ['@GAD-R04-02', '@GAD-R07-03', '@logged'] },
      async ({ addArticlesView, page }) => {
        // Arrange
        const articleData = prepareRandomArticle(128);
        const expectedResponseCode = 201;

        const responsePromise = waitForResponse(page, '/api/articles');

        // Act
        const articlePage = await addArticlesView.createArticle(articleData);
        const response = await responsePromise;

        // Assert
        await expect(articlePage.articleTitle).toHaveText(
          articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
          articleData.articleBody,
        );
        expect(response.status()).toBe(expectedResponseCode);
      },
    );
    test(
      'should return created article from API',
      { tag: ['@GAD-R07-04', '@logged'] },
      async ({ addArticlesView, page }) => {
        // Arrange
        const articleData = prepareRandomArticle();
        const responsePromise = page.waitForResponse(
          (response) => {
            // console.log(
            //   response.request().method(),
            //   response.url(),
            //   response.status(),
            // );
            return (
              response.url().includes('/api/articles') &&
              response.request().method() == 'GET'
            );
          },
          { timeout: RESPONSE_TIMEOUT },
        );

        // Act
        const articlePage = await addArticlesView.createArticle(articleData);
        const response = await responsePromise;

        // Assert
        await expect
          .soft(articlePage.articleTitle)
          .toHaveText(articleData.articleTitle);

        expect(response.ok()).toBeTruthy();
      },
    );
  });
});

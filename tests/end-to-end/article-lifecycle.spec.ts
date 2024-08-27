import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixtures';
import { AddArticleModel } from '@_src/models/article.model';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let articleData: AddArticleModel;

  test(
    'create new article with mandatory fields',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ addArticlesView }) => {
      // Arrange
      articleData = prepareRandomArticle();

      // Act
      await expect.soft(addArticlesView.addNewHeader).toBeVisible();
      const articlePage = await addArticlesView.createArticle(articleData);

      // Assert
      await expect(articlePage.articleTitle).toHaveText(
        articleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(articleData.articleBody);
    },
  );
  test(
    'User can access single article',
    { tag: ['@GAD-R04-03', '@logged'] },
    async ({ articlesPage }) => {
      // Act
      const articlePage = await articlesPage.goToArticle(
        articleData.articleTitle,
      );

      // Assert
      await expect(articlePage.articleTitle).toHaveText(
        articleData.articleTitle,
      );
      await expect(articlePage.articleBody).toHaveText(articleData.articleBody);
    },
  );

  test(
    'User can delete his own article',
    { tag: ['@GAD-R04-04', '@logged'] },
    async ({ articlesPage }) => {
      // Arrange
      const expectedArticlesTitle = 'Articles';
      const expectedTextMessage = 'No data';
      const articlePage = await articlesPage.goToArticle(
        articleData.articleTitle,
      );

      // Act
      articlesPage = await articlePage.deleteArticle();

      // Assert
      await articlesPage.waitForPageToLoadUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedArticlesTitle);

      await articlesPage.searchArticle(articleData.articleTitle);
      await expect(articlesPage.noResultText).toHaveText(expectedTextMessage);
    },
  );
});

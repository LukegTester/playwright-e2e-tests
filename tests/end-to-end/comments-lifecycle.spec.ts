import { prepareRandomArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlePage: ArticlePage;
  let createArticleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    createArticleData = prepareRandomArticle();

    await articlesPage.goto();
    const addArticlesView = await articlesPage.clickAddArticleButtonLogged();
    articlePage = await addArticlesView.createArticle(createArticleData);
  });

  test('operate on comment', { tag: ['@GAD-R05-1', '@GAD-R05-2', '@logged'] }, async () => {
    const createCommentData = prepareRandomComment();

    await test.step('create new comment', async () => {
      // Arrange
      const expectedNewHeaderText = 'Add New Comment';
      const expectedCreatePopup = 'Comment was created';

      // Act
      const addCommentView = await articlePage.clickAddCommentButton();
      await expect.soft(addCommentView.addNewHeader).toHaveText(expectedNewHeaderText);

      articlePage = await addCommentView.createComment(createCommentData);

      // Assert
      await expect.soft(articlePage.alertPopup).toHaveText(expectedCreatePopup);
    });

    let commentPage = await test.step('verify created comment', async () => {
      // Act
      const articleComment = articlePage.getArticleComment(createCommentData.body);
      await expect.soft(articleComment.body).toHaveText(createCommentData.body);
      const commentPage = await articlePage.clickCommentLink(articleComment);

      // Assert
      await expect(commentPage.commentBody).toHaveText(createCommentData.body);
      return commentPage;
    });

    let editCommentData: AddCommentModel;
    await test.step('edit comment', async () => {
      // Arrange
      const expectedEditPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      // Act
      const editCommentView = await commentPage.clickEditButton();
      commentPage = await editCommentView.editComment(editCommentData);

      // Assert
      await expect.soft(commentPage.alertPopup).toHaveText(expectedEditPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment', async () => {
      // Act
      const articlePage = await commentPage.clickReturnLink();
      const updatedArticleComment = articlePage.getArticleComment(editCommentData.body);

      // Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
  });

  test(
    'user can add more then one comment to article',
    { tag: ['@GAD-R05-3', '@logged'] },
    async () => {
      await test.step('create new comment', async () => {
        // Arrange
        const createCommentData = prepareRandomComment();
        const expectedCreatePopup = 'Comment was created';

        // Act
        const addCommentView = await articlePage.clickAddCommentButton();
        articlePage = await addCommentView.createComment(createCommentData);

        // Assert
        await expect.soft(articlePage.alertPopup).toHaveText(expectedCreatePopup);
      });

      await test.step('create and verify second comment', async () => {
        const secondCommentBody = await test.step('create second comment', async () => {
          const secondCommentData = prepareRandomComment();
          const addCommentView = await articlePage.clickAddCommentButton();
          articlePage = await addCommentView.createComment(secondCommentData);
          return secondCommentData.body;
        });

        await test.step('verify second comment', async () => {
          const articleComment = articlePage.getArticleComment(secondCommentBody);
          await expect.soft(articleComment.body).toHaveText(secondCommentBody);
          const commentPage = await articlePage.clickCommentLink(articleComment);
          await expect(commentPage.commentBody).toHaveText(secondCommentBody);
        });
      });
    },
  );
});

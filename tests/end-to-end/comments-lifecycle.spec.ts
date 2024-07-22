import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { AddCommentModel } from '../../src/models/comment.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticlesView } from '../../src/views/add-articles.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let createArticleData: AddArticleModel;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    createArticleData = prepareRandomArticle();

    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addArticlesView = new AddArticlesView(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticlesView.createArticle(createArticleData);
  });
  test('operate new comment', { tag: '@GAD-R04-01' }, async () => {
    const createCommentData = prepareRandomComment();

    await test.step('create new comment', async () => {
      // Arrange
      const expectedNewHeaderText = 'Add New Comment';
      const expectedCreatePopup = 'Comment was created';

      // Act
      await articlePage.addCommentButton.click();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedNewHeaderText);

      await addCommentView.createComment(createCommentData);

      // Assert
      await expect.soft(articlePage.alertPopup).toHaveText(expectedCreatePopup);
    });

    await test.step('verify created comment', async () => {
      // Act
      const articleComment = articlePage.getArticleComment(
        createCommentData.body,
      );
      await expect.soft(articleComment.body).toHaveText(createCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(createCommentData.body);
    });

    let editCommentData: AddCommentModel;
    await test.step('edit comment', async () => {
      // Arrange
      const expectedEditPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      // Act
      await commentPage.editIcon.click();
      await editCommentView.editComment(editCommentData);

      // Assert
      await expect.soft(commentPage.alertPopup).toHaveText(expectedEditPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment', async () => {
      // Act
      await commentPage.returnLink.click();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );

      // Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
  });
});

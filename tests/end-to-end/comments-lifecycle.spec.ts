import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticlesView } from '../../src/views/add-articles.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticlesView: AddArticlesView;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let createArticleData: AddArticleModel;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    createArticleData = prepareRandomArticle();

    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addArticlesView = new AddArticlesView(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticlesView.createArticle(createArticleData);
  });
  test('create new comment', { tag: '@GAD-R04-01' }, async () => {
    // Arrange
    const expectedNewHeaderText = 'Add New Comment';
    const createCommentData = prepareRandomComment();
    const expectedPopupMessage = 'Comment was created';

    // Act
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(expectedNewHeaderText);
    await addCommentView.createComment(createCommentData);

    // Assert
    await expect(articlePage.alertPopup).toHaveText(expectedPopupMessage);

    // Verify comment
    // Act
    const articleComment = articlePage.getArticleComment(
      createCommentData.commentBody,
    );
    await expect(articleComment.body).toHaveText(createCommentData.commentBody);
    await articleComment.link.click();

    // Asser
    await expect(commentPage.commentBody).toHaveText(
      createCommentData.commentBody,
    );
  });
});

import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addArticlesView = new AddArticlesView(page);
    addCommentView = new AddCommentView(page);
    createArticleData = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticlesView.createArticle(createArticleData);
  });
  test('create new comment', { tag: '@GAD-R04-01' }, async () => {
    // Arrange
    const createCommentData = prepareRandomComment();
    const expectedPopupMessage = 'Comment was created';
    await articlePage.addCommentButton.click();

    // Act
    await addCommentView.createComment(createCommentData);

    // Assert
    await expect(articlePage.alertPopup).toHaveText(expectedPopupMessage);
  });
});

import { prepareRandomComment } from '@_src/ui/factories/comment.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixtures';
import { waitForResponse } from '@_src/ui/utils/wait.util';

test.describe('Verify comments API response', () => {
  test(
    'Comments data should be validated on backend',
    { tag: ['@sanity', '@GAD-R07-05', '@GAD-R05-2', '@logged'] },
    async ({ createRandomArticle, page }) => {
      const createCommentData = prepareRandomComment();
      let articlePage = createRandomArticle.articlePage;
      // Arrange
      const expectedNewHeaderText = 'Add New Comment';
      const expectedCreatePopup = 'Comment was created';

      const waitParams = {
        page,
        url: '/api/comments',
        method: 'GET',
        text: createCommentData.body,
      };
      const responsePromise = waitForResponse(waitParams);

      // Act
      const addCommentView = await articlePage.clickAddCommentButton();
      await expect.soft(addCommentView.addNewHeader).toHaveText(expectedNewHeaderText);

      articlePage = await addCommentView.createComment(createCommentData);
      const response = await responsePromise;

      // Assert
      await expect.soft(articlePage.alertPopup).toHaveText(expectedCreatePopup);

      expect(response.ok()).toBeTruthy();
    },
  );
});

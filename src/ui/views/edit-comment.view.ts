import { AddCommentModel } from '@_src/ui/models/comment.model';
import { CommentPage } from '@_src/ui/pages/comment.page';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.getByTestId('body-input');
  updateButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async editComment(editCommentData: AddCommentModel): Promise<CommentPage> {
    await this.bodyInput.fill(editCommentData.body);
    await this.updateButton.click();
    return new CommentPage(this.page);
  }
}

import { AddCommentModel } from '../models/comment.model';
import { Page } from '@playwright/test';

export class AddCommentView {
  bodyInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });

  constructor(private page: Page) {}

  async createComment(addCommentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(addCommentData.commentBody);
    await this.saveButton.click();
  }
}

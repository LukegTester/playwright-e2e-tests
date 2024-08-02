import { AddCommentModel } from '@_src/models/comment.model';
import { Page } from '@playwright/test';

export class AddCommentView {
  addNewHeader = this.page.getByRole('heading', { name: 'Add New Comment' });
  bodyInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });

  constructor(private page: Page) {}

  async createComment(addCommentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(addCommentData.body);
    await this.saveButton.click();
  }
}

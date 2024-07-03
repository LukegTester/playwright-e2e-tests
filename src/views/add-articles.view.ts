import { Page } from '@playwright/test';

export class AddArticlesView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

  constructor(private page: Page) {}
}

import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.components';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');
  deleteIcon = this.page.getByTestId('delete');
  editIcon = this.page.getByTestId('edit');
  returnLink = this.page.getByTestId('return');

  alertPopup = this.page.getByTestId('alert-popup');
  constructor(page: Page) {
    super(page);
  }
}

import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');
  deleteIcon = this.page.getByTestId('delete');

  //alertPopup = this.page.getByTestId('alert-popup');
  constructor(page: Page) {
    super(page);
  }
}

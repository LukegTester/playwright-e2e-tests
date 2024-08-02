import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.components';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  url = '/comments.html';
  mainMenu = new MainMenuComponent(this.page);
  constructor(page: Page) {
    super(page);
  }
}

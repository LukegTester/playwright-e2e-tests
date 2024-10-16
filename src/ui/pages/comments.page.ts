import { MainMenuComponent } from '@_src/ui/components/main-menu.components';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  url = '/comments.html';
  mainMenu = new MainMenuComponent(this.page);
  constructor(page: Page) {
    super(page);
  }
}

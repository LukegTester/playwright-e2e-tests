import { MainMenuComponent } from '@_src/components/main-menu.components';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');
  deleteButton = this.page.getByTestId('delete');
  editButton = this.page.getByTestId('edit');
  returnLink = this.page.getByTestId('return');

  alertPopup = this.page.getByTestId('alert-popup');
  constructor(page: Page) {
    super(page);
  }

  async clickEditButton(): Promise<EditCommentView> {
    await this.editButton.click();
    return new EditCommentView(this.page);
  }

  async clickReturnLink(): Promise<ArticlePage> {
    await this.returnLink.click();
    return new ArticlePage(this.page);
  }
}

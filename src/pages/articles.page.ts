import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(articleTitle: string): Promise<void> {
    await this.page.getByText(articleTitle).click();
  }
}

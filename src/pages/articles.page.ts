import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  searchButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(articleTitle: string): Promise<void> {
    await this.page.getByText(articleTitle).click();
  }

  async searchArticle(phrase: string): Promise<void> {
    await this.searchInput.fill(phrase);
    await this.searchButton.click();
  }
}

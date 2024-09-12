import { MainMenuComponent } from '@_src/components/main-menu.components';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { AddArticlesView } from '@_src/views/add-articles.view';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  goSearchButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(articleTitle: string): Promise<ArticlePage> {
    await this.page.getByText(articleTitle).click();
    return new ArticlePage(this.page);
  }

  async searchArticle(phrase: string): Promise<ArticlesPage> {
    await this.searchInput.fill(phrase);
    await this.goSearchButton.click();
    return this;
  }

  async clickAddArticleButtonLogged(): Promise<AddArticlesView> {
    await this.addArticleButtonLogged.click();
    return new AddArticlesView(this.page);
  }
}

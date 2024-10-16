import { ArticlesPage } from '@_src/ui/pages/articles.page';
import { CommentsPage } from '@_src/ui/pages/comments.page';
import { HomePage } from '@_src/ui/pages/home.page';
import { Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePageButton = this.page.getByRole('link', { name: '🦎 GAD' });

  constructor(private page: Page) {}

  async clickCommentsButton(): Promise<CommentsPage> {
    await this.commentsButton.click();
    return new CommentsPage(this.page);
  }

  async clickArticlesButton(): Promise<ArticlesPage> {
    await this.articlesButton.click();
    return new ArticlesPage(this.page);
  }

  async clickHomePageButton(): Promise<HomePage> {
    await this.homePageButton.click();
    return new HomePage(this.page);
  }
}

import { ArticlePayload } from '@_src/models/article.api.model';
import { prepareRandomArticle } from '@_src/ui/factories/article.factory';

export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomArticle();
  const articleData = {
    title: randomArticleData.articleTitle,
    body: randomArticleData.articleBody,
    date: new Date().toISOString(),
    image: '.\\data\\images\\256\\presentation_04aafc8b-7a49-4112-bf1c-5d7d9e338c97.jpg',
  };

  return articleData;
}

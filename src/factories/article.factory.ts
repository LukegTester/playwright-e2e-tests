import { AddArticleModel } from '@_src/models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomArticle(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticleModel {
  let articleTitle: string;

  if (titleLength) articleTitle = faker.string.alpha(titleLength);
  else articleTitle = faker.lorem.sentence();

  const articleBody = faker.lorem.paragraph(bodyParagraphs);
  const createArticleData: AddArticleModel = {
    articleTitle: articleTitle,
    articleBody: articleBody,
  };

  return createArticleData;
}

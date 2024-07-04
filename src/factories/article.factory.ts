import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticleData(): AddArticleModel {
  const articleTitle = faker.lorem.sentence();
  const articleBody = faker.lorem.paragraph(5);
  const createArticleData: AddArticleModel = {
    articleTitle: articleTitle,
    articleBody: articleBody,
  };

  return createArticleData;
}

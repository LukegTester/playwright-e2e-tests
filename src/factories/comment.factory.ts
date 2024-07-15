import { AddCommentModel } from '../models/comment.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomComment(bodyParagraphs = 5): AddCommentModel {
  const commentBody = faker.lorem.paragraph(bodyParagraphs);
  const createCommentData: AddCommentModel = {
    commentBody: commentBody,
  };

  return createCommentData;
}

import { AddCommentModel } from '@_src/ui/models/comment.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomComment(bodySentences = 5): AddCommentModel {
  const commentBody = faker.lorem.sentence(bodySentences);
  const createCommentData: AddCommentModel = {
    body: commentBody,
  };

  return createCommentData;
}

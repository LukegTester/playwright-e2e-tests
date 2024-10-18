import { CommentPayload } from '@_src/api/models/comment.api.model';
import { prepareRandomComment } from '@_src/ui/factories/comment.factory';

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: new Date().toISOString(),
  };

  return commentData;
}

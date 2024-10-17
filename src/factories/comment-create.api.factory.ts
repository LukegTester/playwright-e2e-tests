import { apiUrls } from '@_src/api/utils/api.util';
import { prepareCommentPayload } from '@_src/factories/comment-payload.factory';
import { CommentPayload } from '@_src/models/comment.api.model';
import { Headers } from '@_src/models/header.api.model';
import { expect } from '@_src/ui/fixtures/merge.fixtures';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function createCommentWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleId: number,
  commentData?: CommentPayload,
): Promise<APIResponse> {
  const commentDataFinal = commentData || prepareCommentPayload(articleId);
  const responseComment = await request.post(apiUrls.commentsUrl, {
    headers,
    data: commentDataFinal,
  });

  // assert comment exist
  const commentJson = await responseComment.json();
  const expectedGetCommentStatusCode = 200;

  await expect(async () => {
    const responseCommentCreated = await request.get(`${apiUrls.commentsUrl}/${commentJson.id}`);

    expect(
      responseCommentCreated.status(),
      `Expected to receive status code ${expectedGetCommentStatusCode} but received status: ${responseCommentCreated.status()}`,
    ).toBe(expectedGetCommentStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseComment;
}

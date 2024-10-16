import { prepareRandomComment } from '@_src/ui/factories/comment.factory';
import { testUser1 } from '@_src/ui/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
}

export interface CommentPayload {
  article_id: number;
  body: string;
  date: string;
}

export interface Headers {
  [key: string]: string;
}

export const apiLinks = {
  articlesUrl: '/api/articles',
  commentsUrl: '/api/comments',
  loginUrl: '/api/login',
};

export async function getAuthorizationHeader(request: APIRequestContext): Promise<Headers> {
  const loginUrl = apiLinks.loginUrl;

  const loginData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };

  const responseLogin = await request.post(loginUrl, {
    data: loginData,
  });

  const loginBody = await responseLogin.json();
  return {
    Authorization: `Bearer ${loginBody.access_token}`,
  };
}

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: new Date().toISOString(),
  };

  return commentData;
}

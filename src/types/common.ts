export type Response<T> = {
  code: number;
  data: T;
  message: string;
};

export type DataWithPaging<T> = {
  content: T;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type ResponseError = {
  code: number;
  message: string;
};

export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  bio: string;
  categories: Category[];
  contentCreator: boolean;
  reason: string;
};

export enum ArticleStatus {
  Draft = "DRAFT",
  Approve = "APPROVE",
  Delete = "DELETE",
  Create = "CREATE",
}

export type Article = {
  createdBy: User;
  modifiedBy: User;
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  brief: string;
  status: ArticleStatus;
  mainImage: string;
  thumbnail: string;
  description: string;
  type: string;
  category?: Category;
  keyword: string;
  shortDescription: string;
  user: User;
  slug: string;
  totalLike: number;
};

export type Comment = {
  id: number;
  description: string;
  name: string;
  image: string;
  createdAt: string;
  username: string;
  updatedAt: string;
  articleId: number;
};

export type UserLikeArticle = {
  id: number;
  name: string;
  articleId: number;
  userId: number;
  createdDate: string;
  updatedAt: string;
  isLike: 0 | 1;
};

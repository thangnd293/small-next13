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
};

export enum ArticleStatus {
  Draft = "DRAFT",
  Approved = "APPROVED",
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
  image1: string;
  description: string;
  type: string;
  category: string;
  keyword: string;
};

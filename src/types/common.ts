export type Response<T> = {
  code: number;
  data: T;
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

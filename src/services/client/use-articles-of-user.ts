import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, DataWithPaging, Response } from "@/types/common";

export const getUserArticleOfUserKey = (userName: string, status: string) => [
  "articles",
  userName,
  status,
];
export const useArticlesOfUser = (
  userName: string,
  status: string = "APPROVE"
) => {
  const { data, ...rest } = useQuery(
    getUserArticleOfUserKey(userName, status),
    () =>
      axios.get<Response<DataWithPaging<Article[]>>>(
        `/article/v2/getAllPaging?page=0&size=50&sort=updatedAt%2Cdesc&sort=createdAt%2Cdesc`,
        {
          params: {
            status,
            username: userName,
          },
        }
      )
  );

  return {
    articles: data?.data.data.content || [],
    ...rest,
  };
};

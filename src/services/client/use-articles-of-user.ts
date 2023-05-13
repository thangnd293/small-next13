import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, DataWithPaging, Response } from "@/types/common";

export const getUserArticleOfUserKey = (userName: string) => [
  "articles",
  userName,
];
export const useArticlesOfUser = (userName: string) => {
  const { data, ...rest } = useQuery(getUserArticleOfUserKey(userName), () =>
    axios.get<Response<DataWithPaging<Article[]>>>(
      `/article/v2/getAllPaging?page=0&size=20&status=APPROVE&username=${userName}`
    )
  );

  return {
    articles: data?.data.data.content || [],
    ...rest,
  };
};

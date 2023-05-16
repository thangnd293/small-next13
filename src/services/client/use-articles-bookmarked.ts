import { Article, DataWithPaging, Response } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getArticleBookmarkedKey = (userId?: number) => [
  "bookmarked",
  userId,
];

export const useArticlesBookmarked = (userId?: number) => {
  const { data, ...rest } = useQuery(
    getArticleBookmarkedKey(userId),
    () =>
      axios.get<Response<DataWithPaging<Article[]>>>(
        `/article/user/saveArticle/getAll?userId=${userId}&page=0&size=100`
      ),
    {
      enabled: !!userId,
    }
  );

  return {
    articles: data?.data.data.content ?? [],
    ...rest,
  };
};
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, Response } from "@/types/common";

export const searchArticleKey = (keyword: string) => [
  "search",
  "article",
  keyword,
];

const searchArticle = (keyword: string) =>
  axios.get<Response<Article[]>>(
    `/article/getAll?status=APPROVE&title=${keyword}`
  );

export const useSearchArticle = (keyword: string) => {
  const { data, ...rest } = useQuery(
    searchArticleKey(keyword),
    () => searchArticle(keyword),
    {
      enabled: !!keyword.trim(),
    }
  );

  return {
    articleFound: data?.data.data || [],
    ...rest,
  };
};

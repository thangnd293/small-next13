import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, DataWithPaging, Response } from "@/types/common";

export const getArticlesKey = ["articles"];

const getArticles = (page: number) =>
  axios.get<Response<DataWithPaging<Article[]>>>(
    `/article/getAllPaging?page=${page}&size=20`
  );

export const useArticles = () => {
  return useInfiniteQuery({
    queryKey: getArticlesKey,
    queryFn: ({ pageParam = 1 }) => getArticles(pageParam),
    getNextPageParam: ({
      data: {
        data: { number, totalPages },
      },
    }) => {
      if (number < totalPages) return number + 1;

      return;
    },
  });
};

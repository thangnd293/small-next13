import { useQuery } from "@tanstack/react-query";

import { Article, Response } from "@/types/common";
import { axios } from "@/lib/axios";
export const useArticles = () => {
  const { data, ...rest } = useQuery(["all-articles"], () =>
    axios.get<Response<Article[]>>("/article/getAll?status=APPROVE")
  );

  return {
    articles: data?.data.data || [],
    ...rest,
  };
};

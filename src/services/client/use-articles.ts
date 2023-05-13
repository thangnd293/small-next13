import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, Response } from "@/types/common";
export const useArticles = () => {
  const { data, ...rest } = useQuery(["all-articles"], () =>
    axios.get<Response<Article[]>>("/article/getAll?status=APPROVE")
  );

  return {
    articles: data?.data.data || [],
    ...rest,
  };
};

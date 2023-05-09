import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, Response } from "@/types/common";

export const getArticleKey = (id: number) => ["articles", id];

const getArticle = (id: number) =>
  axios.get<Response<Article>>(`/article/getDetail?id=${id}`);

export const useArticle = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: getArticleKey(id),
    queryFn: () => getArticle(id),
    refetchOnWindowFocus: false,
  });

  return {
    article: data?.data.data,
    ...rest,
  };
};

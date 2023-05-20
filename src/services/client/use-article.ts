import { useQuery } from "@tanstack/react-query";
import { Article, Response } from "@/types/common";
import { axios } from "@/lib/axios";

export const getArticleKey = (id: number) => ["articles", id];

const getArticle = (id: number) =>
  axios.get<Response<Article>>(`/article/getDetail?id=${id}`);

export const useArticle = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: getArticleKey(id),
    queryFn: () => getArticle(id),
  });

  return {
    article: data?.data.data,
    ...rest,
  };
};

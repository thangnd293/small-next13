import { useQuery } from "@tanstack/react-query";

import { DataWithPaging, Response, Comment } from "@/types/common";
import { axios } from "@/lib/axios";

export const getCommentsKey = (articleId: number) => ["comments", articleId];

export const useComments = (articleId: number) => {
  const { data, ...rest } = useQuery(getCommentsKey(articleId), () =>
    axios.get<Response<DataWithPaging<Comment[]>>>(
      `/interaction/v1/comment/getAll/${articleId}?page=0&size=100&sort=updatedAt%2Cdesc&sort=createdAt%2Cdesc`
    )
  );

  return {
    comments: data?.data.data.content ?? [],
    ...rest,
  };
};

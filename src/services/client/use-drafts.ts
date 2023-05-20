import { useQuery } from "@tanstack/react-query";

import { Article, DataWithPaging, Response } from "@/types/common";
import { axios } from "@/lib/axios";

export const getDraftsKey = ["drafts"];

const getDrafts = (username: string) =>
  axios.get<Response<DataWithPaging<Article[]>>>(
    `/article/getAllPaging?sort=updatedAt%2Cdesc&status=DRAFT&username=${username}`
  );

export const useDrafts = (username: string) => {
  const { data, ...rest } = useQuery(getDraftsKey, () => getDrafts(username), {
    enabled: !!username,
  });

  return {
    drafts: data?.data.data.content,
    ...rest,
  };
};

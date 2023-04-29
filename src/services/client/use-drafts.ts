import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, DataWithPaging, Response } from "@/types/common";

export const getDraftsKey = ["drafts"];

const getDrafts = () =>
  axios.get<Response<DataWithPaging<Article[]>>>(
    "/article/getAllPaging?sort=updatedAt%2Cdesc&status=DRAFT"
  );

export const useDrafts = () => {
  const { data, ...rest } = useQuery(getDraftsKey, getDrafts);

  return {
    drafts: data?.data.data.content,
    ...rest,
  };
};

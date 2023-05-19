import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const deleteArticle = (id: number) => {
  return axios.put<Response<Article>>(
    `/article/changeStatus?articleId=${id}&status=DELETE`
  );
};

export const useDeleteArticle = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    number
  > = {}
) => {
  return useMutation(deleteArticle, config);
};

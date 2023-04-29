import {
  Article,
  ArticleStatus,
  Response,
  ResponseError,
} from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const deleteDraft = (id: number) => {
  return axios.put<Response<Article>>(
    `/article/changeStatus?articleId=${id}&status=DELETE`
  );
};

export const useDeleteDraft = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    number
  > = {}
) => {
  return useMutation(deleteDraft, config);
};

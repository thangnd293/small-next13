import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const updateDraft = (draft: Partial<Article>) => {
  return axios.put<Response<Article>>(`/article/update`, draft);
};

export const useUpdateDraft = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    Partial<Article>
  > = {}
) => {
  return useMutation(updateDraft, config);
};

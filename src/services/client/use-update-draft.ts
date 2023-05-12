import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

export type UpdateDraftInput = Partial<Article> & {
  categoryId?: number;
};

const updateDraft = (draft: UpdateDraftInput) => {
  return axios.put<Response<Article>>(`/article/update`, draft);
};

export const useUpdateDraft = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    Partial<UpdateDraftInput>
  > = {}
) => {
  return useMutation(updateDraft, config);
};

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Article, Response, ResponseError } from "@/types/common";
import { AxiosError } from "axios";
import { axios } from "@/lib/axios";

export const usePublicDraft = (
  config: UseMutationOptions<
    Response<Article>,
    AxiosError<ResponseError>,
    number
  > = {}
) => {
  const { data, ...rest } = useMutation(
    (draftId: number): any =>
      axios.post<Response<Article>>(`/article/publicDraft?draftId=${draftId}`),
    {
      ...config,
    }
  );

  return { data: data?.data, ...rest };
};

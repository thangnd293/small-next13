import { axios } from "@/lib/axios";
import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type Payload = {
  articleId: number;
  userId: number;
};

export const useBookmarkArticle = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article[]>>,
    AxiosError<ResponseError>,
    Payload
  > = {}
) => {
  return useMutation(
    ({ userId, articleId }: Payload) =>
      axios.post(
        `/article/user/addSaveArticle?userId=${userId}&articleId=${articleId}`
      ),
    config
  );
};

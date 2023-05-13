import { Response, ResponseError, UserLikeArticle } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

type Payload = {
  articleId: number;
  userId: number;
};

export const useLikeArticle = (
  config: UseMutationOptions<
    AxiosResponse<Response<UserLikeArticle>>,
    AxiosError<ResponseError>,
    Payload
  > = {}
) => {
  return useMutation(
    (payload: Payload) => axios.post("/interaction/v1/like/add", payload),
    config
  );
};

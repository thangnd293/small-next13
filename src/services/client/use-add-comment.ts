import axios from "axios";
import { Comment, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type Payload = {
  userId: number;
  articleId: number;
  description: string;
};

export const useAddComment = (
  config: UseMutationOptions<
    AxiosResponse<Response<Comment>>,
    AxiosError<ResponseError>,
    Payload
  > = {}
) => {
  return useMutation((payload: Payload) => {
    return axios.post("/interaction/v1/comment/add", payload);
  }, config);
};

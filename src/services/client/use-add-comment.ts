import { Comment, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

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
  return useMutation(
    (payload: Payload) => axios.post("/interaction/v1/comment/add", payload),
    config
  );
};

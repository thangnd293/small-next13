import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Comment, Response } from "@/types/common";

type Payload = Pick<Comment, "id" | "description">;

export const useUpdateComment = (
  config: UseMutationOptions<
    AxiosResponse<Response<Comment>>,
    AxiosError,
    Payload
  > = {}
) => {
  const { data, ...rest } = useMutation(
    (payload: Payload) =>
      axios.put<Response<Comment>>("/interaction/v1/comment/update", payload),
    config
  );

  return { data: data?.data, ...rest };
};

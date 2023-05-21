import axios from "axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteComment = (
  config: UseMutationOptions<unknown, AxiosError, number>
) => {
  return useMutation(
    (id: number) => axios.delete(`/interaction/v1/comment/${id}`),
    config
  );
};

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useDeleteComment = (
  config: UseMutationOptions<unknown, AxiosError, number>
) => {
  return useMutation(
    (id: number) => axios.delete(`/interaction/v1/comment/${id}`),
    config
  );
};

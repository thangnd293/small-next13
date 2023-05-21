import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Response } from "@/types/common";
import axios from "axios";

type Payload = {
  userId: number;
  categories: number[];
};

export const useUpdateCategories = (
  config: UseMutationOptions<Response<unknown>, AxiosError, Payload> = {}
) => {
  const { data, ...rest } = useMutation(
    ({ userId, categories }: Payload): any =>
      axios.post<Response<unknown>>("/user/updateCategory", {
        userId,
        categories,
      }),
    {
      ...config,
    }
  );

  return { data: data?.data, ...rest };
};

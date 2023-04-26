import { User } from "@/types/common";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useUserInfo = () => {
  const {} = useQuery(["/user-info"], () => axios.get(""));
};

export const useUpdateUserInfo = (
  config: UseMutationOptions<unknown, AxiosError, unknown> = {}
) => {
  return useMutation(
    (user: Partial<User>) => axios.put("/api/user/updateInfo", user),
    config
  );
};

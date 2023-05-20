import { axios } from "@/lib/axios";
import { User } from "@/types/common";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUserInfo = () => {
  const {} = useQuery(["/user-info"], () => axios.get(""));
};

export const useUpdateUserInfo = (
  config: UseMutationOptions<unknown, AxiosError, unknown> = {}
) => {
  return useMutation(
    (user: Partial<User>) => axios.put("/user/updateInfo", user),
    config
  );
};

import { useQuery } from "@tanstack/react-query";

import { Response, User } from "@/types/common";
import { axios } from "@/lib/axios";

export const getUserKey = (username: string) => ["user", username];

const getUser = (username: string) =>
  axios.get<Response<User>>(`/user/${username}`);

export const useUser = (username: string) => {
  const { data, ...rest } = useQuery(
    getUserKey(username),
    () => getUser(username),
    {
      enabled: !!username.trim(),
    }
  );

  return {
    user: data?.data.data,
    ...rest,
  };
};

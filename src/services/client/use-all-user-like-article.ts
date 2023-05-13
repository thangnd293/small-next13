import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Response, UserLikeArticle } from "@/types/common";

export const getAllUserLikeArticleKey = (id: number) => ["all-like", id];

const getAllUserLikeArticle = (id: number) =>
  axios.get<Response<UserLikeArticle[]>>(`/interaction/v1/like/getAll/${id}`);

export const useAllUserLikeArticle = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: getAllUserLikeArticleKey(id),
    queryFn: () => getAllUserLikeArticle(id),
  });

  return {
    allUserLike: data?.data.data.filter((user) => user.isLike) || [],
    ...rest,
  };
};

import { ArticleStatus } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Payload = {
  articleId: number;
  status: ArticleStatus;
};
export const useChangeStatusArticle = () => {
  return useMutation(({ articleId, status }: Payload) =>
    axios.put(`/article/changeStatus?articleId=${articleId}&status=${status}`)
  );
};

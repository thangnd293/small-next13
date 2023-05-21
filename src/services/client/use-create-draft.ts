import axios from "axios";
import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateDraft = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    string
  > = {}
) => {
  return useMutation(
    (token: string) =>
      axios.post(
        "/article/addNewDraft",
        {
          title: "",
          brief: "",
          description: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    config
  );
};

import { Article, Response, ResponseError } from "@/types/common";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

export const useCreateDraft = (
  config: UseMutationOptions<
    AxiosResponse<Response<Article>>,
    AxiosError<ResponseError>,
    void
  > = {}
) => {
  return useMutation(
    () =>
      axios.post("/article/addNewDraft", {
        title: "",
        brief: "",
        description: "",
      }),
    config
  );
};

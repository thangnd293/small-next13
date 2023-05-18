import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Payload = {
  userId: number;
  reason: string;
};

export const useRegisterWriter = (
  config: UseMutationOptions<unknown, AxiosError, Payload> = {}
) => {
  return useMutation(
    (payload: Payload) => axios.post("/user/contentAccess", payload),
    config
  );
};

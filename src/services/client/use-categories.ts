import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Response, Category } from "@/types/common";
export const useCategories = () => {
  const { data, ...rest } = useQuery(["categories"], () =>
    axios.get<Response<Category[]>>("/article/category/getAll")
  );

  return {
    categories: data?.data.data || [],
    ...rest,
  };
};

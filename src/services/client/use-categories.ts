import { useQuery } from "@tanstack/react-query";
import { Response, Category } from "@/types/common";
import axios from "axios";

export const useCategories = () => {
  const { data, ...rest } = useQuery(["categories"], () =>
    axios.get<Response<Category[]>>("/article/category/getAll")
  );

  return {
    categories: data?.data.data || [],
    ...rest,
  };
};

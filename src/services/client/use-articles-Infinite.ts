import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Article, DataWithPaging, Response } from "@/types/common";
import { useEffect } from "react";

export const getArticlesKey = (categories: string[]) => [
  "articles",
  categories,
];

const getArticles = (page: number, categories: string[]) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: "20",
    status: "APPROVE",
  });

  categories.forEach((category) => {
    params.append("listCategory", category);
  });

  return axios.get<Response<DataWithPaging<Article[]>>>(
    `/article/v2/getAllPaging?${params}`
  );
};

export const useArticlesInfinite = (categories: string[] = []) => {
  const { hasNextPage, fetchNextPage, ...rest } = useInfiniteQuery({
    queryKey: getArticlesKey(categories),
    queryFn: ({ pageParam = 0 }) => getArticles(pageParam, categories),
    getNextPageParam: ({
      data: {
        data: { number, totalPages },
      },
    }) => {
      if (number < totalPages - 1) return number + 1;

      return;
    },
  });

  useEffect(() => {
    let fetching = false;

    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;

      const isAtBottom = scrollHeight - scrollTop <= clientHeight * 1.2;

      if (!fetching && isAtBottom) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return rest;
};

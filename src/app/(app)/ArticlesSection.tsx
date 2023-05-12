"use client";

import Article from "@/components/Article";
import { useArticles } from "@/services/client/use-articles";
import React, { useEffect } from "react";

//TODO: Fix infinity scroll
export default function ArticlesSection() {
  const { data, isSuccess, isFetching, fetchNextPage, hasNextPage } =
    useArticles();

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

  return (
    <div className="flex flex-col gap-8">
      {isSuccess &&
        data.pages.map((page) =>
          page.data.data.content.map((article) => <Article key={article.id} />)
        )}

      {isFetching &&
        Array.from({ length: 4 }).map((_, index) => (
          <Article.Skeleton key={index} />
        ))}
    </div>
  );
}

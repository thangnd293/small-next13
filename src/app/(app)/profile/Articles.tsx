"use client";

import { Article } from "@/components/Article";
import { useGlobalContext } from "@/context/GlobalContext";
import { useArticlesOfUser } from "@/services/client/use-articles-of-user";
import React from "react";
interface Props {
  username: string;
}
export default function Articles({ username }: Props) {
  const { articles, isLoading } = useArticlesOfUser(username);
  const { articlesBookmarked } = useGlobalContext();

  if (!isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col gap-8 mt-10">
        <div className="text-2xl font-semibold text-center">
          Không có bài viết nào
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-10">
      {isLoading || !articlesBookmarked
        ? Array.from({ length: 3 }).map((_, index) => (
            <Article.Skeleton key={index} />
          ))
        : articles.map((article) => (
            <Article
              key={article.id}
              article={article}
              hasBookmarked={articlesBookmarked.some(
                (ar) => ar.id === article.id
              )}
            />
          ))}
    </div>
  );
}

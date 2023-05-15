"use client";

import { Article } from "@/components/Article";
import { useGlobalContext } from "@/context/GlobalContext";
import { Article as TArticle } from "@/types/common";
import React from "react";

interface Props {
  articles: TArticle[];
}
export default function Articles({ articles }: Props) {
  const { articlesBookmarked } = useGlobalContext();

  return (
    <div className="flex flex-col gap-8 mt-10">
      {articles.map((article) => (
        <Article
          key={article.id}
          article={article}
          hasBookmarked={articlesBookmarked.some((ar) => ar.id === article.id)}
        />
      ))}
    </div>
  );
}

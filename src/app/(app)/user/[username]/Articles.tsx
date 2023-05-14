"use client";

import { Article } from "@/components/Article";
import { Article as TArticle } from "@/types/common";
import React from "react";

interface Props {
  articles: TArticle[];
}
export default function Articles({ articles }: Props) {
  return (
    <div className="flex flex-col gap-8 mt-10">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}

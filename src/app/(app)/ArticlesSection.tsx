"use client";

import { Article } from "@/components/Article";
import { useGlobalContext } from "@/context/GlobalContext";
import { useArticlesInfinite } from "@/services/client/use-articles-Infinite";

export default function ArticlesSection() {
  const { userInfo, articlesBookmarked } = useGlobalContext();
  const { data, isSuccess, isFetching } = useArticlesInfinite(
    userInfo?.categories?.map((category) => category.name)
  );

  return (
    <div className="flex flex-col gap-8">
      {isSuccess &&
        data.pages.map((page) =>
          page.data.data.content.map((article) => (
            <Article
              key={article.id}
              article={article}
              hasBookmarked={articlesBookmarked.some(
                (ar) => ar.id === article.id
              )}
            />
          ))
        )}

      {isFetching &&
        Array.from({ length: 4 }).map((_, index) => (
          <Article.Skeleton key={index} />
        ))}
    </div>
  );
}

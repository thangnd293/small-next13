"use client";

import { Article } from "@/components/Article";
import { useUserInfoContext } from "@/context/UserContext";
import { useArticlesInfinite } from "@/services/client/use-articles-Infinite";

export default function ArticlesSection() {
  const { userInfo } = useUserInfoContext();
  const { data, isSuccess, isFetching } = useArticlesInfinite(
    userInfo?.categories.map((category) => category.name)
  );

  return (
    <div className="flex flex-col gap-8">
      {isSuccess &&
        data.pages.map((page) =>
          page.data.data.content.map((article) => (
            <Article key={article.id} article={article} />
          ))
        )}

      {isFetching &&
        Array.from({ length: 4 }).map((_, index) => (
          <Article.Skeleton key={index} />
        ))}
    </div>
  );
}

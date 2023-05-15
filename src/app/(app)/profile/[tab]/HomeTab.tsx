import { Article } from "@/components/Article";
import { useGlobalContext } from "@/context/GlobalContext";
import { useArticlesOfUser } from "@/services/client/use-articles-of-user";

export default function HomeTab() {
  const { userInfo, articlesBookmarked } = useGlobalContext();

  const { articles, isSuccess, isLoading } = useArticlesOfUser(
    userInfo?.username || ""
  );
  if (!userInfo) return null;

  return (
    <div className="flex flex-col gap-8">
      {articles.map((article) => (
        <Article
          key={article.id}
          article={article}
          hasBookmarked={articlesBookmarked.some((ar) => ar.id === article.id)}
        />
      ))}
      {!isSuccess &&
        isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <Article.Skeleton key={index} />
        ))}
    </div>
  );
}

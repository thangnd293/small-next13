import { Article } from "@/components/Article";
import { useUserInfoContext } from "@/context/UserContext";
import { useArticlesOfUser } from "@/services/client/use-articles-of-user";

export default function HomeTab() {
  const { userInfo } = useUserInfoContext();
  if (!userInfo) return null;

  const { articles } = useArticlesOfUser(userInfo.username);
  return (
    <div className="flex flex-col gap-8">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}

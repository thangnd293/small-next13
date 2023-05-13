import ViewArticle from "@/components/ViewArticle";
import { checkUserLikeArticle, getArticle } from "@/services/server";
import ArticlesSection from "./ArticlesSection";
import AuthorSection from "./AuthorSection";
import { getCurrentUser } from "@/utils/session";

// TODO:
// Fix like behavior
// Follow author
// Delete, edit comment
export default async function ArticlePage({
  params,
}: {
  params: { articleSlug: string };
}) {
  const { articleSlug } = params;
  const id = Number(articleSlug.split("-").pop()?.slice(1));
  const user = await getCurrentUser();

  const [article, isUserLiked] = await Promise.all([
    await getArticle(articleSlug),
    checkUserLikeArticle(id, user?.id),
  ]);

  return (
    <>
      <ViewArticle article={article} hasLiked={isUserLiked} />
      <AuthorSection user={article.user} />
      <ArticlesSection article={article} />
    </>
  );
}

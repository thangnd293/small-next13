import ViewArticle from "@/components/ViewArticle";
import { getArticle } from "@/services/server";
import ArticlesSection from "./ArticlesSection";
import AuthorSection from "./AuthorSection";

export default async function ArticlePage({
  params,
}: {
  params: { articleSlug: string };
}) {
  const { articleSlug } = params;
  const article = await getArticle(articleSlug);

  return (
    <>
      <ViewArticle article={article} />
      <AuthorSection user={article.user} />
      <ArticlesSection article={article} />
    </>
  );
}

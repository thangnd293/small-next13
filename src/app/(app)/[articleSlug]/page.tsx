import ViewArticle from "@/components/ViewArticle";
import { checkUserLikeArticle, getArticle } from "@/services/server";
import ArticlesSection from "./ArticlesSection";
import AuthorSection from "./AuthorSection";
import { getCurrentUser } from "@/utils/session";
import { Metadata } from "next";

interface Props {
  params: { articleSlug: string };
}
// TODO:
// Follow author
// Delete, edit comment
export default async function ArticlePage({ params }: Props) {
  const { articleSlug } = params;

  const id = Number(articleSlug.split("-").pop()?.slice(1));

  const user = await getCurrentUser();

  const [article, isUserLiked] = await Promise.all([
    await getArticle(id),
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleSlug } = params;
  const id = Number(articleSlug.split("-").pop()?.slice(1));
  const article = await getArticle(id);

  return {
    title: article.title,
    description: article.shortDescription,
  };
}

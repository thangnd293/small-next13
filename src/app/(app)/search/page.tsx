import { searchArticle } from "@/services/server";
import Title from "./Title";
import ArticlesFound from "./ArticlesFound";

export type SearchArticleParams =
  | {
      keyword: string;
      readonly q?: undefined;
      readonly category?: undefined;
    }
  | {
      q: string;
      readonly keyword?: undefined;
      readonly category?: undefined;
    }
  | {
      category: string;
      readonly keyword?: undefined;
      readonly q?: undefined;
    };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchArticleParams;
}) {
  const { keyword, q, category } = searchParams;
  const search = (keyword || q || category) as string;
  const searchResults = await searchArticle(searchParams);

  return (
    <>
      <Title keyword={search} />
      <ArticlesFound articles={searchResults} />
    </>
  );
}

"use client";

import { Article } from "@/components/Article";
import Select from "@/components/Select";
import { useGlobalContext } from "@/context/GlobalContext";
import { useArticlesOfUser } from "@/services/client/use-articles-of-user";
import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
interface Props {
  username: string;
}
export default function Articles({ username }: Props) {
  const { colorMode } = useColorMode();
  const { articlesBookmarked } = useGlobalContext();
  const [filter, setFilter] = useState(filterOptions[0]);
  const { articles, isLoading } = useArticlesOfUser(username, filter.value);

  return (
    <>
      <Select
        className="mb-10 ml-auto w-60"
        colorMode={colorMode}
        options={filterOptions}
        value={filter}
        onChange={(option) => setFilter(option as Option)}
      />

      {!isLoading && articles.length === 0 && (
        <div className="flex flex-col gap-8 mt-10">
          <div className="text-2xl font-semibold text-center">
            Không có bài viết nào
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {isLoading || !articlesBookmarked
          ? Array.from({ length: 3 }).map((_, index) => (
              <Article.Skeleton key={index} />
            ))
          : articles.map((article) => (
              <Article
                key={article.id}
                article={article}
                hasBookmarked={articlesBookmarked.some(
                  (ar) => ar.id === article.id
                )}
              />
            ))}
      </div>
    </>
  );
}

type Option = {
  label: string;
  value: string;
};

const filterOptions: Option[] = [
  {
    label: "Đã xuất bản",
    value: "APPROVE",
  },
  {
    label: "Đang chờ duyệt",
    value: "CREATE",
  },
];

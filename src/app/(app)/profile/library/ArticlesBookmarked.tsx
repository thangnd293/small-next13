"use client";

import { Article } from "@/components/Article";
import Icons from "@/components/Icons";
import { useGlobalContext } from "@/context/GlobalContext";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function ArticlesBookmarked() {
  const { articlesBookmarked, isArticlesBookedLoading } = useGlobalContext();

  if (isArticlesBookedLoading)
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Article.Skeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      {articlesBookmarked.length > 0 ? (
        articlesBookmarked.map((article) => (
          <Article key={article.id} article={article} hasBookmarked />
        ))
      ) : (
        <Box
          className="flex items-center justify-center p-10 border border-gray-300 border-dashed text-text-secondary"
          _dark={{
            borderColor: "gray.700",
            color: "gray.300",
          }}
        >
          Nhấp vào <Icons.Bookmark className="inline-block px-1" width={30} />
          trên bất kỳ bài viết nào để thêm vào danh sách đọc sau.
        </Box>
      )}
    </div>
  );
}

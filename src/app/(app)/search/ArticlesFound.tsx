"use client";

import { Article } from "@/components/Article";
import { Article as TArticle } from "@/types/common";
import { Image } from "@chakra-ui/next-js";
import { Text } from "@chakra-ui/react";

interface Props {
  articles: TArticle[];
}

export default function ArticlesFound({ articles }: Props) {
  return (
    <div className="flex flex-col gap-8 mt-10">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Article key={article.id} article={article} />
        ))
      ) : (
        <div className="flex items-center justify-center">
          <div>
            <Image
              className="object-cover object-center"
              width={300}
              height={300}
              src="/images/search-result-not-found.webp"
              alt="Not found"
            />
            <Text align="center">Không tìm thấy kết quả tương ứng</Text>
          </div>
        </div>
      )}
    </div>
  );
}

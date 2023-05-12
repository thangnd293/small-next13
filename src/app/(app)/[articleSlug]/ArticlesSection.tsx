"use client";

import { Article } from "@/components/Article";
import { useArticles } from "@/services/client/use-articles";
import { Article as TArticle } from "@/types/common";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  article: TArticle;
}
export default function ArticlesSection({ article }: Props) {
  const { category } = article;
  const { data, isSuccess, isFetching } = useArticles(
    category?.name ? [category?.name] : undefined
  );

  return (
    <VStack mt="40px" p="20px" spacing="10px" bg="#FAFAFA" borderRadius="4px">
      <HStack w="full" align="flex-start" justify="space-between" mb="10px">
        <Text maxW="50%">
          Xem thêm về{" "}
          <Text as="span" fontWeight="semibold">
            {category?.name}
          </Text>
        </Text>
        <Button size="sm" colorScheme="teal">
          Theo dõi
        </Button>
      </HStack>

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
    </VStack>
  );
}

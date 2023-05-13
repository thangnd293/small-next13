"use client";

import { Article } from "@/components/Article";
import { useUserInfoContext } from "@/context/UserContext";
import { useUpdateCategories } from "@/services/client";
import { useArticlesInfinite } from "@/services/client/use-articles-Infinite";
import { Article as TArticle } from "@/types/common";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  article: TArticle;
}
export default function ArticlesSection({ article }: Props) {
  const router = useRouter();
  const { category, slug } = article;
  const { data, isSuccess, isFetching } = useArticlesInfinite(
    category?.name ? [category?.name] : undefined
  );

  const { userInfo, refreshUserInfo } = useUserInfoContext();
  const followCategory = useUpdateCategories({
    onSuccess: refreshUserInfo,
  });
  const isFollowed = userInfo?.categories.some((c) => c.id === category?.id);

  const onToggleFollow = () => {
    if (!category) return;

    if (!userInfo) {
      return router.push(`/login?from=${encodeURIComponent(slug)}`);
    }

    let newCategories = userInfo.categories.map((c) => c.id);

    if (isFollowed) {
      newCategories = newCategories.filter((c) => c !== category?.id);
    } else {
      newCategories.push(category.id);
    }

    followCategory.mutate({
      userId: userInfo.id,
      categories: newCategories,
    });
  };
  return (
    <VStack mt="40px" p="20px" spacing="10px" bg="#FAFAFA" borderRadius="4px">
      <HStack w="full" align="flex-start" justify="space-between" mb="10px">
        <Text maxW="50%">
          Xem thêm về{" "}
          <Text as="span" fontWeight="semibold">
            {category?.name}
          </Text>
        </Text>
        <Button
          variant={isFollowed ? "outline" : "solid"}
          size="sm"
          colorScheme="teal"
          isLoading={followCategory.isLoading}
          onClick={onToggleFollow}
        >
          {isFollowed ? "Bỏ theo dõi" : "Theo dõi"}
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

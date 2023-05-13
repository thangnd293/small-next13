"use client";

import CommentSection from "@/app/(app)/[articleSlug]/CommentSection";
import { useUserInfoContext } from "@/context/UserContext";
import { Article } from "@/types/common";
import { Image, Link } from "@chakra-ui/next-js";
import { Avatar, Badge, HStack, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import ViewArticleContent from "./ViewArticle/ViewArticleContent";
import {
  getAllUserLikeArticleKey,
  useAllUserLikeArticle,
  useLikeArticle,
} from "@/services/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

interface Props {
  article: Article;
  hasLiked?: boolean;
}
export default function ViewArticle({ article, hasLiked = false }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userInfo } = useUserInfoContext();
  const { mainImage, title, brief, updatedAt, description, keyword, slug } =
    article;
  const keywords = keyword?.split(",") || [];

  const { allUserLike } = useAllUserLikeArticle(article.id);
  const [isLiked, setIsLiked] = useState(hasLiked);
  const isLikedDebounced = useDebounce(isLiked, 200);

  const likeCount =
    hasLiked !== isLiked ? allUserLike.length : allUserLike.length - 1;

  const likeArticle = useLikeArticle({
    onSuccess: () => {
      queryClient.invalidateQueries(getAllUserLikeArticleKey(article.id));
    },
  });

  const handleLikeArticle = () => {
    if (!userInfo) {
      return router.push(`/login?from=${encodeURIComponent(slug)}`);
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (!userInfo) return;

    likeArticle.mutate({ userId: userInfo?.id, articleId: article.id });
  }, [isLikedDebounced]);

  return (
    <>
      {mainImage && (
        <div className="w-full h-full relative aspect-[40/21]">
          <Image
            alt="Background image article"
            src={mainImage}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {title && (
        <Text
          mt="20px"
          mb="10px"
          as="h1"
          align="center"
          fontSize="xl"
          fontWeight="medium"
        >
          {title}
        </Text>
      )}
      {brief && (
        <Text as="h1" align="center" fontSize="lg" color="gray.500">
          {brief}
        </Text>
      )}
      <HStack my="20px" justify="center">
        <Avatar />
        <Text fontWeight="semibold">Nguyen Dac Thang</Text>
        <Text>· {updatedAt.toPrettyDate()}</Text>
      </HStack>
      {description && <ViewArticleContent content={description} />}
      <HStack spacing={8}>
        <HStack spacing={1}>
          <Tooltip label="Thích bài viết">
            <button
              aria-label={"Like article"}
              className="group"
              onClick={handleLikeArticle}
            >
              {!isLiked ? (
                <IoIosHeartEmpty
                  className="text-text-secondary group-hover:text-text-primary"
                  size={22}
                />
              ) : (
                <IoIosHeart
                  className="text-text-primary opacity-80"
                  size={22}
                />
              )}
            </button>
          </Tooltip>
          <Tooltip label="Lượt thích">
            <Text fontSize="13px" color="gray.500" cursor="pointer">
              {likeCount}
            </Text>
          </Tooltip>
        </HStack>
        <CommentSection articleId={article.id} slug={article.slug} />
      </HStack>
      {keywords.length > 0 && (
        <HStack
          borderY="1px solid"
          borderColor="gray.50"
          className="py-10 my-14"
        >
          {keywords.map((keyword) => (
            <Badge key={keyword} as={Link} href="/">
              {keyword}
            </Badge>
          ))}
        </HStack>
      )}
    </>
  );
}

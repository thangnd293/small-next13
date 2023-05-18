"use client";

import CommentSection from "@/app/(app)/[articleSlug]/CommentSection";
import { useGlobalContext } from "@/context/GlobalContext";
import { Article } from "@/types/common";
import { Image, Link } from "@chakra-ui/next-js";
import { Avatar, Badge, Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import {
  getAllUserLikeArticleKey,
  useAllUserLikeArticle,
  useLikeArticle,
} from "@/services/client";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import ViewArticleContent from "./ViewArticleContent";

interface Props {
  article: Article;
  hasLiked?: boolean;
}
export default function ViewArticle({ article, hasLiked = false }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userInfo } = useGlobalContext();
  const {
    mainImage,
    title,
    brief,
    updatedAt,
    description,
    keyword,
    slug,
    totalLike,
    id,
  } = article;
  const { allUserLike } = useAllUserLikeArticle(id);

  const keywords = keyword?.split(",") || [];

  const [isLiked, setIsLiked] = useState(hasLiked);
  const isLikedDebounced = useDebounce(isLiked, 200);

  let likeCount = totalLike;

  if (isLiked !== hasLiked) {
    likeCount = isLiked ? likeCount + 1 : likeCount - 1;
  }

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
          _dark={{
            color: "gray.300",
          }}
        >
          {title}
        </Text>
      )}
      {brief && (
        <Text
          as="h1"
          align="center"
          fontSize="lg"
          color="gray.500"
          _dark={{
            color: "gray.300",
          }}
        >
          {brief}
        </Text>
      )}
      <HStack
        my="20px"
        justify="center"
        _dark={{
          color: "gray.300",
        }}
      >
        <Avatar />
        <Text fontWeight="semibold">Nguyen Dac Thang</Text>
        <Text>· {updatedAt.toPrettyDate()}</Text>
      </HStack>
      {description && <ViewArticleContent content={description} />}
      <HStack spacing={8}>
        <HStack spacing={1}>
          <Tooltip label="Thích bài viết">
            <Button
              variant="unstyled"
              aria-label={"Like article"}
              className="group min-w-[unset]"
              onClick={handleLikeArticle}
              _dark={{
                color: "gray.400",
                _hover: {
                  color: "gray.300",
                },
              }}
            >
              {!isLiked ? (
                <IoIosHeartEmpty size={22} />
              ) : (
                <IoIosHeart size={22} />
              )}
            </Button>
          </Tooltip>
          <div className="relative">
            <Text
              fontSize="13px"
              color="gray.500"
              className={classNames({
                "peer cursor-pointer": allUserLike.length > 0,
              })}
            >
              {likeCount}
            </Text>
            <div className="absolute hidden w-40 p-3 peer-hover:flex bg-dark-visible rounded-xl">
              {allUserLike?.map((user) => (
                <Text key={user.id} noOfLines={1} color="white" fontSize="14px">
                  {user.name}
                </Text>
              ))}
            </div>
          </div>
        </HStack>
        <CommentSection articleId={article.id} slug={article.slug} />
      </HStack>
      {keywords.length > 0 && (
        <HStack
          borderY="1px solid"
          borderColor="gray.50"
          _dark={{
            borderColor: "gray.700",
          }}
          className="py-10 my-14"
        >
          {keywords.map((keyword) => (
            <Badge
              key={keyword}
              as={Link}
              href="/"
              _dark={{
                color: "gray.300",
                backgroundColor: "gray.700",
                _hover: {
                  bg: "gray.600",
                },
              }}
            >
              {keyword}
            </Badge>
          ))}
        </HStack>
      )}
    </>
  );
}

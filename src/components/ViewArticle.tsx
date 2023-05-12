"use client";

import CommentSection from "@/app/(app)/[articleSlug]/CommentSection";
import { Article } from "@/types/common";
import { Image, Link } from "@chakra-ui/next-js";
import { Avatar, Badge, HStack, Text } from "@chakra-ui/react";
import ViewArticleContent from "./ViewArticle/ViewArticleContent";

interface Props {
  article: Article;
}
export default function ViewArticle({ article }: Props) {
  const { mainImage, title, brief, updatedAt, description, keyword } = article;
  const keywords = keyword?.split(",") || [];

  return (
    <>
      {mainImage && (
        <div className="w-full h-full relative aspect-[40/21]">
          <Image
            alt="Background image article"
            src={mainImage}
            fill
            sizes="100vw"
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
      <CommentSection />
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

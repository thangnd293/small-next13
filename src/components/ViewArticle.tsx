"use client";

import React from "react";
import { Image } from "@chakra-ui/next-js";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import { Article } from "@/types/common";
import ViewArticleContent from "./ViewArticle/ViewArticleContent";

interface Props {
  article: Article;
}
export default function ViewArticle({ article }: Props) {
  const { mainImage, title, brief, updatedAt, description } = article;
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
    </>
  );
}

"use client";

import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Icons from "../Icons";

import { Image, Link } from "@chakra-ui/next-js";
import IconButton from "../IconButton";
import { ArticleSkeleton } from "./ArticleSkeleton";
import { Article as TArticle } from "@/types/common";

const MAX_KEYWORDS_SHOW = 3;
interface Props {
  article: TArticle;
}
export const Article = ({ article }: Props) => {
  const { user, category } = article;
  const keywords = article.keyword?.split(",") || [];

  const keywordsLeft = keywords.length - MAX_KEYWORDS_SHOW;

  return (
    <Box pb="20px" borderBottom="1px" borderColor="gray.50">
      <VStack align="flex-start" spacing="16px">
        <HStack>
          <HStack as={Link} href="/" spacing="10px">
            <Avatar size="xs" src={user.image || undefined} />
            <Text fontSize="xs">{user.name}</Text>
          </HStack>
          <Text fontSize="xs" ml="4px !important">
            <Text as="span" color="gray.500">
              đăng trong
            </Text>
            <Link href={`/search?category=${category?.name}`}>
              {" "}
              {category?.name}
            </Link>
            <Text as="span" color="gray.500" px="10px">
              ·
            </Text>
            {article.updatedAt.toDateString()}
          </Text>
        </HStack>
        <HStack
          as={Link}
          href={`/${article.slug}`}
          align="flex-start"
          spacing="64px"
          w="full"
        >
          <Box flex={1}>
            <Heading fontSize="lg">{article.title}</Heading>
            <Text mt="16px" noOfLines={3}>
              {article.shortDescription}
            </Text>
          </Box>
          <Image
            className="object-cover"
            width={120}
            height={120}
            src={article.thumbnail || article.mainImage}
            alt={"thumbnail"}
          />
        </HStack>
      </VStack>
      <HStack mt="22px" align="center" justify="space-between">
        <HStack>
          <IconButton aria-label="Bookmark">
            <Icons.Bookmark width="24px" height="24px" color="currentColor" />
          </IconButton>
          {keywords.slice(0, MAX_KEYWORDS_SHOW).map((keyword) => (
            <Badge key={keyword} as={Link} href={`/search?keyword=${keyword}`}>
              {keyword}
            </Badge>
          ))}
          {keywordsLeft > 0 && <Badge>{`+${keywordsLeft}`}</Badge>}
        </HStack>
        <HStack color="gray.500">
          <Icons.Heart width="24px" height="24px" color="currentColor" />
          <Text>{article.totalLike}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

Article.Skeleton = ArticleSkeleton;

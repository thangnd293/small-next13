import { useArticles, useCategories } from "@/services/client";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import SmallArticle from "../SmallArticle";

const RecommendSidebar = () => {
  const getCategories = useCategories();
  const getArticles = useArticles();

  return (
    <Box>
      <Box
        pb="30px"
        borderBottom="1px"
        borderColor="gray.50"
        _dark={{
          borderColor: "gray.700",
        }}
      >
        <Text
          _dark={{
            color: "gray.300",
          }}
        >
          Chủ đề nổi bật
        </Text>
        <HStack wrap={"wrap"} gap="10px" mt="14px">
          {getCategories.isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} w="94px" h="31px" borderRadius="full" />
              ))
            : getCategories.categories.map((category) => (
                <Badge
                  key={category.id}
                  as={Link}
                  href={`/search?category=${category.name}`}
                  variant="outline"
                  ml="0 !important"
                  _dark={{
                    color: "gray.300",
                    borderColor: "gray.300",
                    "&:hover": {
                      bg: "gray.700",
                    },
                  }}
                >
                  {category.name}
                </Badge>
              ))}
        </HStack>
      </Box>
      <Box
        py="30px"
        borderBottom="1px"
        borderColor="gray.50"
        _dark={{
          borderColor: "gray.700",
        }}
      >
        <Text
          _dark={{
            color: "gray.300",
          }}
        >
          Bài viết nổi bật
        </Text>
        <VStack wrap={"wrap"} spacing="10px" mt="14px">
          {getArticles.isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <HStack key={index} spacing="10px" w="full">
                  <Skeleton w="40px" h="40px" />
                  <VStack w="full" align="start">
                    <Skeleton w="200px" h="14px" />
                    <Skeleton w="full" h="14px" />
                  </VStack>
                </HStack>
              ))
            : getArticles.articles
                .slice(0, 3)
                .map((article) => (
                  <SmallArticle key={article.id} {...article} />
                ))}
        </VStack>
        <Button colorScheme="teal" variant="link" mt="14px">
          Xem thêm
        </Button>
      </Box>
    </Box>
  );
};

export default RecommendSidebar;

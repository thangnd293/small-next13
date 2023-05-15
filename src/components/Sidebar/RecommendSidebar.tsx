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

const RecommendSidebar = () => {
  const getCategories = useCategories();
  const getArticles = useArticles();

  return (
    <Box>
      <Box pb="30px" borderBottom="1px" borderColor="gray.50">
        <Text>Chủ đề nổi bật</Text>
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
                >
                  {category.name}
                </Badge>
              ))}
        </HStack>
      </Box>
      <Box py="30px" borderBottom="1px" borderColor="gray.50">
        <Text>Bài viết nổi bật</Text>
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
            : getArticles.articles.slice(0, 3).map((article) => (
                <HStack
                  key={article.id}
                  as={Link}
                  href={article.slug}
                  spacing="10px"
                  width="full"
                >
                  <Image
                    className="object-cover object-center"
                    width={10}
                    height={10}
                    src={article.thumbnail || article.mainImage}
                    alt={"Thumbnail"}
                  />
                  <Flex
                    flexDirection="column"
                    align="flex-start"
                    justify="space-between"
                  >
                    <Text fontSize="14px" noOfLines={1}>
                      {article.title}
                    </Text>
                    <Text fontSize="14px" color="gray.500" noOfLines={1}>
                      {article.shortDescription}
                    </Text>
                  </Flex>
                </HStack>
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

import { useArticles, useCategories } from "@/services/client";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Flex,
  HStack,
  Badge,
  VStack,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

const RecommendSidebar = () => {
  const { categories } = useCategories();
  const { articles } = useArticles();

  return (
    <Box>
      <Box pb="30px" borderBottom="1px" borderColor="gray.50">
        <Text>Chủ đề nổi bật</Text>
        <HStack wrap={"wrap"} gap="10px" mt="14px">
          {categories.map((category) => (
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
          {articles.slice(0, 3).map((article) => (
            <HStack
              key={article.id}
              as={Link}
              href={article.slug}
              spacing="10px"
            >
              <Image
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
                <Text>{article.title}</Text>
                <Text color="gray.500" noOfLines={1}>
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

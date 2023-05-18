import { useGlobalContext } from "@/context/GlobalContext";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import SmallArticle from "../SmallArticle";
import EditProfile from "./EditProfile";
import { Link } from "@chakra-ui/next-js";
import EditCategoriesFollowing from "./EditCategoriesFollowing";

const MAX_ARTICLES_SHOW = 3;
const InfoSidebar = () => {
  const { userInfo, articlesBookmarked } = useGlobalContext();
  const articles = articlesBookmarked.slice(0, MAX_ARTICLES_SHOW);
  const articlesLeft = articlesBookmarked.length - MAX_ARTICLES_SHOW;

  return (
    <>
      <VStack align="flex-start" spacing="16px">
        <Avatar size="lg" src={userInfo?.image || ""} />
        <Box>
          {userInfo ? (
            <>
              <Text
                fontSize="md"
                color="gray.900"
                _dark={{
                  color: "gray.300",
                }}
              >
                {userInfo.name}
              </Text>
              <Text
                fontSize="md"
                color="gray.500"
                _dark={{
                  color: "gray.400",
                }}
              >
                1.1k người theo dõi
              </Text>
            </>
          ) : (
            <SkeletonText
              w="160px"
              mt="4"
              noOfLines={2}
              spacing="4"
              skeletonHeight="16px"
            />
          )}
        </Box>
        {userInfo ? (
          <Text
            _dark={{
              color: "gray.300",
            }}
          >
            {userInfo.bio}
          </Text>
        ) : (
          <SkeletonText
            w="full"
            mt="4"
            noOfLines={2}
            spacing="2"
            skeletonHeight="16px"
          />
        )}

        <EditProfile />
      </VStack>
      {articlesLeft > 0 && (
        <Box mt="40px">
          <Text
            fontSize="md"
            color="gray.900"
            _dark={{
              color: "gray.300",
            }}
          >
            Lưu trữ
          </Text>
          <VStack align="flex-start" mt="16px">
            {articles.map((article) => (
              <SmallArticle key={article.id} {...article} />
            ))}

            <Button
              colorScheme="teal"
              variant="link"
              mt="16px"
              as={Link}
              href="/profile/library"
            >
              Xem tất cả
            </Button>
          </VStack>
        </Box>
      )}
      <Divider my="20px" />
      <Box>
        <Text
          fontWeight="semibold"
          _dark={{
            color: "gray.300",
          }}
        >
          Chủ đề đang theo dõi
        </Text>
        <HStack spacing={0} gap="4px" mt="10px" wrap="wrap">
          {userInfo
            ? userInfo.categories.map((category) => (
                <Badge
                  key={category.id}
                  as={Link}
                  href={`/search?category=${category?.name}`}
                  _dark={{
                    color: "gray.300",
                    backgroundColor: "gray.700",
                    _hover: {
                      bg: "gray.600",
                    },
                  }}
                >
                  {category.name}
                </Badge>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} w="88px" h="31px" borderRadius="full" />
              ))}
        </HStack>
        <EditCategoriesFollowing />
      </Box>
    </>
  );
};

export default InfoSidebar;

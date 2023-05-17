import { useGlobalContext } from "@/context/GlobalContext";
import { Avatar, Box, Button, Text, VStack } from "@chakra-ui/react";
import SmallArticle from "../SmallArticle";
import EditProfile from "./EditProfile";
import { Link } from "@chakra-ui/next-js";

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
          <Text
            fontSize="md"
            color="gray.900"
            _dark={{
              color: "gray.300",
            }}
          >
            {userInfo?.name}
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
        </Box>
        <Text
          _dark={{
            color: "gray.300",
          }}
        >
          {userInfo?.bio}
        </Text>

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
    </>
  );
};

export default InfoSidebar;

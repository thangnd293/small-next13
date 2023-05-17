import { useUser } from "@/services/client";
import { Avatar, Box, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const AuthorInfoSidebar = () => {
  const pathname = usePathname();
  const username = pathname?.split("/")[2];
  const { user, isLoading, isSuccess } = useUser(username || "");
  if (isSuccess && !user) return null;

  return (
    <>
      <VStack align="flex-start" spacing="16px">
        <Avatar size="lg" src={user?.image || ""} />
        {isLoading ? (
          <Box>
            <SkeletonText noOfLines={1} skeletonHeight="16px" w="160px" />
            <SkeletonText
              mt={1}
              w="100px"
              noOfLines={1}
              skeletonHeight="16px"
            />
          </Box>
        ) : (
          <Box>
            <Text
              fontSize="md"
              color="gray.900"
              _dark={{
                color: "gray.300",
              }}
            >
              {user?.name}
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
        )}

        {isLoading ? (
          <SkeletonText noOfLines={3} skeletonHeight="16px " w="full" />
        ) : (
          <Text
            _dark={{
              color: "gray.300",
            }}
          >
            {user?.bio}
          </Text>
        )}
      </VStack>
    </>
  );
};

export default AuthorInfoSidebar;

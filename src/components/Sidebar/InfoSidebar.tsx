import { useUserInfoContext } from "@/context/UserContext";
import { Avatar, Box, Button, Text, VStack } from "@chakra-ui/react";
import SmallCollection from "../SmallCollection";
import EditProfile from "./EditProfile";

const InfoSidebar = () => {
  const { userInfo } = useUserInfoContext();
  return (
    <>
      <VStack align="flex-start" spacing="16px">
        <Avatar size="lg" src={userInfo?.image || ""} />
        <Box>
          <Text fontSize="md" color="gray.900">
            {userInfo?.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            1.1k người theo dõi
          </Text>
        </Box>
        <Text>{userInfo?.bio}</Text>

        <EditProfile />
      </VStack>
      <Box mt="40px">
        <Text fontSize="md" color="gray.900">
          Danh sách lưu trữ
        </Text>
        <VStack align="flex-start" mt="16px">
          {Array.from({ length: 3 }).map((_, index) => (
            <SmallCollection key={index} />
          ))}
          <Button colorScheme="teal" variant="link" mt="16px">
            Xem tất cả
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default InfoSidebar;

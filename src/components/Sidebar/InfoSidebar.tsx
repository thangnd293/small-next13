import { Avatar, VStack, Box, Text, Button } from "@chakra-ui/react";
import SmallCollection from "../SmallCollection";
import EditProfile from "./EditProfile";

const InfoSidebar = () => {
  return (
    <>
      <VStack align="flex-start" spacing="16px">
        <Avatar size="lg" />
        <Box>
          <Text fontSize="md" color="gray.900">
            Nguyễn Đắc Thắng
          </Text>
          <Text fontSize="md" color="gray.500">
            1.1k người theo dõi
          </Text>
        </Box>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>

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

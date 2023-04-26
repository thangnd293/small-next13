import { HStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const SmallCollection = () => {
  return (
    <HStack>
      <Image
        width={60}
        height={60}
        src="/images/thumbnail.png"
        alt="Thumbnail"
      />
      <Box>
        <Text fontSize="md" color="gray.900">
          Nào rảnh đọc
        </Text>
        <Text fontSize="md" color="gray.500">
          3 lữ trữ
        </Text>
      </Box>
    </HStack>
  );
};

export default SmallCollection;

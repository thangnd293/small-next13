import {
  Flex,
  HStack,
  Badge,
  VStack,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link, Image } from "@chakra-ui/next-js";
import { useLayoutContext } from "../app/(app)/context";

const Sidebar = () => {
  const { headerRef, isScrollUp } = useLayoutContext();
  const header = headerRef.current as HTMLElement;

  return (
    <Flex
      as="aside"
      display={{
        base: "none",
        lg: "flex",
      }}
      flexDir="column"
      w="450px"
      h="fit-content"
      p="40px 24px 0px 40px"
      position="sticky"
      top={isScrollUp ? "0" : header?.offsetHeight}
      transition="top 0.2s ease-in-out"
    >
      <Box>
        <Box pb="30px" borderBottom="1px" borderColor="gray.50">
          <Text>Chủ đề nổi bật</Text>
          <HStack wrap={"wrap"} gap="10px" mt="14px">
            {Array.from({ length: 10 }).map((_, index) => (
              <Badge key={index} variant="outline" ml="0 !important">
                Category
              </Badge>
            ))}
          </HStack>
        </Box>
        <Box py="30px" borderBottom="1px" borderColor="gray.50">
          <Text>Bài viết nổi bật</Text>
          <VStack wrap={"wrap"} spacing="10px" mt="14px">
            {Array.from({ length: 3 }).map((_, index) => (
              <HStack key={index} spacing="10px">
                <Image
                  width={10}
                  height={10}
                  src={"/images/thumbnail-small.png"}
                  alt={"Thumbnail"}
                />
                <Flex
                  flexDirection="column"
                  align="flex-start"
                  justify="space-between"
                >
                  <Text>Ngưng sử dụng useMemo!</Text>
                  <Text color="gray.500" noOfLines={1}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, ...
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

      <HStack as="footer" spacing="10px" mt="auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Text key={index} as={Link} href="/" color="gray.500" py="24px">
            © 2023
          </Text>
        ))}
      </HStack>
    </Flex>
  );
};

export default Sidebar;

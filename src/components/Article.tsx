"use client";

import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import Icons from "./Icons";

import { Image, Link } from "@chakra-ui/next-js";
import IconButton from "./IconButton";

const Article = () => {
  return (
    <Box pb="20px" borderBottom="1px" borderColor="gray.50">
      <VStack align="flex-start" spacing="16px">
        <HStack>
          <HStack as={Link} href="/" spacing="10px">
            <Avatar size="xs" />
            <Text fontSize="xs">Nguyễn Đắc Thắng</Text>
          </HStack>
          <Text fontSize="xs" ml="4px !important">
            <Text as="span" color="gray.500">
              đăng trong
            </Text>
            <Link href="/"> Kiến thức React</Link>
            <Text as="span" color="gray.500" px="10px">
              ·
            </Text>
            1 ngày trước
          </Text>
        </HStack>
        <HStack as={Link} href="/" align="flex-start" spacing="64px">
          <Box>
            <Heading fontSize="lg">Ngưng sử dụng useMemo!</Heading>
            <Text mt="16px">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using &apos;Content here,
              ...
            </Text>
          </Box>
          <Image
            width={120}
            height={120}
            src={"/images/thumbnail.png"}
            alt={"thumbnail"}
          />
        </HStack>
      </VStack>
      <HStack mt="22px" align="center" justify="space-between">
        <HStack>
          <IconButton aria-label="Bookmark">
            <Icons.Bookmark width="24px" height="24px" color="currentColor" />
          </IconButton>
          <Badge as={Link} href="/">
            Category
          </Badge>
          <Badge as={Link} href="/">
            Category
          </Badge>
        </HStack>
        <HStack color="gray.500">
          <Icons.Heart width="24px" height="24px" color="currentColor" />
          <Text>1</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Article;

"use client";

import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
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
        <HStack as={Link} href="/" align="flex-start" spacing="64px" w="full">
          <Box flex={1}>
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

Article.Skeleton = () => {
  return (
    <Box pb="20px" borderBottom="1px" borderColor="gray.50">
      <VStack align="flex-start" spacing="16px">
        <HStack spacing="10px" className="w-full">
          <SkeletonCircle size="24px" />
          <SkeletonText noOfLines={1} skeletonHeight="13px" w={60} />
          <SkeletonCircle size="2px" />
          <SkeletonText noOfLines={1} skeletonHeight="13px" w={20} />
        </HStack>
        <HStack as={Link} href="/" align="flex-start" spacing="64px" w="full">
          <Box flex={1}>
            <SkeletonText
              noOfLines={1}
              endColor="gray.600"
              skeletonHeight="22px"
              w={60}
            />

            <SkeletonText
              mt="16px"
              noOfLines={4}
              spacing="3"
              skeletonHeight="16px"
            />
          </Box>
          <Skeleton width="120px" height="120px" />
        </HStack>
      </VStack>
      <HStack mt="22px" align="center" justify="space-between">
        <HStack>
          <Skeleton width="24px" height="24px" />
          <Skeleton width="84px" height="32px" rounded="full" />
        </HStack>
        <Skeleton width="40px" height="24px" />
      </HStack>
    </Box>
  );
};

export default Article;

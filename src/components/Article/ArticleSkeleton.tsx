import {
  Box,
  HStack,
  Link,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export const ArticleSkeleton = () => {
  return (
    <Box
      pb="20px"
      borderBottom="1px"
      borderColor="gray.50"
      _dark={{
        borderColor: "gray.700",
      }}
    >
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

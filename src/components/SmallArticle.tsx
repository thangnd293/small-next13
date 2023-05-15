import { Article } from "@/types/common";
import { Link } from "@chakra-ui/next-js";
import { HStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface Props
  extends Pick<Article, "thumbnail" | "title" | "shortDescription" | "slug"> {}
const SmallArticle = ({ thumbnail, title, shortDescription, slug }: Props) => {
  return (
    <HStack as={Link} href={`/${slug}`}>
      <Image width={60} height={60} src={thumbnail} alt="Thumbnail" />
      <Box>
        <Text fontSize="md" color="gray.900" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="md" color="gray.500" noOfLines={1}>
          {shortDescription}
        </Text>
      </Box>
    </HStack>
  );
};

export default SmallArticle;

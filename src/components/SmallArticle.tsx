import { Article } from "@/types/common";
import { Link } from "@chakra-ui/next-js";
import { HStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface Props
  extends Pick<Article, "thumbnail" | "title" | "shortDescription" | "slug"> {}
const SmallArticle = ({ thumbnail, title, shortDescription, slug }: Props) => {
  return (
    <HStack as={Link} href={`/${encodeURIComponent(slug)}`}>
      <Image
        width={40}
        height={40}
        src={thumbnail}
        alt="Thumbnail"
        quality={100}
        className="object-cover object-center aspect-square"
      />
      <Box>
        <Text
          fontSize="md"
          color="gray.900"
          noOfLines={1}
          _dark={{
            color: "gray.300",
          }}
        >
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

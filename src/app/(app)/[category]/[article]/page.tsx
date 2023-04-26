"use client";

import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

import ViewArticle from "@/components/ViewArticle/ViewArticle";
import Article from "@/components/Article";

export default function ArticlePage({
  params,
}: {
  params: { article: string };
}) {
  const { article } = params;
  const { title, subtitle, backgroundImage, content } = data;
  return (
    <div>
      <div className="w-full h-full relative aspect-[40/21]">
        <Image
          alt="Background image article"
          src={backgroundImage}
          fill
          sizes="100vw"
        />
      </div>
      <Text
        mt="20px"
        mb="10px"
        as="h1"
        align="center"
        fontSize="xl"
        fontWeight="medium"
      >
        {title}
      </Text>
      <Text as="h1" align="center" fontSize="lg" color="gray.500">
        {subtitle}
      </Text>
      <HStack my="20px" justify="center">
        <Avatar />
        <Text fontWeight="semibold">Nguyen Dac Thang</Text>
        <Text>· Apr 18, 2023</Text>
      </HStack>
      <ViewArticle content={content} />
      <HStack justify="space-between">
        <HStack spacing="12px">
          <Avatar size="lg" />
          <VStack align="start">
            <Text fontSize="12px" color="gray.500">
              ĐĂNG BỞI
            </Text>
            <Text>Nguyễn Đắc Thắng</Text>
          </VStack>
        </HStack>
        <Button colorScheme="teal">Theo dõi</Button>
      </HStack>
      <Text pl="76px" fontSize="14px" color="gray.500">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
        reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
        "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their
        exact original form, accompanied by English versions from the 1914
        translation by H. Rackham.
      </Text>
      <VStack mt="40px" p="20px" spacing="10px" bg="#FAFAFA" borderRadius="4px">
        <HStack align="flex-start" justify="space-between" mb="10px">
          <Box maxW="50%">
            <Text>
              Xem thêm về{" "}
              <Text as="span" fontWeight="semibold">
                Kiến thức React
              </Text>
            </Text>
            <Text fontSize="14px" color="gray.500" noOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Button size="sm" colorScheme="teal">
            Theo dõi
          </Button>
        </HStack>
        {Array.from({ length: 4 }).map((_, index) => (
          <Article key={index} />
        ))}
      </VStack>
    </div>
  );
}

const data = {
  title: "How to use Chakra UI with Next.js",
  subtitle: "A step-by-step guide to using Chakra UI with Next.js",
  backgroundImage:
    "https://res.cloudinary.com/db3kcbsru/image/upload/v1682253692/qwht9ju9llpz40kiu1y1.jpg",
  content: `<p>test</p><h1>hehe</h1><h2>asasd/</h2><code-block language="javascript"><pre><code>const test = 'test';</code></pre></code-block><p></p><ul><li><p>1</p></li><li><p>2</p></li><li><p>3</p></li></ul><p><a target="_blank" rel="noopener noreferrer nofollow" href="test">Link</a></p><image-component src="https://res.cloudinary.com/db3kcbsru/image/upload/v1682254938/zl7rbrrsun9wpmcljscj.jpg" isopentoolbar="true" toolbar="upload" align="center"></image-component><p>title</p>`,
};

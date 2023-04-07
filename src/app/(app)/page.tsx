"use client";

import Article from "@/components/Article";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <VStack align="flex-start" spacing="20px" mb="60px">
        <Heading fontSize="4xl">Chưa là thành viên?</Heading>
        <Text fontSize="lg" maxW="570px">
          Trở thành thành viên để khám phá đầy đủ các tính năng của chúng tôi
        </Text>
        <Button colorScheme="teal">Đăng ký ngay</Button>
      </VStack>

      <VStack spacing="32px">
        {Array.from({ length: 10 }).map((_, index) => (
          <Article key={index} />
        ))}
      </VStack>
    </>
  );
}

"use client";

import Link from "next/link";
import { Button, VStack, Heading, Text } from "@chakra-ui/react";

interface Props {
  isAuth?: boolean;
}
export default function RecommendUserRegister({ isAuth }: Props) {
  if (isAuth) return null;

  return (
    <VStack align="flex-start" spacing="20px" mb="60px">
      <Heading
        fontSize="3xl"
        _dark={{
          color: "gray.300",
        }}
      >
        Chưa là thành viên?
      </Heading>
      <Text
        fontSize="medium"
        maxW="570px"
        _dark={{
          color: "gray.300",
        }}
      >
        Trở thành thành viên để khám phá đầy đủ các tính năng của chúng tôi
      </Text>
      <Link href="/sign-up">
        <Button colorScheme="teal">Đăng ký ngay</Button>
      </Link>
    </VStack>
  );
}

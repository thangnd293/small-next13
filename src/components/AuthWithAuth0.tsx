"use client";

import { Button } from "@chakra-ui/button";
import { Divider, HStack, Text } from "@chakra-ui/layout";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";

interface Props {
  isSignUp?: boolean;
}
export default function AuthWithAuth0({ isSignUp }: Props) {
  const searchParams = useSearchParams();
  const method = isSignUp ? "Đăng ký" : "Đăng nhập";
  return (
    <>
      <HStack w="full" py="30px">
        <Divider />
        <Text color="gray.500">Hoặc</Text>
        <Divider />
      </HStack>

      <Button
        w="full"
        borderColor="gray.700"
        borderRadius="full"
        variant="outline"
        leftIcon={<AiFillGithub />}
        fontWeight="normal"
        onClick={() =>
          signIn("github", {
            redirect: true,
            callbackUrl: searchParams?.get("from") || "/",
          })
        }
      >
        {method} với Github
      </Button>
    </>
  );
}

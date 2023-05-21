"use client";
import { User } from "@/types/common";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  user: User;
}
export default function AuthorSection({ user }: Props) {
  const { name, bio, image } = user;
  return (
    <>
      <HStack justify="space-between">
        <HStack spacing="12px">
          <Avatar size="lg" src={image || undefined} />
          <VStack align="start">
            <Text
              fontSize="12px"
              color="gray.500"
              _dark={{
                color: "gray.400",
              }}
            >
              ĐĂNG BỞI
            </Text>
            <Text
              as={Link}
              href={`/user/${user.username}`}
              _dark={{
                color: "gray.300",
              }}
            >
              {name}
            </Text>
          </VStack>
        </HStack>
        <Button colorScheme="teal">Theo dõi</Button>
      </HStack>
      {bio && (
        <Text
          pl="76px"
          fontSize="14px"
          color="gray.500"
          _dark={{
            color: "gray.400",
          }}
        >
          {bio}
        </Text>
      )}
    </>
  );
}

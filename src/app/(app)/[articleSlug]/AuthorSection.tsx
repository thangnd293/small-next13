"use client";
import { User } from "@/types/common";
import { HStack, Avatar, VStack, Button, Box, Text } from "@chakra-ui/react";
import React from "react";

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
            <Text fontSize="12px" color="gray.500">
              ĐĂNG BỞI
            </Text>
            <Text>{name}</Text>
          </VStack>
        </HStack>
        <Button colorScheme="teal">Theo dõi</Button>
      </HStack>
      {bio && (
        <Text pl="76px" fontSize="14px" color="gray.500">
          {bio}
        </Text>
      )}
    </>
  );
}

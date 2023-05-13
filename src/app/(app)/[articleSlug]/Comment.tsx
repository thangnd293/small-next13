"use client";

import { Comment as TComment } from "@/types/common";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props extends TComment {}
export default function Comment({
  name,
  image,
  description,
  createdAt,
}: Props) {
  return (
    <Box py={6} borderBottom="1px solid" borderColor="gray.50">
      <HStack>
        <Avatar size="sm" src={image || undefined} />
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="14px">{name}</Text>
          <Text fontSize="14px" color="gray.500">
            {createdAt}
          </Text>
        </VStack>
      </HStack>
      <Text mt="10px">{description}</Text>
    </Box>
  );
}

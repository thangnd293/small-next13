"use client";

import { User } from "@/types/common";
import { Text } from "@chakra-ui/react";
import React from "react";

interface Props extends User {}
export default function AboutUser({ bio }: Props) {
  return (
    <>
      <Text py="40px" borderBottom="1px solid" borderColor="gray.50">
        {bio}
      </Text>
      <Text mt="10px" fontSize="14px">
        3 người theo dõi · Đang theo dõi 4
      </Text>
    </>
  );
}

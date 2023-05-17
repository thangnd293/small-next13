"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { Skeleton, Text } from "@chakra-ui/react";

export default function Title() {
  const { userInfo } = useGlobalContext();

  return !userInfo ? (
    <Skeleton h="36px" />
  ) : (
    <Text
      fontSize="36px"
      _dark={{
        color: "gray.300",
      }}
    >
      {userInfo.name}
    </Text>
  );
}

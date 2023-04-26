"use client";

import { useUserInfoContext } from "@/context/UserContext";
import { Skeleton, Text } from "@chakra-ui/react";

export default function Title() {
  const { userInfo } = useUserInfoContext();

  return !userInfo ? (
    <Skeleton h="36px" />
  ) : (
    <Text fontSize="36px">{userInfo.name}</Text>
  );
}

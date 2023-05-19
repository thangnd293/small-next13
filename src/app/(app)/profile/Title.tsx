"use client";

import { Text } from "@chakra-ui/react";

interface Props {
  fullname: string;
}
export default function Title({ fullname }: Props) {
  return (
    <Text
      fontSize="36px"
      _dark={{
        color: "gray.300",
      }}
    >
      {fullname}
    </Text>
  );
}

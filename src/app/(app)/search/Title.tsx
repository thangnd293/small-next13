"use client";

import React from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  keyword: string;
}
export default function Title({ keyword }: Props) {
  return (
    <Text
      fontSize="xl"
      color="gray.500"
      pb="40px"
      borderBottom="1px solid"
      borderColor="gray.50"
      _dark={{
        color: "gray.400",
        borderColor: "gray.700",
      }}
    >
      Kết quả tìm kiếm cho:{" "}
      <Text
        as="span"
        color="gray.900"
        _dark={{
          color: "gray.100",
        }}
      >
        {keyword}
      </Text>
    </Text>
  );
}

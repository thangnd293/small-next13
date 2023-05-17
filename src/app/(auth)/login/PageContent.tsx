"use client";

import AuthWithAuth0 from "@/components/AuthWithAuth0";
import LoginForm from "@/components/LoginForm";
import { Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function PageContent() {
  return (
    <>
      <Heading as="h2" fontSize="24px" color="teal.500">
        Chào mừng trở lại
      </Heading>
      <Text
        color="gray.500"
        _dark={{
          color: "gray.400",
        }}
      >
        Nhập thông tin để truy cập vào Small của bạn
      </Text>
      <LoginForm />
      <AuthWithAuth0 />
    </>
  );
}

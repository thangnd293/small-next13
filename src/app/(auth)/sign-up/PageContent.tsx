"use client";

import AuthWithAuth0 from "@/components/AuthWithAuth0";
import SignUpForm from "@/components/SignUpForm";
import { Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function PageContent() {
  return (
    <>
      <Heading as="h2" fontSize="24px" color="teal.500">
        Tạo tài khoản
      </Heading>
      <Text
        color="gray.500"
        _dark={{
          color: "gray.400",
        }}
      >
        Nhập thông tin để tạo Small của bạn
      </Text>
      <SignUpForm />
      <AuthWithAuth0 isSignUp />
    </>
  );
}

"use client";

import { Box } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      className="flex items-center justify-center w-full min-h-screen py-10"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
    >
      {children}
    </Box>
  );
}

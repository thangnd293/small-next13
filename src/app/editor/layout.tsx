"use client";

import { Container, Flex } from "@chakra-ui/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <Container
        as={Flex}
        w="100%"
        minH="100vh"
        px="0"
        maxW={{
          base: "100%",
          "2xl": "1328px",
        }}
        justify="space-between"
      >
        {children}
      </Container>
  );
}

"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Box, Container, Flex } from "@chakra-ui/react";
import { LayoutProvider } from "./context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <Header />
      <Container
        as={Flex}
        w="100%"
        minH="calc(100vh - 73px)"
        px="24px"
        maxW={{
          base: "100%",
          "2xl": "1328px",
        }}
        justify="space-between"
      >
        <Box flex="1" pt="40px" borderRight="1px" borderColor="gray.50">
          <Box
            as="main"
            maxW="745px"
            mx={{
              base: "auto",
              "2xl": "0",
            }}
          >
            {children}
          </Box>
        </Box>
        <Sidebar />
      </Container>
    </LayoutProvider>
  );
}

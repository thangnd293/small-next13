"use client";

import { Box, Container, Flex } from "@chakra-ui/react";

interface IProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout = ({ sidebar, children }: IProps) => {
  return (
    <Container
      as={Flex}
      w="100%"
      px="24px"
      maxW={{
        base: "100%",
        "2xl": "1328px",
      }}
    >
      <Box as="main" flex="1" w="100%" maxW="745px">
        {children}
      </Box>
      <Box
        as="aside"
        display={{
          base: "none",
          lg: "block",
        }}
        w="450px"
      >
        {sidebar}
      </Box>
    </Container>
  );
};

export default MainLayout;

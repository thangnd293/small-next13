"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <SessionProvider>{children}</SessionProvider>
      </ChakraProvider>
      <ToastContainer />
    </CacheProvider>
  );
}

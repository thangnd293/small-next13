"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserInfoContextProvider } from "@/context/UserContext";
import "../lib/axios";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <SessionProvider>
            <UserInfoContextProvider>{children}</UserInfoContextProvider>
          </SessionProvider>
        </ChakraProvider>
        <ToastContainer />
      </CacheProvider>
    </QueryClientProvider>
  );
}

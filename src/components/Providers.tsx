"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalContextProvider } from "@/context/GlobalContext";
import "../lib/axios";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider theme={theme}>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </ChakraProvider>
          <ToastContainer />
        </CacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

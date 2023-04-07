import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const text = defineStyle({
  bg: "transparent",
  color: "gray.500",
  p: 0,
  _hover: {
    color: "gray.900",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { text },
});

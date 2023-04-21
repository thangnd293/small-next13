import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const text = defineStyle({
  bg: "transparent",
  color: "gray.500",
  p: "0 10px",
  borderRadius: "999px",
  _hover: {
    color: "gray.900",
    bg: "gray.100",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { text },
});

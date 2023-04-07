import { defineStyleConfig } from "@chakra-ui/react";

export const badgeTheme = defineStyleConfig({
  baseStyle: {
    textTransform: "unset",
    fontWeight: "normal",
    borderRadius: "999px",
    color: "gray.900",
    padding: "6px 16px",
  },
  variants: {
    subtle: {
      bg: "gray.50",
      _hover: {
        bg: "gray.300",
      },
    },
    outline: {
      color: "gray.900",

      _hover: {
        bg: "gray.50",
      },
    },
  },
});

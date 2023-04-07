import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    border: "none",
  },
  button: {
    p: 0,
    textTransform: "uppercase",
    fontWeight: "semibold",
    fontSize: "md",
    color: "gray.500",
    _hover: {
      bg: "transparent",
      ".chakra-accordion__icon": {
        bg: "gray.200",
      },
    },
  },
  panel: {
    px: 0,
  },
  icon: {
    borderRadius: "4px",
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });

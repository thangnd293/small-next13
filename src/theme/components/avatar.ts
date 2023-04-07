import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

const xs = defineStyle({
  width: 24,
  height: 24,
  fontSize: "xs",
});

const sm = defineStyle({
  width: 32,
  height: 32,
  fontSize: "sm",
});

const md = defineStyle({
  width: 40,
  height: 40,
  fontSize: "md",
});

const lg = defineStyle({
  width: 48,
  height: 48,
  fontSize: "lg",
});

const xl = defineStyle({
  width: 56,
  height: 56,
  fontSize: "xl",
});

const xxl = defineStyle({
  width: 88,
  height: 88,
  fontSize: "2xl",
});

const sizes = {
  xs: definePartsStyle({ container: xs }),
  sm: definePartsStyle({ container: sm }),
  md: definePartsStyle({ container: md }),
  lg: definePartsStyle({ container: lg }),
  xl: definePartsStyle({ container: xl }),
  xxl: definePartsStyle({ container: xxl }),
};

export const avatarTheme = defineMultiStyleConfig({ sizes });

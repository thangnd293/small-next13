import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tablist: {
    gap: "32px",
    "border-bottom": "1px solid #F1F5F9 !important",
  },
  tabpanel: {
    padding: 0,
    marginTop: "40px",
  },
  tab: {
    "&[role=tab]": {
      padding: "8px 0",
      borderBottomWidth: 1,
    },
    "&[aria-selected=false]": {
      color: "#757575",
    },
    "&[aria-selected=true]": {
      color: "#292929",
      borderColor: "currentColor",
    },
  },
});

export const tabsTheme = defineMultiStyleConfig({ baseStyle });

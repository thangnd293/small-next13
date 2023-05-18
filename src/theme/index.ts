import { extendTheme } from "@chakra-ui/react";
import components from "./components";
import { config } from "./config";
import foundations from "./foundations";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `Utopia, sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.900",
      },
      a: {
        _hover: {
          textDecoration: "none !important",
        },
      },
    },
  },
  config,
  ...foundations,
  components: { ...components },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
      color: "gray.900",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
      color: "gray.900",
    },
  },
});

export default theme;

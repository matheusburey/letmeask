import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#F8F8F8",
        color: "#29292E",
      },
    },
  },

  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors: {
    gray: {
      500: "#a8a8b3",
    },
    purple: {
      500: "#835afd"
    },
    red : {
      500: "#ea4335"
    }
  }
});

export default theme;

import { extendTheme } from "@chakra-ui/react";

import Button from "./Button";
import colors from "./colors";
import Input from "./Input";

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
  components: { Button, Input },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors,
});

export default theme;

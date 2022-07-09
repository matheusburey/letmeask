import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "normal",
    width: "100%",
    overflow: "hidden",
  },

  // The default size and variant values
  defaultProps: {
    size: "lg",
    colorScheme: "purple",
  },
};

export default Button;

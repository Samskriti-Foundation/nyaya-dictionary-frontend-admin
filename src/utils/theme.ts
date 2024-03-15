import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    300: "#e4ccab",
    400: "#de9c63",
    500: "#b54405",
    700: "#a46c54",
    900: "#852c04",
  }
};

const theme = extendTheme({ colors });

export default theme;
import { extendTheme } from "@chakra-ui/react"

const colors = {
  primary: {
    300: "#D35C3A",
    400: "#AD341C",
    500: "#8E2211",
    900: "#5F1200",
  },
  secondary: {
    300: "#EE8D47",
    400: "#DA6619",
    500: "#B74200",
    900: "#6C2D00",
  },
  tertiary: {
    300: "#F9C96C",
    400: "#F7B646",
    500: "#F7AD06",
    900: "#E69A00",
  },
  background: "#FFF7F1",
  foreground: "#FFFFFF",
}

const theme = extendTheme({ colors })

export default theme

import {
  Flex
} from "@chakra-ui/react";
import Login from "../components/Login/Login";

export default function LoginPage() {
  return (
    <Flex
      h = "100%"
      w = "100%"
      bg = "background"
      justifyContent = "center"
      alignItems = "center"
    >
      <Login />
    </Flex>
  )
}

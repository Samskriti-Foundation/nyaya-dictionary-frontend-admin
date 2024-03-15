import {
  Flex
} from "@chakra-ui/react";
import Login from "../components/Login/Login";

export default function LoginPage() {
  return (
    <Flex
      h = "100%"
      w = "100%"
      bg = "primary.300"
      justifyContent = "center"
      alignItems = "center"
    >
      <Login />
    </Flex>
  )
}

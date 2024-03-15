import {
    Card,
    Center,
    Icon,
    Heading,
    Divider,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text
} from "@chakra-ui/react";

import { FaBook } from "react-icons/fa";
import { PasswordField } from "./PasswordField";

export default function Login() {
  return (
    <Card maxW="md" p = "4" bg = "primary.400" color = "primary.900" boxShadow="lg">
      <Stack spacing = {4}>
        <Center>
          <Icon as={FaBook} h = "32px" w = "32px"/>
          <Heading fontSize = "24px" pl = "12px">Nyaya Dictionary</Heading>
        </Center>
        <Heading>Login to you account</Heading>
        <Divider orientation='horizontal' borderColor = "primary.900"/>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email" color = "primary.900">Email</FormLabel>
            <Input
              id="email"
              type="email"
              borderColor = "primary.900"
            />
          </FormControl>
          <PasswordField />
        </Stack>
        <Button bg = "primary.500" color= "primary.300">Login</Button>
      </Stack>
    </Card>
  )
}

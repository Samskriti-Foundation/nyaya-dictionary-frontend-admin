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
} from "@chakra-ui/react"

import { FaBook } from "react-icons/fa"
import { PasswordField } from "./PasswordField"
import { BaseSyntheticEvent } from "react"
import { useContext, useState } from "react"
import useErrorToast from "../../hooks/useErrorToast"
import AuthContext, { AuthContextValue } from "../../context/AuthContext"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const errorToast = useErrorToast()

  const { login } = useContext<AuthContextValue>(AuthContext)

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      errorToast(Error("Please fill in all fields"), "top")
      setIsLoading(false)
      return
    }

    login({ email, password, setIsLoading })
  }

  return (
    <Card maxW="md" p={8} bg="foreground" boxShadow="lg">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={4}>
          <Center color="primary.400">
            <Icon as={FaBook} h="32px" w="32px" />
            <Heading fontSize="24px" pl="12px">
              Nyaya Dictionary - Admin
            </Heading>
          </Center>
          <Heading>Login to you account</Heading>
          <Divider orientation="horizontal" borderColor="primary.400" />
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                borderColor="primary.400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                _focus={{ borderColor: "primary.900" }}
                _hover={{ borderColor: "primary.900" }}
                required
              />
            </FormControl>
            <PasswordField
              borderColor="primary.400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _focus={{ borderColor: "primary.900" }}
              _hover={{ borderColor: "primary.900" }}
            />
            <Button
              bg="primary.400"
              color="foreground"
              _hover={{ bg: "primary.500" }}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  )
}

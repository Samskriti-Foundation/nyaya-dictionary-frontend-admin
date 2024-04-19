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
import { useLoginDBManagerQuery } from "../../api/login.api"

import { BaseSyntheticEvent } from "react"

import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toast = useToast()
  const navigate = useNavigate()

  const loginMutation = useLoginDBManagerQuery()

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      toast({
        position: "top",
        title: "Please enter email and password",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }

    loginMutation.mutate(
      { username: email, password },
      {
        onSuccess: (data: { access_token: string; token_type: string }) => {
          navigate("/words")
          toast({
            position: "top",
            title: "Login successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          localStorage.setItem("token", data.access_token)
          setIsLoading(false)
        },
        onError: (error) => {
          toast({
            position: "top",
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <Card maxW="md" p={8} bg="foreground" boxShadow="lg">
      <form onSubmit={handleSubmit}>
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

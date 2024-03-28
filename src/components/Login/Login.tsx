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
} from "@chakra-ui/react";

import { FaBook } from "react-icons/fa";
import { PasswordField } from "./PasswordField";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/LoginApi";

import { BaseSyntheticEvent } from "react";

import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading , setIsLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: {access_token: string, token_type: string}) => {
      localStorage.setItem('token', data.access_token)
      navigate('/dashboard')
      setIsLoading(false)
    },
    onError: (res: any) => {
      toast({
        position: "top",
        title: `Error: ${res.response.data.detail}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
    }
  })
  
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    let email = e.target.form[0].value
    let password = e.target.form[2].value
    console.log(isLoading)
    mutation.mutate({email, password})
  }

  return (
    <Card maxW="md" p = {8} bg = "foreground" boxShadow="lg">
      <Stack spacing = {4}>
        <Center color = "primary">
          <Icon as={FaBook} h = "32px" w = "32px"/>
          <Heading fontSize = "24px" pl = "12px">Nyaya Dictionary - Admin</Heading>
        </Center>
        <Heading>Login to you account</Heading>
        <Divider orientation='horizontal' borderColor = "primary.900"/>
        <form>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email" color = "primary.900">Email</FormLabel>
              <Input
                id="email"
                type="email"
                borderColor = "primary"
                placeholder="Enter your email"
                _focus = {{borderColor: "primary"}}
                _hover = {{borderColor: "secondary"}}
                required
              />
            </FormControl>
            <PasswordField
              borderColor = "primary"
              placeholder="Enter your password"
              _focus = {{borderColor: "primary"}}
              _hover = {{borderColor: "secondary"}}
            />
            <Button
              bg = "primary"
              color= "foreground"
              _hover={{bg: "secondary"}}
              type = "submit"
              onClick={(e) => handleSubmit(e)}
              isLoading = {isLoading}
              >Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  )
}
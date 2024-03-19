import { BaseSyntheticEvent, useEffect, useState } from 'react'

import { useQueryClient , useMutation } from "@tanstack/react-query"
import { updateAdmin } from "../../api/AdminApi"

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'


interface Props {
  isOpen: boolean;
  onClose: () => void;
  dataItem: {
    first_name: string
    last_name: string
    email: string
  }
}


export default function AdminEditModal({isOpen, onClose, dataItem} : Props) {
  const [firstName, setFirstName] = useState(dataItem.first_name)
  const [lastName, setLastName] = useState(dataItem.last_name)
  const [email, setEmail] = useState(dataItem.email)

  const originalEmail = dataItem.email

  const queryClient = useQueryClient()
  const toast = useToast()

  useEffect(() => {
    setFirstName(dataItem.first_name)
    setLastName(dataItem.last_name)
    setEmail(dataItem.email)
  }, [dataItem])

  
  const mutation = useMutation({
    mutationFn: updateAdmin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["admins"]})
      console.log(data)
    },
    onError: (res: any) => {
      toast({
        position: "top",
        title: `Error: ${res.response.data.detail}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()

    const data = {
      first_name: firstName,
      last_name: lastName,
      email
    }

    mutation.mutate({email: originalEmail, data})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit = {(e) => handleSubmit(e)}>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>First Name:</Text>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Text>Last Name:</Text>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Text>Email:</Text>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent='center' w='100%' gap = {4}>
              <Button type='submit'>Submit</Button>
              <Button colorScheme='red' mr={3} onClick={onClose}>Close</Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
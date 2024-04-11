import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Textarea,
  Button,
  useToast,
  Spinner,
  } from '@chakra-ui/react'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createWordMeaning } from '../../../api/WordMeaning'
import { useState } from 'react'
import { AxiosError } from 'axios'

export default function AddMeaningModal({ isOpen, onClose, word } : any) {
  const [meaning, setMeaning] = useState("")
  const [isLoading , setIsLoading] = useState(false)

  const toast = useToast()

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: createWordMeaning,
    onSuccess: (data: {message: string}) => {
      queryClient.invalidateQueries({queryKey: ["words", word]})
      setIsLoading(false)
      onClose()
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (res: AxiosError) => {
      setIsLoading(false)
      onClose()
      toast({
        title: res.response ? `Error: ${res.response.status} - ${res.response.statusText}` : `Error: ${res.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()

    if(meaning === ""){
      toast({
        title: "Meaning cannot be empty",
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    mutation.mutate({word, meaning})
  }
  
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size = "4xl">
      <ModalOverlay />

      {isLoading ? (
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <Spinner color = "tertiary"/>
        </Flex>
      ) : (
        <ModalContent>
        <ModalHeader>Add New Meaning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap = "4" direction = "column">
            <FormControl>
              <Textarea placeholder = "Enter new meaning" required onChange = {(e: any) => {setMeaning(e.target.value)}}/>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          <Button onClick = {(e: any) => {handleSubmit(e)}} bg = "tertiary" color = "background">Submit</Button>
          <Button onClick={onClose} bg = "primary" color = "background">Cancel</Button>
        </ModalFooter>
      </ModalContent>)}
    </Modal>
  )
}

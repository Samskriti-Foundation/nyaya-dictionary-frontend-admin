import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BaseSyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface DeleteVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  title: string
  description: string
  deleteFn: (...args : any[]) => any
  deleteQueryKeys: string[]
}


export default function DeleteVerificationModal({isOpen, onClose, title, description, deleteFn, deleteQueryKeys, word}: DeleteVerificationModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const queryClient = useQueryClient()
  const toast = useToast()
  const navigate = useNavigate()
  
  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["words", ...deleteQueryKeys]})
      setIsLoading(false)
      onClose()
      toast({
        title: "Word deleted successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate(`/words/`)
    },
    onError: (res: AxiosError) => {
      toast({
        title: res.response?.data ? `Error: ${Object.entries(res.response?.data)[0][1]}` : `Error: ${res.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    }
  })

  const handleDelete = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    mutation.mutate({word})
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {
        isLoading ?
        <Spinner/> :
        (<ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          <Button onClick={(e) => {handleDelete(e)}} color = "foreground" bg = "tertiary.400" _hover = {{bg: "tertiary.500"}}>Yes</Button>
          <Button onClick={onClose} color = "foreground" bg = "primary.400" _hover = {{bg: "primary.500"}}>No</Button>
        </ModalFooter>
      </ModalContent>)
      }
    </Modal>
  )
}

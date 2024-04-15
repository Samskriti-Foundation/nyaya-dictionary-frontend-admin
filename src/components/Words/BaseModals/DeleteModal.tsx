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
} from "@chakra-ui/react"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { BaseSyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

interface DeleteModalProps<
  T extends (...args: (string | number)[]) => Promise<void>
> {
  isOpen: boolean
  onClose: () => void
  title: string
  deletemessage: string
  description: string
  deleteFn: T
  mutParams: Parameters<T>[0]
  queryKey: (number | string)[]
  navigateBack?: boolean
}

export default function DeleteModal<
  T extends (...args: (string | number)[]) => Promise<void>
>({
  isOpen,
  onClose,
  title,
  deletemessage,
  description,
  deleteFn,
  queryKey,
  mutParams,
  navigateBack = false,
}: DeleteModalProps<T>) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()
  const toast = useToast()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
      setIsLoading(false)
      onClose()
      toast({
        title: deletemessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      if (navigateBack) {
        navigate(`/words/`)
      }
    },
    onError: (res: AxiosError) => {
      toast({
        title: res.response?.data
          ? `Error: ${Object.entries(res.response?.data)[0][1]}`
          : `Error: ${res.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    },
  })

  const handleDelete = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    mutation.mutate(mutParams)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            onClick={(e) => {
              handleDelete(e)
            }}
            color="foreground"
            bg="tertiary.400"
            _hover={{ bg: "tertiary.500" }}
            isLoading={isLoading}
          >
            Yes
          </Button>
          <Button
            onClick={onClose}
            color="foreground"
            bg="primary.400"
            _hover={{ bg: "primary.500" }}
          >
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

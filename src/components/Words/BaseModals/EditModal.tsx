import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  queryKey: (string | number)[]
  mutParams: { [key: string]: string | number }
  editFn: (...args: (number | string)[]) => Promise<any>
  title: string
  children: JSX.Element
}

export default function EditModal({
  isOpen,
  onClose,
  queryKey,
  mutParams,
  editFn,
  title,
  children,
}: EditModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: editFn,
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      setIsLoading(false)
      onClose()
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
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

  const handleSubmit = () => {
    setIsLoading(true)
    mutation.mutate(mutParams)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            onClick={handleSubmit}
            bg="tertiary.400"
            color="background"
            _hover={{ bg: "tertiary.500" }}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            bg="primary.400"
            color="background"
            _hover={{ bg: "primary.500" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

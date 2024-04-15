import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

interface AddModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  mutationFn: (data: any) => Promise<any>
  mutParams: Record<string, string | number>
  queryKey: string[]
  children: JSX.Element
}

export default function AddModal({
  isOpen,
  onClose,
  title,
  mutationFn,
  queryKey,
  mutParams,
  children,
}: AddModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: queryKey })
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
    mutation.mutate({ ...mutParams })
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

import { BaseSyntheticEvent, useEffect, useState } from "react"

import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updateAdmin } from "../../api/dbmanagers.api"

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
  Input,
} from "@chakra-ui/react"

import { useToast } from "@chakra-ui/react"

interface Props {
  isOpen: boolean
  onClose: () => void
  dataItem: {
    first_name: string
    last_name: string
    email: string
    is_superuser: boolean
  }
}

export default function AdminEditModal({ isOpen, onClose, dataItem }: Props) {
  const [formData, setFormData] = useState({ ...dataItem })

  useEffect(() => {
    setFormData({ ...dataItem })
  }, [dataItem])

  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
    onError: (res: any) => {
      toast({
        position: "top",
        title: `Error: ${res.response.data.detail}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    },
  })

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    mutation.mutate({ data: formData })
    onClose()
  }

  const handleInputChange = (key: keyof Props["dataItem"], value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Text>{key}:</Text>
                <Input
                  value={String(formData[key as keyof typeof formData])}
                  onChange={(e) =>
                    handleInputChange(
                      key as keyof typeof formData,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="center" w="100%" gap={4}>
              <Button type="submit">Submit</Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"

import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordExampleMutation } from "../../../api/example.api"

interface DeleteSingleExampleModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
  example_id: number
}

export default function DeleteSingleExampleModal({
  isOpen,
  onClose,
  word,
  meaning_id,
  example_id,
}: DeleteSingleExampleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const exampleMutation = useDeleteWordExampleMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    exampleMutation.mutate(
      {
        example_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Example deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })

          onClose()
        },
      }
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete this example?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>This example will be deleted and the action cannot be undone.</Text>
    </BaseModal>
  )
}

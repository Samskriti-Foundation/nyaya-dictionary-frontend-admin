import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"

import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordExamplesMutation } from "../../../api/example.api"

interface DeleteExamplesModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function DeleteExamplesModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: DeleteExamplesModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const exampleMutation = useDeleteWordExamplesMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    exampleMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Examples deleted",
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
        },
      }
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete all examples?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the examples associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

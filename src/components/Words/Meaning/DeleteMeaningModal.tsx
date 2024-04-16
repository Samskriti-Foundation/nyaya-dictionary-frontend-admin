import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordMeaningMutation } from "../../../api/meaning.api"

interface DeleteMeaningModalProps {
  word: string
  meaning_id: number
  isOpen: boolean
  onClose: () => void
}

export default function DeleteMeaningModal({
  word,
  meaning_id,
  isOpen,
  onClose,
}: DeleteMeaningModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const wordMutation = useDeleteWordMeaningMutation(word)

  const handleSubmit = () => {
    setIsLoading(true)
    wordMutation.mutate(
      {
        word,
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Meaning has been deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
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
      title={`Are you sure you want to delete this meaning?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the data associated with this meaning will be deleted. This action
        cannot be undone.
      </Text>
    </BaseModal>
  )
}

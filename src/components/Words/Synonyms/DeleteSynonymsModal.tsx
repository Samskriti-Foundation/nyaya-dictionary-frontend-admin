import { useToast, Text } from "@chakra-ui/react"
import { useDeleteWordSynonymsMutation } from "../../../api/synonyms.api"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"

interface DeleteSynonymsModalProps {
  word: string
  meaning_id: number
  isOpen: boolean
  onClose: () => void
}

export default function DeleteSynonymsModal({
  word,
  meaning_id,
  isOpen,
  onClose,
}: DeleteSynonymsModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const synonymMutation = useDeleteWordSynonymsMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)
    synonymMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Synonyms has been deleted successfully",
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
      title={`Are you sure you want to delete all synonyms?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the synonyms associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

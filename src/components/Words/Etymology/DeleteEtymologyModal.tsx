import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordEtymologiesMutation } from "../../../api/etymology.api"

interface DeleteEtymologyModalProps {
  word: string
  meaning_id: number
  isOpen: boolean
  onClose: () => void
}

export default function DeleteEtymologyModal({
  word,
  meaning_id,
  isOpen,
  onClose,
}: DeleteEtymologyModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const etymologyMutation = useDeleteWordEtymologiesMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)
    etymologyMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Etymologies has been deleted successfully",
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
      title={`Are you sure you want to delete all etymologies?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the etymologies associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

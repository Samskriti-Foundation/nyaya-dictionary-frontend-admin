import { Text, useToast } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useDeleteWordTranslationsMutation } from "../../../api/translation.api"

interface DeleteTranslationsModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function DeleteTranslationsModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: DeleteTranslationsModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const translationMutation = useDeleteWordTranslationsMutation(
    word,
    meaning_id
  )

  const handleSubmit = () => {
    setIsLoading(true)

    translationMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast({
            title: "Translation deleted",
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
      title={`Are you sure you want to delete all translations?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the translations associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

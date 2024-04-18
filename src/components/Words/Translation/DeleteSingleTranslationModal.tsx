import { Text, useToast } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useDeleteWordTranslationMutation } from "../../../api/translation.api"

interface DeleteTranslationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
  translation_id: number
}

export default function DeleteSingleTranslationModal({
  isOpen,
  onClose,
  word,
  meaning_id,
  translation_id,
}: DeleteTranslationModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const translationMutation = useDeleteWordTranslationMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    translationMutation.mutate(
      {
        translation_id,
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
      title={`Are you sure you want to delete this translation?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        This translation will be deleted and the action cannot be undone.
      </Text>
    </BaseModal>
  )
}

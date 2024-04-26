import { Text } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useDeleteWordTranslationMutation } from "../../../api/translation.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

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
          successToast("Translation deleted")
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
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

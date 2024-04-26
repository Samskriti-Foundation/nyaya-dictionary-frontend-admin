import { Text } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useDeleteWordTranslationsMutation } from "../../../api/translation.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

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
          successToast("Translations deleted successfully")
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

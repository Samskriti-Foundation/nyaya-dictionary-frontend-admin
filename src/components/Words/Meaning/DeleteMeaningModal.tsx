import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import { useDeleteWordMeaningMutation } from "../../../api/meaning.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

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
          successToast("Meaning has been deleted successfully")
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

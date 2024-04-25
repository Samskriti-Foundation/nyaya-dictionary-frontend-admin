import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import { useDeleteWordEtymologiesMutation } from "../../../api/etymology.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

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
          successToast("Etymologies has been deleted successfully")
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

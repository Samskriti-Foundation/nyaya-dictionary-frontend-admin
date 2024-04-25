import { Text } from "@chakra-ui/react"
import { useState } from "react"
import { useDeleteWordAntonymsMutation } from "../../../api/antonyms.api"
import BaseModal from "../WordModals/BaseModal"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface DeleteAntonymsModalProps {
  word: string
  meaning_id: number
  isOpen: boolean
  onClose: () => void
}

export default function DeleteAntonymsModal({
  word,
  meaning_id,
  isOpen,
  onClose,
}: DeleteAntonymsModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const antonymMutation = useDeleteWordAntonymsMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)
    antonymMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Antonyms has been deleted successfully")
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
      title={`Are you sure you want to delete all antonyms?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the antonyms associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

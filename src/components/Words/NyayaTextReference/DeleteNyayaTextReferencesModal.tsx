import { useState } from "react"
import { useDeleteWordNyayaTextReferencesMutation } from "../../../api/nyayaTextReference.api"
import BaseModal from "../WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface DeleteNyayaTextReferencesModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function DeleteNyayaTextReferencesModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: DeleteNyayaTextReferencesModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const nyayaMutation = useDeleteWordNyayaTextReferencesMutation(
    word,
    meaning_id
  )

  const handleSubmit = () => {
    setIsLoading(true)

    nyayaMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Nyaya text references deleted successfully")
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
      title={`Are you sure you want to delete all nyaya text references?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the nyaya text references associated with this meaning will be
        deleted. This action cannot be undone.
      </Text>
    </BaseModal>
  )
}

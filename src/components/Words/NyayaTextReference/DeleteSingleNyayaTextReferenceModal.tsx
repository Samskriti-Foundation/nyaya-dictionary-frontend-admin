import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import { useDeleteWordNyayaTextReferenceMutation } from "../../../api/nyayaTextReference.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface DeleteSingleNyayaTextReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  nyaya_text_id: number
  word: string
  meaning_id: number
}

export default function DeleteSingleNyayaTextReferenceModal({
  isOpen,
  onClose,
  nyaya_text_id,
  word,
  meaning_id,
}: DeleteSingleNyayaTextReferenceModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const nyayaMutation = useDeleteWordNyayaTextReferenceMutation(
    word,
    meaning_id
  )

  const handleSubmit = () => {
    setIsLoading(true)

    nyayaMutation.mutate(
      {
        nyaya_text_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Nyaya text reference deleted successfully")
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
      title={`Are you sure you want to delete this nyaya text reference?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        This nyaya text reference will be deleted and the action cannot be
        undone.
      </Text>
    </BaseModal>
  )
}

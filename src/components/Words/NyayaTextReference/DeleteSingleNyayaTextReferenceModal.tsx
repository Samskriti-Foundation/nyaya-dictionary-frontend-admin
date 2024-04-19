import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordNyayaTextReferenceMutation } from "../../../api/nyayaTextReference.api"

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

  const toast = useToast()

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
          toast({
            title: "Nyaya text reference deleted successfully",
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

import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"

import { Text } from "@chakra-ui/react"
import { useDeleteWordExamplesMutation } from "../../../api/example.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface DeleteExamplesModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function DeleteExamplesModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: DeleteExamplesModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const exampleMutation = useDeleteWordExamplesMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    exampleMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Examples deleted")
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
      title={`Are you sure you want to delete all examples?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the examples associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

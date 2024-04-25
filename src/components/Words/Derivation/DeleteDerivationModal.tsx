import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import { useDeleteWordDerivationsMutation } from "../../../api/derivation.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface DeleteDerivationModalProps {
  word: string
  meaning_id: number
  isOpen: boolean
  onClose: () => void
}

export default function DeleteDerivationModal({
  word,
  meaning_id,
  isOpen,
  onClose,
}: DeleteDerivationModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const derivationMutation = useDeleteWordDerivationsMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)
    derivationMutation.mutate(
      {
        meaning_id,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Derivations has been deleted successfully")
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
      title={`Are you sure you want to delete all derivations?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the derivations associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { Text, useToast } from "@chakra-ui/react"
import { useDeleteWordDerivationsMutation } from "../../../api/derivation.api"

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

  const toast = useToast()

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
          toast({
            title: "Derivations has been deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
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

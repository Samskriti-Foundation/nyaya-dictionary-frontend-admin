import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { useCreateWordDerivationMutation } from "../../../api/derivation.api"
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddDerivationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddDerivationModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddDerivationModalProps) {
  const [derivation, setDerivation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const derivationMutation = useCreateWordDerivationMutation(word, meaning_id)
  const handleSubmit = () => {
    setIsLoading(true)

    if (!derivation) {
      errorToast(Error("Derivation cannot be empty"))
      setIsLoading(false)
      return
    }

    derivationMutation.mutate(
      { derivation },
      {
        onSuccess: () => {
          setDerivation("")
          setIsLoading(false)
          successToast("Derivation added successfully!")
          onClose()
        },
        onError: (error) => {
          errorToast(error)
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add new derivation"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New derivation</FormLabel>
        <Textarea
          placeholder="Enter new meaning"
          value={derivation}
          onChange={(e) => setDerivation(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

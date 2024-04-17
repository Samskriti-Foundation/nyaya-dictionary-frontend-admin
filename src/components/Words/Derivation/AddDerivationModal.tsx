import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { useCreateWordDerivationMutation } from "../../../api/derivation.api"
import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react"

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

  const toast = useToast()

  const derivationMutation = useCreateWordDerivationMutation(word, meaning_id)
  const handleSubmit = () => {
    setIsLoading(true)

    if (!derivation) {
      toast({
        title: "Derivation cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }

    derivationMutation.mutate(
      { derivation },
      {
        onSuccess: () => {
          setDerivation("")
          setIsLoading(false)
          toast({
            title: "Derivation has been added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
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

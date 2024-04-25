import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useCreateWordAntonymMutation } from "../../../api/antonyms.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddAntonymModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddAntonymModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddAntonymModalProps) {
  const [antonym, setAntonym] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const antonymMutation = useCreateWordAntonymMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!antonym) {
      errorToast(Error("Please enter antonym"))
      return
    }

    antonymMutation.mutate(
      {
        antonym,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setAntonym("")
          onClose()
          successToast("Antonym added successfully!")
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add new antonym"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New antonym</FormLabel>
        <Textarea
          placeholder="Enter new antonym"
          value={antonym}
          onChange={(e) => setAntonym(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

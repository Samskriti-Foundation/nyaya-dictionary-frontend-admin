import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import { useCreateWordMeaningMutation } from "../../../api/meaning.api"
import BaseModal from "../WordModals/BaseModal"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddMeaningModalProps {
  word: string
  isOpen: boolean
  onClose: () => void
}

export default function AddMeaningModal({
  word,
  isOpen,
  onClose,
}: AddMeaningModalProps) {
  const [meaning, setMeaning] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const wordMutation = useCreateWordMeaningMutation(word)

  const handleSubmit = async () => {
    setIsLoading(true)

    if (!meaning) {
      errorToast(Error("Meaning cannot be empty"))
      setIsLoading(false)
      return
    }

    wordMutation.mutate(
      {
        word,
        meaning,
      },
      {
        onSuccess: () => {
          setMeaning("")
          successToast("Meaning has been added successfully")
          onClose()
          setIsLoading(false)
        },
        onError: () => {
          errorToast(Error("Error adding meaning"))
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add new meaning"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New meaning</FormLabel>
        <Textarea
          placeholder="Enter new meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

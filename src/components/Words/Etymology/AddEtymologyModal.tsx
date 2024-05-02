import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordEtymologyMutation } from "../../../api/etymology.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddEtymologyModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddEtymologyModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddEtymologyModalProps) {
  const [etymology, setEtymology] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const etymologyMutation = useCreateWordEtymologyMutation(word, meaning_id)
  const handleSubmit = () => {
    setIsLoading(true)

    if (!etymology) {
      errorToast(Error("Etymology cannot be empty"))
      setIsLoading(false)
      return
    }

    etymologyMutation.mutate(
      { etymology },
      {
        onSuccess: () => {
          setEtymology("")
          successToast("Etymology added successfully!")
          onClose()
          setIsLoading(false)
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
      title="Add new etymology"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New etymology</FormLabel>
        <Textarea
          placeholder="Enter new etymology"
          value={etymology}
          onChange={(e) => setEtymology(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

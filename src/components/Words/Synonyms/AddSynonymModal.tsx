import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordSynonymMutation } from "../../../api/synonyms.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddSynonymModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddSynonymModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddSynonymModalProps) {
  const [synonym, setEtymology] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const synonymMutation = useCreateWordSynonymMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!synonym) {
      successToast("Please enter a synonym")
      return
    }

    synonymMutation.mutate(
      {
        synonym,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setEtymology("")
          successToast("Synonym added successfully")
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add new synonym"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New synonym</FormLabel>
        <Textarea
          placeholder="Enter new synonym"
          value={synonym}
          onChange={(e) => setEtymology(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

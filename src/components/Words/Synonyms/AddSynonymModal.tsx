import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordSynonymMutation } from "../../../api/synonyms.api"

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

  const toast = useToast()

  const synonymMutation = useCreateWordSynonymMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!synonym) {
      toast({
        title: "Please enter a synonym",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
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
          toast({
            title: "Synonym added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        },
        onError: (error) => {
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

import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useCreateWordMeaningMutation } from "../../../api/meaning.api"
import BaseModal from "../WordModals/BaseModal"

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

  const toast = useToast()

  const wordMutation = useCreateWordMeaningMutation(word)

  const handleSubmit = async () => {
    setIsLoading(true)

    if (!meaning) {
      toast({
        title: "Meaning cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
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
          toast({
            title: "Meaning has been added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
          setIsLoading(false)
        },
        onError: () => {
          toast({
            title: "Error adding meaning",
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

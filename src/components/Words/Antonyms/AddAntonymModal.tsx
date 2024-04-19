import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react"
import { useCreateWordAntonymMutation } from "../../../api/antonyms.api"

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

  const toast = useToast()

  const antonymMutation = useCreateWordAntonymMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!antonym) {
      toast({
        title: "Please enter an antonym",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
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
          toast({
            title: "Antonym added successfully",
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

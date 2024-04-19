import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordEtymologyMutation } from "../../../api/etymology.api"

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

  const toast = useToast()

  const etymologyMutation = useCreateWordEtymologyMutation(word, meaning_id)
  const handleSubmit = () => {
    setIsLoading(true)

    if (!etymology) {
      toast({
        title: "Etymology cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }

    etymologyMutation.mutate(
      { etymology },
      {
        onSuccess: () => {
          setEtymology("")
          toast({
            title: "Etymologies has been added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
          setIsLoading(false)
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
      title="Add new etymology"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New etymology</FormLabel>
        <Textarea
          placeholder="Enter new meaning"
          value={etymology}
          onChange={(e) => setEtymology(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

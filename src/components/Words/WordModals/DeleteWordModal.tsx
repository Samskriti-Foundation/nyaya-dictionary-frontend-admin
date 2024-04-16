import { useState } from "react"
import BaseModal from "./BaseModal"
import { useDeleteWordMutation } from "../../../api/words.api"
import { useToast, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface DeleteWordModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
}

export default function DeleteWordModal({
  isOpen,
  onClose,
  word,
}: DeleteWordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const wordMutation = useDeleteWordMutation()

  const navigate = useNavigate()

  const handleSubmit = () => {
    setIsLoading(true)

    wordMutation.mutate(word, {
      onSuccess: () => {
        setIsLoading(false)
        toast({
          title: "Word has been deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        navigate("/words")
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
    })
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete ${word}?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the data associated with this word will be deleted. This action
        cannot be undone.
      </Text>
    </BaseModal>
  )
}

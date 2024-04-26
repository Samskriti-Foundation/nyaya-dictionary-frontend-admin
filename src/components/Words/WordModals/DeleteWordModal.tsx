import { useState } from "react"
import BaseModal from "./BaseModal"
import { useDeleteWordMutation } from "../../../api/words.api"
import { Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const wordMutation = useDeleteWordMutation()

  const navigate = useNavigate()

  const handleSubmit = () => {
    setIsLoading(true)

    wordMutation.mutate(word, {
      onSuccess: () => {
        setIsLoading(false)
        successToast("Word has been deleted successfully")
        navigate("/words")
        onClose()
      },
      onError: (error) => {
        errorToast(error)
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

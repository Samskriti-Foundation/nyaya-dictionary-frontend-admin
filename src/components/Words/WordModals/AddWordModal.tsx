import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"
import BaseModal from "./BaseModal"
import { useCreateWordMutation } from "../../../api/words.api"
import { useNavigate } from "react-router-dom"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddWordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddWordModal({ isOpen, onClose }: AddWordModalProps) {
  const [sanskrit_word, setSanskritWord] = useState("")
  const [english_transliteration, setEnglishTransliteration] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()
  const navigate = useNavigate()

  const wordMutation = useCreateWordMutation()

  const handleSubmit = async () => {
    setIsLoading(true)

    wordMutation.mutate(
      {
        sanskrit_word,
        english_transliteration,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          navigate(`/words/${sanskrit_word}`)
          successToast("Word added successfully!")
          setSanskritWord("")
          setEnglishTransliteration("")
          onClose()
        },

        onError: (error) => {
          errorToast(error)
          setIsLoading(false)
          onClose()
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add Word Details"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Flex gap="4" direction="column">
        <FormControl>
          <FormLabel>Sanskrit Word</FormLabel>
          <Input
            placeholder="Enter Sanskrit word"
            required
            value={sanskrit_word}
            onChange={(e) => setSanskritWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>English Transliteration</FormLabel>
          <Input
            placeholder="(Optional) Will be automatically created if not provided."
            value={english_transliteration}
            onChange={(e) => setEnglishTransliteration(e.target.value)}
          />
        </FormControl>
      </Flex>
    </BaseModal>
  )
}

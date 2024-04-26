import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import BaseModal from "./BaseModal"
import { useState } from "react"
import { useUpdateWordMutation } from "../../../api/words.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface EditWordModalProps {
  isOpen: boolean
  onClose: () => void
  sanskrit_word: string
  english_transliteration: string
}

export default function EditWordModal({
  isOpen,
  onClose,
  sanskrit_word,
  english_transliteration,
}: EditWordModalProps) {
  const [sanskritWord, setSanskritWord] = useState(sanskrit_word)
  const [englishTransliteration, setEnglishTransliteration] = useState(
    english_transliteration
  )

  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const wordMutation = useUpdateWordMutation(sanskrit_word)

  const handleSubmit = () => {
    setIsLoading(true)

    wordMutation.mutate(
      {
        word: sanskritWord,
        english_transliteration: englishTransliteration,
      },
      {
        onSuccess: () => {
          successToast("Word has been edited successfully")
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
      title="Edit Word Details"
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
            value={sanskritWord}
            onChange={(e) => setSanskritWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>English Transliteration</FormLabel>
          <Input
            placeholder="Enter English Transliteration"
            value={englishTransliteration}
            onChange={(e) => setEnglishTransliteration(e.target.value)}
          />
        </FormControl>
      </Flex>
    </BaseModal>
  )
}

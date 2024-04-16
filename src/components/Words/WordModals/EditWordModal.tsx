import { Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import BaseModal from "./BaseModal"
import { useState } from "react"
import { useUpdateWordMutation } from "../../../api/words.api"

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
  const toast = useToast()
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
          setSanskritWord("")
          setEnglishTransliteration("")
          toast({
            title: "Word has been edited successfully",
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

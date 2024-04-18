import { Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"

import { useState } from "react"
import BaseModal from "./BaseModal"
import { useCreateWordMutation } from "../../../api/words.api"

interface AddWordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddWordModal({ isOpen, onClose }: AddWordModalProps) {
  const [sanskrit_word, setSanskritWord] = useState("")
  const [english_transliteration, setEnglishTransliteration] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

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
          setSanskritWord("")
          setEnglishTransliteration("")
          toast({
            title: "Word added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
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

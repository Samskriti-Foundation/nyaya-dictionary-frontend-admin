import { useEffect, useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useUpdateWordTranslationMutation } from "../../../api/translation.api"
import { indianLanguages } from "../../../utils/lang"

interface EditTranslationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
  translation_id: number
  defaultLanguage: string
  defaultTranslation: string
}

export default function EditTranslationModal({
  isOpen,
  onClose,
  word,
  meaning_id,
  translation_id,
  defaultLanguage,
  defaultTranslation,
}: EditTranslationModalProps) {
  const [language, setLanguage] = useState(defaultLanguage)
  const [translation, setTranslation] = useState(defaultTranslation)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setLanguage(defaultLanguage)
    setTranslation(defaultTranslation)
  }, [defaultLanguage, defaultTranslation])

  const toast = useToast()

  const translationMutation = useUpdateWordTranslationMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!translation || !language) {
      setIsLoading(false)
      toast({
        title: "Translation or language cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    translationMutation.mutate(
      { translation_id, language, translation },
      {
        onSuccess: () => {
          setTranslation("")
          setLanguage("")

          toast({
            title: "Translation has been added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        },
      }
    )

    setIsLoading(false)
    onClose()
  }

  return (
    <BaseModal
      title="Edit translation"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New translation</FormLabel>
        <Textarea
          placeholder="Enter new translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
      </FormControl>
      <Spacer h="2" />
      <Box>
        <FormLabel>Language</FormLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Select language"
        >
          {indianLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
      </Box>
    </BaseModal>
  )
}

import { useEffect, useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react"
import { useUpdateWordTranslationMutation } from "../../../api/translation.api"
import { indianLanguages } from "../../../utils/lang"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

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

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const translationMutation = useUpdateWordTranslationMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!translation || !language) {
      setIsLoading(false)
      errorToast(Error("Translation or language cannot be empty"))
      return
    }

    translationMutation.mutate(
      { translation_id, language, translation },
      {
        onSuccess: () => {
          setTranslation("")
          setLanguage("")
          successToast("Translation has been added successfully")
          setIsLoading(false)
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
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

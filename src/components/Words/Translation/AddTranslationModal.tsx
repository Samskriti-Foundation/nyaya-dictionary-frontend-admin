import { useState } from "react"
import BaseModal from "../WordModals/BaseModal"
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react"
import { useCreateWordTranslationMutation } from "../../../api/translation.api"
import { indianLanguages } from "../../../utils/lang"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddTranslationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddTranslationModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddTranslationModalProps) {
  const [language, setLanguage] = useState("English")
  const [translation, setTranslation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const translationMutation = useCreateWordTranslationMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!translation || !language) {
      setIsLoading(false)
      errorToast(Error("Translation or language cannot be empty"))
      return
    }
    setTranslation("")

    translationMutation.mutate(
      { language, translation },
      {
        onSuccess: () => {
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
      title="Add new translation"
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

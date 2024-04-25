import { FormControl, FormLabel, Spacer, Textarea } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordExampleMutation } from "../../../api/example.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddExampleModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddExampleModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddExampleModalProps) {
  const [example, setExample] = useState("")
  const [applicableModernContext, setApplicableModernContext] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const exampleMutation = useCreateWordExampleMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)
    exampleMutation.mutate(
      {
        example_sentence: example,
        applicable_modern_context: applicableModernContext,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setExample("")
          setApplicableModernContext("")
          successToast("Example has been added successfully")
          onClose()
        },
        onError: (error) => {
          errorToast(error)
          setIsLoading(false)
        },
      }
    )
    onClose()
  }

  return (
    <BaseModal
      title="Add example"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New Example</FormLabel>
        <Textarea
          placeholder="Enter new example"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
      </FormControl>
      <Spacer h="2" />
      <FormControl>
        <FormLabel>Applicable Modern Context</FormLabel>
        <Textarea
          placeholder="Enter applicable modern context"
          value={applicableModernContext}
          onChange={(e) => setApplicableModernContext(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

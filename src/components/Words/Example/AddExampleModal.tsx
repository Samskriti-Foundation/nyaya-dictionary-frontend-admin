import {
  FormControl,
  FormLabel,
  Spacer,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordExampleMutation } from "../../../api/example.api"

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

  const toast = useToast()

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
          toast({
            title: "Example has been added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: () => {
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

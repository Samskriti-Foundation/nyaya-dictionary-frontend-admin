import {
  FormControl,
  FormLabel,
  Spacer,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useEffect, useState } from "react"
import { useUpdateWordExampleMutation } from "../../../api/example.api"

interface EditExampleModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
  example_id: number
  defaultExample: string
  defaultApplicableContext: string
}

export default function EditExampleModal({
  isOpen,
  onClose,
  word,
  meaning_id,
  example_id,
  defaultExample,
  defaultApplicableContext,
}: EditExampleModalProps) {
  const [example, setExample] = useState(defaultExample)
  const [applicableModernContext, setApplicableModernContext] = useState(
    defaultApplicableContext
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setExample(defaultExample)
    setApplicableModernContext(defaultApplicableContext)
  }, [defaultExample, defaultApplicableContext])

  const toast = useToast()

  const exampleMutation = useUpdateWordExampleMutation(word, meaning_id)

  const handleSubmit = () => {
    setIsLoading(true)

    if (!example) {
      setIsLoading(false)
      toast({
        title: "Example cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    exampleMutation.mutate(
      {
        example_id,
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

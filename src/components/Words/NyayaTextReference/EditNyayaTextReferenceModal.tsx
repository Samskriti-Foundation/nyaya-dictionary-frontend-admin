import {
  FormControl,
  FormLabel,
  Spacer,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useEffect, useState } from "react"
import { useUpdateWordNyayaTextReferenceMutation } from "../../../api/nyayaTextReference.api"

interface EditNyayaTextReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
  defaultSource: string
  defaultDescription: string
  nyaya_text_id: number
}

export default function EditNyayaTextReferenceModal({
  isOpen,
  onClose,
  word,
  meaning_id,
  defaultSource,
  defaultDescription,
  nyaya_text_id,
}: EditNyayaTextReferenceModalProps) {
  const [source, setSource] = useState(defaultSource)
  const [description, setDescription] = useState(defaultDescription)

  useEffect(() => {
    setSource(defaultSource)
    setDescription(defaultDescription)
  }, [defaultSource, defaultDescription])

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const nyayaMutation = useUpdateWordNyayaTextReferenceMutation(
    word,
    meaning_id
  )

  const handleSubmit = () => {
    setIsLoading(true)

    nyayaMutation.mutate(
      {
        nyaya_text_id,
        source,
        description,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setSource("")
          setDescription("")
          toast({
            title: "Nyaya text reference updated successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        },
      }
    )
  }

  return (
    <BaseModal
      title="Edit nyaya text reference"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FormControl>
        <FormLabel>New source</FormLabel>
        <Textarea
          placeholder="Enter source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </FormControl>
      <Spacer h="2" />
      <FormControl>
        <FormLabel>New description</FormLabel>
        <Textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
    </BaseModal>
  )
}

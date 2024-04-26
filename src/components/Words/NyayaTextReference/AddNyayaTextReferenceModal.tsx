import { FormControl, FormLabel, Spacer, Textarea } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"
import { useCreateWordNyayaTextReferenceMutation } from "../../../api/nyayaTextReference.api"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

interface AddNyayaTextReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function AddNyayaTextReferenceModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: AddNyayaTextReferenceModalProps) {
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const nyayaMutation = useCreateWordNyayaTextReferenceMutation(
    word,
    meaning_id
  )

  const handleSubmit = () => {
    setIsLoading(true)

    nyayaMutation.mutate(
      {
        source,
        description,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setSource("")
          setDescription("")
          successToast("Nyaya text reference added successfully")
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
        },
      }
    )
  }

  return (
    <BaseModal
      title="Add new nyaya text reference"
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

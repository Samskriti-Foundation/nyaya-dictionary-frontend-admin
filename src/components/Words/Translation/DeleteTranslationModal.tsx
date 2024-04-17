import { Text } from "@chakra-ui/react"
import BaseModal from "../WordModals/BaseModal"
import { useState } from "react"

interface DeleteTranslationModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
  meaning_id: number
}

export default function DeleteTranslationModal({
  isOpen,
  onClose,
  word,
  meaning_id,
}: DeleteTranslationModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete all translations?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        All the translations associated with this meaning will be deleted. This
        action cannot be undone.
      </Text>
    </BaseModal>
  )
}

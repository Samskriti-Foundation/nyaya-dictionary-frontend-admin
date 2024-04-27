import { useState } from "react"
import BaseModal from "../Words/WordModals/BaseModal"
import { Text } from "@chakra-ui/react"
import { useDeleteDBManagerMutation } from "../../api/dbmanagers.api"

interface DeleteDBManagerModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  email: string
}

export default function DeleteDBManagerModal({
  isOpen,
  onClose,
  name,
  email,
}: DeleteDBManagerModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useDeleteDBManagerMutation()

  const handleSubmit = () => {
    setIsLoading(true)
    mutation.mutate(
      { email },
      {
        onSuccess: () => {
          setIsLoading(false)
          onClose()
        },
        onError: () => {
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete ${name}?`}
      isDelete={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        This DB manager will be deleted. This action cannot be undone.
      </Text>
    </BaseModal>
  )
}

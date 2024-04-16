import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"

interface BaseModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  isDelete?: boolean
  isLoading: boolean
  handleSubmit: () => void
}

export default function BaseModal({
  title,
  isOpen,
  onClose,
  children,
  isDelete = false,
  isLoading,
  handleSubmit,
}: BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            onClick={handleSubmit}
            bg="tertiary.400"
            color="background"
            _hover={{ bg: "tertiary.500" }}
            isLoading={isLoading}
          >
            {isDelete ? "Yes" : "Submit"}
          </Button>
          <Button
            onClick={onClose}
            bg="primary.400"
            color="background"
            _hover={{ bg: "primary.500" }}
          >
            {isDelete ? "No" : "Cancel"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

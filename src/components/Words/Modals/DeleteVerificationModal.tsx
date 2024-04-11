import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react'

interface DeleteVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  deleteElement: string
  deleteFn: () => void
}


export default function DeleteVerificationModal({isOpen, onClose, deleteElement, deleteFn}: DeleteVerificationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete {deleteElement}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {deleteFn(); onClose()}}>Delete</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

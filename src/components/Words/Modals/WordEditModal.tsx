import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'


interface WordEditModalProps {
  isOpen: boolean
  onClose: () => void
  word: string
}

export default function WordEditModal({isOpen, onClose, word} : WordEditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>

        <ModalFooter>
        <Button onClick = {(e: any) => {handleSubmit(e)}} bg = "tertiary" color = "background">Submit</Button>
        <Button onClick={onClose} bg = "primary" color = "background">Cancel</Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
  )
}

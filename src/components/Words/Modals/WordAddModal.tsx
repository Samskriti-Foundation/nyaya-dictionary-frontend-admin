import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Flex,
  } from '@chakra-ui/react'


interface WordAddModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WordAddModal({ isOpen, onClose } : WordAddModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Word Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap = "4" direction = "column">
            <FormControl>
              <FormLabel>Sanskrit Word</FormLabel>
              <Input placeholder = "Enter Sanskrit word" required/>
            </FormControl>
            <FormControl>
              <FormLabel>English Transliteration</FormLabel>
              <Input placeholder = "Enter English Transliteration"/>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

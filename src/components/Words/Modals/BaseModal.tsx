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


interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  footer?: JSX.Element
  title: string
  children: JSX.Element
}


export default function BaseModal({ isOpen, onClose, title, footer, children } : BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          {
            footer ? footer :
            (
            <>
              <Button bg = "tertiary.400" color = "foreground" _hover = {{bg: "tertiary.500"}}>Submit</Button>
              <Button onClick = {onClose} bg = "primary.400" color = "foreground" _hover = {{bg: "primary.500"}}>Close</Button>
            </>
          )
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

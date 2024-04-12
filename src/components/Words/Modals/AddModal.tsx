import BaseModal from "./BaseModal";


interface AddModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
}


export default function AddModal({ isOpen, onClose, title } : AddModalProps) {
  return (
    <BaseModal
      title = {title}
      isOpen = {isOpen}
      onClose = {onClose}
    >
    </BaseModal>
  )
}

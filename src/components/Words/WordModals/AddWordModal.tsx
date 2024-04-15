import {
  Flex,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

import AddModal from '../BaseModals/AddModal'
import { useState } from 'react'
import { createWord } from '../../../api/WordApi'


interface AddWordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddWordModal({isOpen, onClose}: AddWordModalProps) {
  const [sanskrit_word, setSanskritWord] = useState("")
  const [english_transliteration, setEnglishTransliteration] = useState("")
  
  return (
    <AddModal
      title = "Add Word Details"
      isOpen = {isOpen}
      onClose = {onClose}
      mutParams={{sanskrit_word, english_transliteration}}
      mutationFn = {createWord}
      queryKey = {["words"]}
    >
      <Flex gap = "4" direction = "column">
        <FormControl>
          <FormLabel>Sanskrit Word</FormLabel>
          <Input
            placeholder = "Enter Sanskrit word"
            required value = {sanskrit_word}
            onChange = {(e) => setSanskritWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>English Transliteration</FormLabel>
          <Input
            placeholder = "(Optional) Will be automatically created if not provided."
            value = {english_transliteration}
            onChange = {(e) => setEnglishTransliteration(e.target.value)}
          />
        </FormControl>
      </Flex>
    </AddModal>
  )
}

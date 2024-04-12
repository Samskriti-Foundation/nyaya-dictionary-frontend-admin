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
  Button,
  useToast,
  Spinner,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseSyntheticEvent, useState } from 'react'
import { createWord } from '../../../api/WordApi'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'


interface AddWordMeaningProps {
  isOpen: boolean
  onClose: () => void
}
  
export default function AddWordMeaning({ isOpen, onClose } : AddWordMeaningProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [sanskrit_word, setSanskritWord] = useState("")
  const [english_transliteration, setEnglishTransliteration] = useState("")
  
  const toast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createWord,
    onSuccess: (data: {message: string}) => {
      queryClient.invalidateQueries({queryKey: ["words"]})
      setIsLoading(false)
      onClose()
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate(`/words/${sanskrit_word}`)
    },
    onError: (res: AxiosError) => {
      toast({
        title: res.response?.data ? `Error: ${Object.entries(res.response?.data)[0][1]}` : `Error: ${res.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    }
  })
  
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    mutation.mutate({sanskrit_word, english_transliteration})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {isLoading ?
        <Spinner/> :
        (<ModalContent>
          <ModalHeader>Add Word Details</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <Flex gap = "4" direction = "column">
                <FormControl>
                  <FormLabel>Sanskrit Word</FormLabel>
                  <Input placeholder = "Enter Sanskrit word" required value = {sanskrit_word} onChange = {(e) => setSanskritWord(e.target.value)}/>
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>English Transliteration</FormLabel>
                  <Input placeholder = "Enter English Transliteration" value = {english_transliteration} onChange = {(e) => setEnglishTransliteration(e.target.value)}/>
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center" gap = "4">
              <Button onClick = {handleSubmit} bg = "tertiary.400" color = "foreground" _hover = {{bg: "tertiary.500"}}>Submit</Button>
              <Button onClick = {onClose} bg = "primary.400" color = "foreground" _hover = {{bg: "primary.500"}}>Close</Button>
            </ModalFooter>
      </ModalContent>
      )}
    </Modal>
  )
}
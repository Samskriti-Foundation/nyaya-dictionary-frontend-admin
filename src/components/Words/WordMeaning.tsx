import { Meaning } from "../../types";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Textarea,
} from '@chakra-ui/react'

import {useState, useRef} from "react"

import EditableTextInput from "./EditableTextInput"

export default function WordMeaning({meaning} : {meaning: Meaning}){
  const [meaningText, setMeaningText] = useState<string>(meaning.meaning)

  return (
    <Box>
      <FormControl>
        <FormLabel>Meaning</FormLabel>
        <Textarea
          value = {meaningText}
          onChange = {(e) => setMeaningText(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Etymology</FormLabel>
        {meaning.etymologies?.map((etymology) => (
          <EditableTextInput defaultValue = {etymology}/>
        ))}
      </FormControl>
    </Box>
  )
}

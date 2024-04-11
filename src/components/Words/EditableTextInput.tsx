import {
  ButtonGroup,
  useEditableControls,
  IconButton,
  Editable,
  EditablePreview,
  Textarea,
  EditableTextarea,
  Input,
  EditableInput,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react"


import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";


interface EditableTextInputProps {
  defaultValue: string
  type: "input" | "textarea"
  setText: (text: string) => void
  inlineBlock?: boolean
}


export default function EditableTextInput({defaultValue, type, setText, inlineBlock = false}: EditableTextInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue)

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
    } = useEditableControls()


    const handleSubmit = () => {
      setText(inputValue)
    }


    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" w="full" spacing={2} mt={2} display = {inlineBlock ? "inline-block" : "block"} textAlign='center'>
        <IconButton aria-label = "Check" icon={<FaCheck />} {...getSubmitButtonProps({ onClick: handleSubmit })} />
        <IconButton aria-label = "Close" icon={<MdClose />} {...getCancelButtonProps()} fontSize = "lg"/>
      </ButtonGroup>
    ) : null;
  }
  
  return (
    <Editable
      textAlign='left'
      defaultValue={defaultValue}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
    >
      <Tooltip label="Click to edit" shouldWrapChildren={true}>
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue("gray.100", "gray.700")
          }}
          />
      </Tooltip>
      {type === "textarea" ? <Textarea as={EditableTextarea} onChange={(e) => setInputValue(e.target.value)}/> : <Input as={EditableInput}  onChange={(e) => setInputValue(e.target.value)}/>}
      <EditableControls />
    </Editable>
  )
} 

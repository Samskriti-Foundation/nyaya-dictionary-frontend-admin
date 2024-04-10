import {
  ButtonGroup,
  useEditableControls,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  Textarea,
  EditableTextarea,
  Input,
  EditableInput,
} from "@chakra-ui/react"

import { FaCheck } from "react-icons/fa";
import {MdModeEdit, MdClose } from "react-icons/md";


interface EditableTextInputProps {
  defaultValue: string
  type: "input" | "textarea"
}


export default function EditableTextInput({defaultValue, type}: EditableTextInputProps) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton aria-label = "check" icon={<FaCheck />} {...getSubmitButtonProps()} />
        <IconButton aria-label = "close" icon={<MdClose />} {...getCancelButtonProps()} fontSize="xl"/>
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton aria-label = "edit" size='sm' icon={<MdModeEdit />} {...getEditButtonProps()} />
      </Flex>
    )
  }
  
  return (
    <Editable
      textAlign='center'
      defaultValue={defaultValue}
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {type === "textarea" ? <Textarea as={EditableTextarea} textAlign= "left"/> : <Input as={EditableInput} textAlign= "left"/>}
      <EditableControls />
    </Editable>
  )
}

import {
  ButtonGroup,
  useEditableControls,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Input
} from "@chakra-ui/react"

import { FaCheck } from "react-icons/fa";
import {MdModeEdit, MdClose } from "react-icons/md";


export default function EditableTextInput({defaultValue}: {defaultValue: string}) {
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
        <IconButton aria-label = "close" icon={<MdClose />} {...getCancelButtonProps()} />
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
      fontSize='2xl'
      isPreviewFocusable={false}
    >
      <EditablePreview />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  )
}

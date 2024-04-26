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

import { useContext, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import AuthContext from "../../context/AuthContext"
import { accessToInt, typeToInt } from "../../utils/converter"

interface EditableTextInputProps {
  defaultValue: string
  type: "input" | "textarea"
  setText: (text: string) => void
  inlineBlock?: boolean
}

export default function EditableTextInput({
  defaultValue,
  type,
  setText,
  inlineBlock = false,
}: EditableTextInputProps) {
  let { access } = useContext(AuthContext)

  access = access ?? "READ_ONLY"

  const isAccessAllowed = accessToInt(access) >= typeToInt("EDIT")

  const [inputValue, setInputValue] = useState(defaultValue)

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls()

    const handleSubmit = () => {
      setText(inputValue)
    }

    return isEditing ? (
      <ButtonGroup
        justifyContent="center"
        size="sm"
        w="full"
        spacing={2}
        mt={2}
        display={inlineBlock ? "inline-block" : "block"}
        textAlign="center"
      >
        <IconButton
          aria-label="Check"
          icon={<FaCheck />}
          {...getSubmitButtonProps({ onClick: handleSubmit })}
        />
        <IconButton
          aria-label="Close"
          icon={<MdClose />}
          {...getCancelButtonProps()}
          fontSize="lg"
        />
      </ButtonGroup>
    ) : null
  }

  return (
    <Editable
      textAlign="left"
      defaultValue={defaultValue}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      isDisabled={!isAccessAllowed}
    >
      <Tooltip
        label={
          isAccessAllowed ? "Click to edit" : "Insufficient access to edit"
        }
        shouldWrapChildren={true}
      >
        <EditablePreview
          py={2}
          px={4}
          cursor={isAccessAllowed ? "pointer" : "not-allowed"}
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
      </Tooltip>
      {type === "textarea" ? (
        <Textarea
          as={EditableTextarea}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <Input
          as={EditableInput}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <EditableControls />
    </Editable>
  )
}

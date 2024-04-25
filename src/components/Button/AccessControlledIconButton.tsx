import { IconButton } from "@chakra-ui/react"
import { IoIosCreate } from "react-icons/io"
import { MdDelete, MdEdit } from "react-icons/md"

import AuthContext from "../../context/AuthContext"
import { useContext } from "react"

const accessToInt = (access: string) => {
  switch (access) {
    case "READ_ONLY":
      return 0
    case "READ_WRITE":
      return 1
    case "READ_WRITE_MODIFY":
      return 2
    case "ALL":
      return 3
    default:
      return 0
  }
}

const typeToInt = (type: "ADD" | "EDIT" | "DELETE") => {
  switch (type) {
    case "ADD":
      return 1
    case "EDIT":
      return 2
    case "DELETE":
      return 3
    default:
      return 0
  }
}

export default function AccessControlledIconButton({
  type,
  title,
  onClick,
  isEmpty = false,
}: {
  type: "ADD" | "EDIT" | "DELETE"
  title: string
  onClick: () => void
  isEmpty?: boolean
}) {
  let { access } = useContext(AuthContext)

  access = access ?? "READ_ONLY"

  const isAccessAllowed = accessToInt(access) >= typeToInt(type)

  let content = <></>

  if (type === "ADD") {
    content = (
      <IconButton
        aria-label="Add"
        icon={<IoIosCreate />}
        size="sm"
        fontSize="xl"
        variant="outline"
        colorScheme="blue"
        title={
          isAccessAllowed ? title : "Insufficient access to perform action"
        }
        onClick={onClick}
        isDisabled={!isAccessAllowed}
      />
    )
  }

  if (type === "EDIT") {
    content = (
      <IconButton
        aria-label="Edit"
        icon={<MdEdit />}
        size="sm"
        fontSize="xl"
        variant="outline"
        colorScheme="black"
        title={
          isAccessAllowed ? title : "Insufficient access to perform action"
        }
        onClick={onClick}
        isDisabled={!isAccessAllowed}
      />
    )
  }

  if (type === "DELETE") {
    content = (
      <IconButton
        aria-label="Delete"
        icon={<MdDelete />}
        size="sm"
        fontSize="xl"
        variant="outline"
        colorScheme="red"
        title={
          isAccessAllowed
            ? title
            : isEmpty
            ? "No items to delete"
            : "Insufficient access to perform action"
        }
        onClick={onClick}
        isDisabled={!isAccessAllowed || isEmpty}
      />
    )
  }

  return content
}

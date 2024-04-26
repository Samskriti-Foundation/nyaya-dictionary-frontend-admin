import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import BaseModal from "../Words/WordModals/BaseModal"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { useCreateDBManagerMutation } from "../../api/dbmanagers.api"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"
import { PasswordField } from "../Login/PasswordField"

interface AddDBManagerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddDBManagerModal({
  isOpen,
  onClose,
}: AddDBManagerModalProps) {
  let { role } = useContext(AuthContext)
  role = role ?? "EDITOR"

  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [roleForm, setRoleForm] = useState("EDITOR")
  const [access, setAccess] = useState("READ_ONLY")
  const [password, setPassword] = useState("")

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const mutation = useCreateDBManagerMutation()

  const handleSubmit = () => {
    setIsLoading(true)

    if (roleForm === "ADMIN" || roleForm === "SUPERUSER") {
      setAccess("ALL")
    }

    if (!firstName || !lastName || !email) {
      setIsLoading(false)
      errorToast(Error("All fields are required!"), "top")
      return
    }

    mutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        role: roleForm,
        access,
        password,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
          setRoleForm("EDITOR")
          setAccess("READ_ONLY")
          onClose()
          successToast("DB Manager added successfully!")
        },
        onError: (error) => {
          errorToast(error)
          setIsLoading(false)
        },
      }
    )
  }

  const handleRoleChange = (value: string) => {
    setRoleForm(value)
    if (value === "ADMIN" || value === "SUPERUSER") {
      setAccess("ALL")
    }
  }

  return (
    <BaseModal
      title="Add DB Manager Details"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Flex gap="4" direction="column">
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select
            placeholder="Select role"
            value={roleForm}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="EDITOR">EDITOR</option>
            {role === "SUPERUSER" && (
              <>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPERUSER">SUPERUSER</option>
              </>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Access</FormLabel>
          {roleForm !== "ADMIN" && roleForm !== "SUPERUSER" ? (
            <Select
              placeholder="Select access"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
            >
              <option value="READ_ONLY">READ ONLY</option>
              <option value="READ_WRITE">READ WRITE</option>
              <option value="READ_WRITE_MODIFY">READ WRITE MODIFY</option>
              <option value="ALL">ALL</option>
            </Select>
          ) : (
            <Input
              value="ALL"
              disabled
              _disabled={{ cursor: "pointer", color: "black" }}
            />
          )}
        </FormControl>
        <PasswordField
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Flex>
    </BaseModal>
  )
}

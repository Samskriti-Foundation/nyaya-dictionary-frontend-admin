import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import BaseModal from "../Words/WordModals/BaseModal"
import { useContext, useEffect, useState } from "react"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"
import AuthContext from "../../context/AuthContext"
import { useUpdateDBManagerMutation } from "../../api/dbmanagers.api"

interface EditDBManagerModalProps {
  isOpen: boolean
  onClose: () => void
  DBManager: {
    firstName: string
    lastName: string
    email: string
    role: string
    access: string
  }
}

export default function EditDBManagerModal({
  isOpen,
  onClose,
  DBManager,
}: EditDBManagerModalProps) {
  let { role } = useContext(AuthContext)
  role = role ?? "EDITOR"

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [roleForm, setRoleForm] = useState("EDITOR")
  const [access, setAccess] = useState("READ_ONLY")

  useEffect(() => {
    setFirstName(DBManager.firstName)
    setLastName(DBManager.lastName)
    setEmail(DBManager.email)
    setRoleForm(DBManager.role)
    setAccess(DBManager.access)
  }, [DBManager])

  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const mutation = useUpdateDBManagerMutation()

  const handleSubmit = () => {
    setIsLoading(true)
    mutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        role: roleForm,
        access,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("DB Manager updated successfully!")
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
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
      title="Edit DB Manager Details"
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
      </Flex>
    </BaseModal>
  )
}

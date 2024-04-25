import {
  Box,
  Flex,
  Text,
  Heading,
  useDisclosure,
  OrderedList,
  ListItem,
} from "@chakra-ui/react"
import EditableTextInput from "../EditableTextInput"
import {
  useDeleteWordDerivationMutation,
  useGetWordDerivationsQuery,
  useUpdateWordDerivationMutation,
} from "../../../api/derivation.api"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import DeleteDerivationModal from "./DeleteDerivationModal"
import AddDerivationModal from "./AddDerivationModal"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

export default function WordDerivation({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const { data, isLoading, error } = useGetWordDerivationsQuery(
    word,
    meaning_id
  )

  const updateDerivationMutation = useUpdateWordDerivationMutation(
    word,
    meaning_id
  )

  const handleUpdate = (derivation_id: number, derivation: string) => {
    updateDerivationMutation.mutate(
      { derivation_id, derivation },
      {
        onSuccess: () => {
          successToast("Derivation has been edited successfully")
          onClose()
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  const deleteDerivationMutation = useDeleteWordDerivationMutation(
    word,
    meaning_id
  )

  const handleDelete = (derivation_id: number) => {
    deleteDerivationMutation.mutate(
      { derivation_id },
      {
        onSuccess: () => {
          successToast("Derivation has been deleted successfully")
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  {
    isLoading && <LoadingSpinner />
  }
  {
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Derivation
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <AccessControlledIconButton
            type="ADD"
            onClick={onOpen}
            title="Add derivation"
          />
          <AccessControlledIconButton
            type="DELETE"
            onClick={onDeleteOpen}
            title="Delete derivation"
            isEmpty={!(data?.length || 0)}
          />
        </Flex>
        <OrderedList>
          {data && data.length > 0 ? (
            data.map((derivation) => (
              <ListItem key={derivation.id}>
                <EditableTextInput
                  defaultValue={derivation.derivation}
                  setText={(value) => {
                    value === ""
                      ? handleDelete(derivation.id)
                      : handleUpdate(derivation.id, value)
                  }}
                  type="textarea"
                />
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" p="2" fontSize="2xl">
              No derivations found
            </Text>
          )}
        </OrderedList>
      </Box>
      <AddDerivationModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteDerivationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

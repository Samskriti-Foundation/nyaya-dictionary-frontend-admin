import {
  Box,
  Flex,
  Text,
  Heading,
  ListItem,
  OrderedList,
  useDisclosure,
} from "@chakra-ui/react"
import EditableTextInput from "../EditableTextInput"
import {
  useDeleteWordAntonymMutation,
  useGetWordAntonymsQuery,
  useUpdateWordAntonymMutation,
} from "../../../api/antonyms.api"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import AddAntonymModal from "./AddAntonymModal"
import DeleteAntonymsModal from "./DeleteAntonymsModal"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

export default function WordAntonyms({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const { isLoading, error, data } = useGetWordAntonymsQuery(word, meaning_id)

  const updateAntonymMutation = useUpdateWordAntonymMutation(word, meaning_id)

  const handleUpdate = (antonym_id: number, antonym: string) => {
    updateAntonymMutation.mutate(
      { antonym_id, antonym },
      {
        onSuccess: () => {
          successToast("Antonym has been edited successfully")
          onClose()
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  const deleteAntonymMutation = useDeleteWordAntonymMutation(word, meaning_id)

  const handleDelete = (antonym_id: number) => {
    deleteAntonymMutation.mutate(
      { antonym_id },
      {
        onSuccess: () => {
          successToast("Antonym has been deleted successfully")
          onDeleteClose()
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Antonyms
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <AccessControlledIconButton
            type="ADD"
            onClick={onOpen}
            title="Add antonym"
          />
          <AccessControlledIconButton
            type="DELETE"
            onClick={onDeleteOpen}
            title="Delete all antonyms"
            isEmpty={!(data?.length || 0)}
          />
        </Flex>
        <OrderedList>
          {data && data.length > 0 ? (
            data.map((antonym) => (
              <ListItem key={antonym.id} display="inline-block">
                <EditableTextInput
                  key={antonym.id}
                  defaultValue={antonym.antonym}
                  setText={(value) => {
                    value === ""
                      ? handleDelete(antonym.id)
                      : handleUpdate(antonym.id, value)
                  }}
                  type="textarea"
                />
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" p="2" fontSize="2xl">
              No antonyms found
            </Text>
          )}
        </OrderedList>
      </Box>
      <AddAntonymModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteAntonymsModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Box>
  )
}

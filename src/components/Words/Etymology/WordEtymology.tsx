import {
  Box,
  Flex,
  Text,
  Heading,
  useDisclosure,
  ListItem,
  OrderedList,
} from "@chakra-ui/react"
import {
  useDeleteWordEtymologyMutation,
  useGetWordEtymologiesQuery,
  useUpdateWordEtymologyMutation,
} from "../../../api/etymology.api"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import DeleteEtymologyModal from "./DeleteEtymologyModal"
import EditableTextInput from "../EditableTextInput"
import AddEtymologyModal from "./AddEtymologyModal"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"

export default function WordEtymology({
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

  const { isLoading, error, data } = useGetWordEtymologiesQuery(
    word,
    meaning_id
  )

  const updatedEtymologyMutation = useUpdateWordEtymologyMutation(
    word,
    meaning_id
  )

  const handleUpdate = (etymology_id: number, etymology: string) => {
    updatedEtymologyMutation.mutate(
      { etymology_id, etymology },
      {
        onSuccess: () => {
          successToast("Etymology has been edited successfully")
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  const deleteEtymologyMudation = useDeleteWordEtymologyMutation(
    word,
    meaning_id
  )

  const handleDelete = (etymology_id: number) => {
    deleteEtymologyMudation.mutate(
      { etymology_id },
      {
        onSuccess: () => {
          successToast("Etymology has been deleted successfully")
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
          Etymology
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <AccessControlledIconButton
            onClick={onOpen}
            type="ADD"
            title="Add an etymology"
          />
          <AccessControlledIconButton
            onClick={onDeleteOpen}
            type="DELETE"
            title="Delete all etymologies"
            isEmpty={!(data?.length || 0)}
          />
        </Flex>
        <OrderedList>
          {data && data.length > 0 ? (
            data.map((etymology) => (
              <ListItem key={etymology.id}>
                <EditableTextInput
                  defaultValue={etymology.etymology}
                  setText={(value) => {
                    value === ""
                      ? handleDelete(etymology.id)
                      : handleUpdate(etymology.id, value)
                  }}
                  type="textarea"
                />
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" p="2" fontSize="2xl">
              No etymologies found
            </Text>
          )}
        </OrderedList>
      </Box>
      <AddEtymologyModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteEtymologyModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Box>
  )
}

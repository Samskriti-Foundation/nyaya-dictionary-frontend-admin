import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import EditableTextInput from "../EditableTextInput"
import AddSynonymModal from "./AddSynonymModal"
import {
  useDeleteWordSynonymMutation,
  useGetWordSynonymsQuery,
  useUpdateWordSynonymMutation,
} from "../../../api/synonyms.api"
import DeleteSynonymsModal from "./DeleteSynonymsModal"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import useSuccessToast from "../../../hooks/useSuccessToast"
import useErrorToast from "../../../hooks/useErrorToast"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

export default function WordSynonmys({
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

  const { isLoading, error, data } = useGetWordSynonymsQuery(word, meaning_id)

  const updatedSynonymMutation = useUpdateWordSynonymMutation(word, meaning_id)

  const handleUpdate = (synonym_id: number, synonym: string) => {
    updatedSynonymMutation.mutate(
      { synonym_id, synonym },
      {
        onSuccess: () => {
          successToast("Synonym has been edited successfully")
          onClose()
        },
        onError: (error) => {
          errorToast(error)
        },
      }
    )
  }

  const deleteSynonymMutation = useDeleteWordSynonymMutation(word, meaning_id)

  const handleDelete = (synonym_id: number) => {
    deleteSynonymMutation.mutate(
      { synonym_id },
      {
        onSuccess: () => {
          successToast("Synonym has been deleted successfully")
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
          Synonyms
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <AccessControlledIconButton
            type="ADD"
            title="Add synonym"
            onClick={onOpen}
          />
          <AccessControlledIconButton
            type="DELETE"
            title="Delete all synonyms"
            onClick={onDeleteOpen}
          />
        </Flex>
        <OrderedList>
          {data && data.length > 0 ? (
            data.map((synonym) => (
              <ListItem key={synonym.id} display="inline-block">
                <EditableTextInput
                  key={synonym.id}
                  defaultValue={synonym.synonym}
                  setText={(value) => {
                    value === ""
                      ? handleDelete(synonym.id)
                      : handleUpdate(synonym.id, value)
                  }}
                  type="textarea"
                />
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" p="2" fontSize="2xl">
              No synonyms found
            </Text>
          )}
        </OrderedList>
      </Box>
      <AddSynonymModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteSynonymsModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Box>
  )
}

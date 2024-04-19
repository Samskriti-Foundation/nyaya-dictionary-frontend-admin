import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { IoIosCreate } from "react-icons/io"
import { MdDelete } from "react-icons/md"
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

  const toast = useToast()

  const { isLoading, error, data } = useGetWordSynonymsQuery(word, meaning_id)

  const updatedSynonymMutation = useUpdateWordSynonymMutation(word, meaning_id)

  const handleUpdate = (synonym_id: number, synonym: string) => {
    updatedSynonymMutation.mutate(
      { synonym_id, synonym },
      {
        onSuccess: () => {
          toast({
            title: "Synonym has been edited successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
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
          toast({
            title: "Synonym has been deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onDeleteClose()
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
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
          <IconButton
            aria-label="Add"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            title="Add synonym"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={
              data?.length ?? 0 > 0 ? "Delete all synonyms" : "No synonyms"
            }
            isDisabled={!(data?.length || 0)}
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
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

import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  ListItem,
  OrderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { IoIosCreate } from "react-icons/io"
import EditableTextInput from "../EditableTextInput"
import {
  useDeleteWordAntonymMutation,
  useGetWordAntonymsQuery,
  useUpdateWordAntonymMutation,
} from "../../../api/antonyms.api"
import { MdDelete } from "react-icons/md"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import AddAntonymModal from "./AddAntonymModal"
import DeleteAntonymsModal from "./DeleteAntonymsModal"

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

  const toast = useToast()

  const { isLoading, error, data } = useGetWordAntonymsQuery(word, meaning_id)

  const updateAntonymMutation = useUpdateWordAntonymMutation(word, meaning_id)

  const handleUpdate = (antonym_id: number, antonym: string) => {
    updateAntonymMutation.mutate(
      { antonym_id, antonym },
      {
        onSuccess: () => {
          toast({
            title: "Antonym has been edited successfully",
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

  const deleteAntonymMutation = useDeleteWordAntonymMutation(word, meaning_id)

  const handleDelete = (antonym_id: number) => {
    deleteAntonymMutation.mutate(
      { antonym_id },
      {
        onSuccess: () => {
          toast({
            title: "Antonym has been deleted successfully",
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
          Antonyms
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            title="Add antonym"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={
              data?.length ?? 0 > 0 ? "Delete all antonyms" : "No antonyms"
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

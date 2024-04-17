import {
  Box,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
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
import { IoIosCreate } from "react-icons/io"

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

  const toast = useToast()

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
          toast({
            title: "Etymology has been edited successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
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

  const deleteEtymologyMudation = useDeleteWordEtymologyMutation(
    word,
    meaning_id
  )

  const handleDelete = (etymology_id: number) => {
    deleteEtymologyMudation.mutate(
      { etymology_id },
      {
        onSuccess: () => {
          toast({
            title: "Etymology has been deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
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
          Etymology
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={
              data?.length ?? 0 > 0
                ? "Delete all etymologies"
                : "No etymologies"
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
        <Box>
          {data &&
            data.map((etymology) => (
              <EditableTextInput
                key={etymology.id}
                defaultValue={etymology.etymology}
                setText={(value) => {
                  value === ""
                    ? handleDelete(etymology.id)
                    : handleUpdate(etymology.id, value)
                }}
                type="textarea"
              />
            ))}
        </Box>
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

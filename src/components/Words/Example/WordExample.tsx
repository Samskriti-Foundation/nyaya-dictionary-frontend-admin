import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { IoIosCreate } from "react-icons/io"
import ErrorMessage from "../../ErrorMessage"
import LoadingSpinner from "../../LoadingSpinner"
import DeleteExamplesModal from "./DeleteExamplesModal"
import AddExampleModal from "./AddExampleModal"
import ExampleTable from "./ExampleTable"
import { useGetWordExamplesQuery } from "../../../api/example.api"

export default function WordExample({
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

  const { data, isLoading, error } = useGetWordExamplesQuery(word, meaning_id)

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Example
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            title="Add example"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={data?.length ? "Delete all examples" : "No examples"}
            isDisabled={!(data?.length || 0)}
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
            onClick={onDeleteOpen}
          />
        </Flex>
        <Spacer h="2" />
        {data && data.length > 0 ? (
          <ExampleTable word={word} meaning_id={meaning_id} />
        ) : (
          <Text textAlign="center" p="2" fontSize="2xl">
            No examples found
          </Text>
        )}
      </Box>
      <AddExampleModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteExamplesModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

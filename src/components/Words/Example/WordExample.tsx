import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import ErrorMessage from "../../ErrorMessage"
import LoadingSpinner from "../../LoadingSpinner"
import DeleteExamplesModal from "./DeleteExamplesModal"
import AddExampleModal from "./AddExampleModal"
import ExampleTable from "./ExampleTable"
import { useGetWordExamplesQuery } from "../../../api/example.api"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

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
          <AccessControlledIconButton
            type="ADD"
            onClick={onOpen}
            title="Add an example"
          />
          <AccessControlledIconButton
            type="DELETE"
            onClick={onDeleteOpen}
            title="Delete all examples"
            isEmpty={!(data?.length || 0)}
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

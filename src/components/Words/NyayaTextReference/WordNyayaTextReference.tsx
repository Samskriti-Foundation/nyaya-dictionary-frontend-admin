import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import { IoIosCreate } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { Text } from "@chakra-ui/react"
import { useGetWordNyayaTextReferencesQuery } from "../../../api/nyayaTextReference.api"
import AddNyayaTextReferenceModal from "./AddNyayaTextReferenceModal"
import DeleteNyayaTextReferencesModal from "./DeleteNyayaTextReferencesModal"
import NyayaTable from "./NyayaTable"

export default function WordNyayaTextReference({
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

  const { data, isLoading, error } = useGetWordNyayaTextReferencesQuery(
    word,
    meaning_id
  )

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }
  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Nyaya Text References
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            title="Add nyaya text reference"
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
              data?.length
                ? "Delete all nyaya text references"
                : "No nyaya text references"
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
        <Spacer h="2" />
        {data && data.length > 0 ? (
          <NyayaTable word={word} meaning_id={meaning_id} />
        ) : (
          <Text textAlign="center" p="2" fontSize="2xl">
            No nyaya text references found
          </Text>
        )}
      </Box>
      <AddNyayaTextReferenceModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteNyayaTextReferencesModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

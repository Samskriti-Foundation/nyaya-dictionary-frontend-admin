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
import AddTranslationModal from "./AddTranslationModal"
import { IoIosCreate } from "react-icons/io"
import DeleteTranslationsModal from "./DeleteTranslationsModal"
import { useGetWordTranslationsQuery } from "../../../api/translation.api"
import ErrorMessage from "../../ErrorMessage"
import LoadingSpinner from "../../LoadingSpinner"
import TranslationTable from "./TranslationTable"

export default function WordTranslation({
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

  const { data, isLoading, error } = useGetWordTranslationsQuery(
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
          Translation
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            title="Add translation"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={data?.length ? "Delete all translations" : "No translations"}
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
          <TranslationTable word={word} meaning_id={meaning_id} />
        ) : (
          <Text textAlign="center" p="2" fontSize="2xl">
            No translations found
          </Text>
        )}
      </Box>
      <AddTranslationModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteTranslationsModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

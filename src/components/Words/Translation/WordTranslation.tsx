import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import AddTranslationModal from "./AddTranslationModal"
import DeleteTranslationsModal from "./DeleteTranslationsModal"
import { useGetWordTranslationsQuery } from "../../../api/translation.api"
import ErrorMessage from "../../ErrorMessage"
import LoadingSpinner from "../../LoadingSpinner"
import TranslationTable from "./TranslationTable"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

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
          <AccessControlledIconButton
            title="Add translation"
            type="ADD"
            onClick={onOpen}
          />
          <AccessControlledIconButton
            type="DELETE"
            title="Delete all translations"
            isEmpty={data?.length ? false : true}
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

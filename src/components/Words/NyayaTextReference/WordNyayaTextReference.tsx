import { Box, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import { Text } from "@chakra-ui/react"
import { useGetWordNyayaTextReferencesQuery } from "../../../api/nyayaTextReference.api"
import AddNyayaTextReferenceModal from "./AddNyayaTextReferenceModal"
import DeleteNyayaTextReferencesModal from "./DeleteNyayaTextReferencesModal"
import NyayaTable from "./NyayaTable"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

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
          <AccessControlledIconButton
            title="Add nyaya text reference"
            type="ADD"
            onClick={onOpen}
          />
          <AccessControlledIconButton
            type="DELETE"
            title="Delete all nyaya text references"
            isEmpty={data?.length ? false : true}
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

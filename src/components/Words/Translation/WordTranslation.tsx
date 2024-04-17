import {
  Box,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import AddTranslationModal from "./AddTranslationModal"
import { IoIosCreate } from "react-icons/io"
import DeleteTranslationModal from "./DeleteTranslationModal"
import { useGetWordTranslationsQuery } from "../../../api/translation.api"
import ErrorMessage from "../../ErrorMessage"
import LoadingSpinner from "../../LoadingSpinner"

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
        <Table>
          <Thead>
            <Tr>
              <Th>Languages</Th>
              <Th>Translation</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((translation) => (
                <Tr key={translation.id}>
                  <Td>{translation.language}</Td>
                  <Td>{translation.translation}</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      title="Delete translation"
                      icon={<MdDelete />}
                      size="sm"
                      fontSize="xl"
                      variant="outline"
                      colorScheme="red"
                      onClick={() => onDeleteClose(translation.id)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Languages</Th>
              <Th>Translation</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <AddTranslationModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteTranslationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

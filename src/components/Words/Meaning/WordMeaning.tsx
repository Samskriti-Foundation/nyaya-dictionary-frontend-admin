import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"

import {
  useGetWordMeaningQuery,
  useUpdateWordMeaningMutation,
} from "../../../api/meaning.api"
import EditableTextInput from "../EditableTextInput"

import { MdDelete } from "react-icons/md"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import DeleteMeaningModal from "./DeleteMeaningModal"

export default function WordMeaning({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { isLoading, error, data } = useGetWordMeaningQuery(word, meaning_id)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const meaningMutation = useUpdateWordMeaningMutation(word, meaning_id)

  const handleEdit = (value: string) => {
    meaningMutation.mutate(
      { meaning: value },
      {
        onSuccess: () => {
          toast({
            title: "Meaning has been edited successfully",
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

  isLoading && <LoadingSpinner />

  error && <ErrorMessage error={error.message} />

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Meaning
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Delete"
            title="Delete meaning"
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
            onClick={onOpen}
          />
        </Flex>
      </Box>
      {data && (
        <>
          <EditableTextInput
            defaultValue={data.meaning}
            type="textarea"
            setText={(value) => {
              handleEdit(value)
            }}
          />
          <Flex direction="column" gap="2" mt="6">
            <Divider />
            {/* <WordEtymology word={word} meaning_id={meaning_id} /> */}
          </Flex>
        </>
      )}

      <DeleteMeaningModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

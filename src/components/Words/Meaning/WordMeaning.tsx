import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import { Meaning } from "../../../types"
import { deleteWordMeaning, getWordMeaning } from "../../../api/WordMeaning"
import { useQuery } from "@tanstack/react-query"
import EditableTextInput from "../EditableTextInput"

import { useState } from "react"
import { MdDelete } from "react-icons/md"
import DeleteModal from "../BaseModals/DeleteModal"
import WordEtymology from "../Etymology/WordEtymology"
// import SingleWordEtymology from "../Etymology/Etymology";
// import SingleWordDerivation from "../Derivation/WordDerivation";
// import SingleWordTranslation from "../Translation/SingleWordTranslation";
// import SingleWordExample from "../Example/Example";
// import SingleWordNyayaTextReference from "../NyayaTextReference/SingleWordNyayaTextReference";
// import DeleteVerificationModal from "../Modals/DeleteVerificationModal";

export default function WordMeaning({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { data, isLoading, error } = useQuery<Meaning>({
    queryKey: ["words", word, meaning_id],
    queryFn: () => getWordMeaning(word, meaning_id),
  })

  const [meaning, setMeaning] = useState(data?.meaning)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) {
    return (
      <Box w="100%" textAlign="center">
        <Spinner />
      </Box>
    )
  }

  if (error) {
    return <Text color="red">{error.message}</Text>
  }

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
            setText={setMeaning}
          />
          <Flex direction="column" gap="2" mt="6">
            <Divider />
            <WordEtymology />
          </Flex>
        </>
      )}
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        title="Are you sure you want to delete this meaning?"
        description="All the data associated with this meaning will be deleted. This action cannot be undone."
        deleteFn={deleteWordMeaning}
        queryKey={["words", word]}
        mutParams={{ word: word, meaning_id: meaning_id }}
        deletemessage="Meaning deleted successfully"
      />
    </Box>
  )
}

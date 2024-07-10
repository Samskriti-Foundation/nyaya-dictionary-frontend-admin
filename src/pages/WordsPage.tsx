import { useState } from "react"
import WordsTable from "../components/Words/WordsTable"
import BaseLayout from "../layouts/BaseLayout"

import {
  Button,
  Flex,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
} from "@chakra-ui/react"
import AddWordModal from "../components/Words/WordModals/AddWordModal"
import { useGetWordsCountQuery } from "../api/words.api"
import BeatLoader from "react-spinners/BeatLoader"
import ErrorMessage from "../components/ErrorMessage"

export default function WordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isLoading, error, data } = useGetWordsCountQuery()

  return (
    <BaseLayout>
      <Flex w="80%" direction="column" mx="auto" mt="10">
        <Flex mx="auto">
          <Stat
            textAlign="center"
            p="4"
            mb="6"
            bg="tertiary.400"
            color="foreground"
            rounded="md"
          >
            <StatLabel>Total Words</StatLabel>
            <StatNumber>
              {isLoading && <BeatLoader size={6} color="white" />}
              {error && <ErrorMessage error={error.message} />}
              {data}
            </StatNumber>
          </Stat>
        </Flex>
        <Flex alignItems="center" w="75%" mx="auto" gap="4" mb="6">
          <Input
            placeholder="Search for a word"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="foreground"
            rounded="lg"
            size="lg"
            _focus={{ borderColor: "tertiary.900" }}
            _hover={{ borderColor: "tertiary.900" }}
          />
          <Button
            onClick={onOpen}
            size="lg"
            bg="tertiary.400"
            color="foreground"
            _hover={{ bg: "tertiary.500" }}
          >
            Add Word
          </Button>
        </Flex>
        <WordsTable searchTermOut={searchTerm} />
        <AddWordModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </BaseLayout>
  )
}

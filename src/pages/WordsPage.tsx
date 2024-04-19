import { useState } from "react"
import WordsTable from "../components/Words/WordsTable"
import BaseLayout from "../layouts/BaseLayout"

import { Button, Flex, Input, useDisclosure } from "@chakra-ui/react"
import AddWordModal from "../components/Words/WordModals/AddWordModal"

export default function WordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <BaseLayout>
      <Flex w="80%" direction="column" mx="auto" mt="20">
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

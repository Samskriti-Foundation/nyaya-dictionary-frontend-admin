import { useParams } from "react-router-dom"
import BaseLayout from "../layouts/BaseLayout"

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  useDisclosure,
  IconButton,
  Flex,
} from "@chakra-ui/react"

import WordMeaning from "../components/Words/Meaning/WordMeaning"
import { MdDelete, MdEdit } from "react-icons/md"
import { IoIosCreate } from "react-icons/io"
import DeleteWordModal from "../components/Words/WordModals/DeleteWordModal"
import { useGetWordQuery } from "../api/words.api"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import EditWordModal from "../components/Words/WordModals/EditWordModal"
import AddMeaningModal from "../components/Words/Meaning/AddMeaningModal"

export default function SingleWordPage() {
  let { word } = useParams()

  if (word === undefined) {
    word = ""
  }

  const { isLoading, error, data } = useGetWordQuery(word)

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure()

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  isLoading && <LoadingSpinner />

  error && <ErrorMessage error={error.message} />

  return (
    <BaseLayout>
      <Box
        w="80%"
        mx="auto"
        boxShadow="lg"
        mt="16"
        bg="foreground"
        rounded="md"
        p="4"
      >
        {data ? (
          <Box w="100%">
            <Box
              textAlign="center"
              fontSize="3xl"
              fontWeight="bold"
              position="relative"
            >
              <Heading>
                {data.sanskrit_word} | {data.english_transliteration}
              </Heading>
              <Flex position="absolute" right="2" top="2" gap="2">
                <IconButton
                  aria-label="Add Meaning"
                  title="Add Meaning"
                  icon={<IoIosCreate />}
                  size="sm"
                  fontSize="xl"
                  variant="outline"
                  colorScheme="blue"
                  onClick={onAddOpen}
                />
                <IconButton
                  aria-label="Edit"
                  title="Edit Word"
                  icon={<MdEdit />}
                  size="sm"
                  fontSize="xl"
                  variant="outline"
                  colorScheme="alphas"
                  onClick={onEditOpen}
                />
                <IconButton
                  aria-label="Delete"
                  title="Delete word"
                  icon={<MdDelete />}
                  size="sm"
                  fontSize="xl"
                  variant="outline"
                  colorScheme="red"
                  onClick={onDeleteOpen}
                />
              </Flex>
            </Box>
            <Box mt="6">
              <Tabs isFitted variant="enclosed-colored" isLazy>
                <TabList mb="1em">
                  {data.meaning_ids?.map(
                    (meaning_id: number, index: number) => (
                      <Tab key={meaning_id}>Meaning {index + 1}</Tab>
                    )
                  )}
                </TabList>
                <TabPanels>
                  {data.meaning_ids?.map((meaning_id: number, index) => (
                    <TabPanel key={index}>
                      <WordMeaning
                        word={data.sanskrit_word}
                        meaning_id={meaning_id}
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        ) : (
          <Box>
            <Heading textAlign="center">Word not found</Heading>
          </Box>
        )}
      </Box>
      <Box>
        <AddMeaningModal word={word} isOpen={isAddOpen} onClose={onAddClose} />
        <DeleteWordModal
          word={word}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
        {data && (
          <EditWordModal
            sanskrit_word={word}
            english_transliteration={data.english_transliteration}
            isOpen={isEditOpen}
            onClose={onEditClose}
          />
        )}
      </Box>
    </BaseLayout>
  )
}

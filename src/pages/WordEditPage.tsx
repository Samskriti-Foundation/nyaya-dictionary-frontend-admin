import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getWord } from "../api/WordApi"
import BaseLayout from "../layouts/BaseLayout"
import { Word } from "../types"

import { 
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react"

import SingleWordEdit from "../components/Words/SingleWordEdit"
import AddMeaningModal from "../components/Words/Modals/AddMeaningModal"


export default function WordEditPage() {
  const { word } = useParams();

  const { data: word_data } = useQuery({
    queryKey: ["words", word],
    queryFn: () => getWord(word),
  });

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <BaseLayout>
      <Box w="80%" mx="auto" boxShadow="lg" mt="16" bg="foreground" rounded="md" p="4">
        {word_data && (
          <Box w="100%">
            <Box textAlign="center" fontSize="3xl" fontWeight="bold" position = "relative">
              <Heading>{word_data.sanskrit_word} | {word_data.english_transliteration}</Heading>
              <Box position = "absolute" right = "2" top = "0">
                <Button size = "md" bg = "tertiary" onClick = {onOpen}>Add Meaning</Button>
              </Box>
            </Box>
            <Box mt="6">
              <Tabs isFitted variant="enclosed-colored">
                <TabList mb="1em">
                  {word_data.meaning_ids?.map((meaning_id: number, index: number) => (
                    <Tab key={meaning_id}>Meaning {index + 1}</Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {word_data.meaning_ids?.map((meaning_id: number) => (
                    <TabPanel key={meaning_id}>
                      <SingleWordEdit word={word_data.sanskrit_word} meaning_id={meaning_id} />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        )}
      </Box>
      <AddMeaningModal word = {word} isOpen={isOpen} onClose={onClose}/>
    </BaseLayout>
  );
}


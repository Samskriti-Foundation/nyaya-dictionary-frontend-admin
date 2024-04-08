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
} from "@chakra-ui/react"
import WordMeaning from "../components/Words/WordMeaning"


export default function WordEditPage() {
  const { word } = useParams()

  const {data}: {data: Word | undefined} = useQuery({
    queryKey: ["words"],
    queryFn: () => getWord(word)
  })

  return (
    <BaseLayout>
      <Box
        w = "80%"
        mx = "auto"
        boxShadow = "lg"
        mt = "16"
        bg = "foreground"
        rounded = "md"
        p = "4"
        >
        {data && (
          <Box w = "100%">
            <Box
              textAlign = "center"
              fontSize = "3xl"
              fontWeight = "bold"
              >
              {data.sanskrit_word} | {data.english_transliteration}
            </Box>
            <Box mt = "6">
              <Tabs isFitted variant='enclosed-colored'>
                <TabList mb='1em'>
                  {data.meanings?.map((meaning) => (
                    <Tab key={meaning.meaning_id}>Meaning {meaning.meaning_id}</Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {data.meanings?.map((meaning) => (
                    <TabPanel key={meaning.meaning_id}>
                      <WordMeaning meaning = {meaning}/>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        )}
      </Box>
    </BaseLayout>
    )
}

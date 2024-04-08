import WordsTable from "../components/Words/WordsTable"
import BaseLayout from "../layouts/BaseLayout"

import { Flex } from "@chakra-ui/react"

export default function WordsPage() {
  return (
    <BaseLayout>
      <Flex w = "100%" h = "100%">
        <WordsTable/>
      </Flex>
    </BaseLayout>
  )
}

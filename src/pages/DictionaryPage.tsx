import DictionaryTable from "../components/Dictionary/DictionaryTable"
import BaseLayout from "../layouts/BaseLayout"

import { Flex } from "@chakra-ui/react"

export default function DictionaryPage() {
  return (
    <BaseLayout>
      <Flex w = "100%" h = "100%">
        <DictionaryTable/>
      </Flex>
    </BaseLayout>
  )
}

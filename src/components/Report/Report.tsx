import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import DatabaseOperationsTable from "./DatabaseOperationsTable"
import LoginAuditsTable from "./LoginAuditsTable"

export default function Report() {
  return (
    <Box w="80%" mx="auto" mt="10">
      <Tabs
        isFitted
        variant="enclosed-colored"
        isLazy
        boxShadow="md"
        bg="white"
      >
        <TabList>
          <Tab>Database Operations</Tab>
          <Tab>Login Audits</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DatabaseOperationsTable />
          </TabPanel>
          <TabPanel>
            <LoginAuditsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

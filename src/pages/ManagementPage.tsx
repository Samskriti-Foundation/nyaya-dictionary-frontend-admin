import { Flex, List, Link } from "@chakra-ui/react"
import BaseLayout from "../layouts/BaseLayout"
import Drawer from "../components/Drawer/Drawer"
import { NavLink, Route, Routes } from "react-router-dom"
import DBManagers from "../components/DBManagers/DBManagers"
import Report from "../components/Report/Report"

export default function ManagementPage() {
  return (
    <BaseLayout>
      <Flex>
        <Drawer>
          <List>
            <Link
              display="block"
              fontWeight="bold"
              py={2}
              color="white"
              bg={
                window.location.pathname === "/management/"
                  ? "tertiary.500"
                  : "transparent"
              }
              _hover={{ bg: "tertiary.400" }}
              as={NavLink}
              to={"/management/"}
            >
              {"DB Managers"}
            </Link>
            <Link
              display="block"
              fontWeight="bold"
              py={2}
              color="white"
              bg={
                window.location.pathname === "/management/reports/"
                  ? "tertiary.500"
                  : "transparent"
              }
              _hover={{ bg: "tertiary.400" }}
              as={NavLink}
              to={"/management/reports/"}
            >
              {"Reports"}
            </Link>
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<DBManagers />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </Flex>
    </BaseLayout>
  )
}

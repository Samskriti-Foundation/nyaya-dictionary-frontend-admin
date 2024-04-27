import { Flex, List, Link } from "@chakra-ui/react"
import BaseLayout from "../layouts/BaseLayout"
import Drawer from "../components/Drawer/Drawer"
import { NavLink, Route, Routes } from "react-router-dom"
import DBManagers from "../components/DBManagers/DBManagers"
import Report from "../components/Report/Report"

const links = [
  {
    text: "DB Managers",
    path: "/management/",
  },
  {
    text: "Reports",
    path: "/management/reports",
  },
]

export default function ManagementPage() {
  return (
    <BaseLayout>
      <Flex>
        <Drawer>
          <List>
            {links.map((link, index) => (
              <Link
                key={index}
                display="block"
                fontWeight="bold"
                py={2}
                as={NavLink}
                to={link.path}
              >
                {link.text}
              </Link>
            ))}
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

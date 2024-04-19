import { Flex, List, ListItem, Link } from "@chakra-ui/react"
import BaseLayout from "../layouts/BaseLayout"
import Drawer from "../components/Drawer/Drawer"
import { NavLink, Route, Routes } from "react-router-dom"
import Admin from "../components/Admin/Admin"
import Report from "../components/Report/Report"

const links = [
  {
    text: "Admins",
    path: "/management",
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
          <List mt="4">
            {links.map((link, index) => (
              <ListItem
                key={index}
                fontWeight="bold"
                py={2}
                _activeLink={{ color: "background" }}
              >
                <Link as={NavLink} to={link.path}>
                  {link.text}
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </Flex>
    </BaseLayout>
  )
}

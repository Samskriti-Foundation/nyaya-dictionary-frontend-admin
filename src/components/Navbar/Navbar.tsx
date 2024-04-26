import { Button, Flex, HStack, Heading, Link, Spacer } from "@chakra-ui/react"
import { useContext } from "react"

import { NavLink } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

export default function Navbar() {
  let { role } = useContext(AuthContext)
  const { logout } = useContext(AuthContext)

  role = role ?? "EDITOR"

  const isAccessAllowed = role === "ADMIN" || role === "SUPERUSER"

  return (
    <Flex as="header" bg="foreground" boxShadow="md" p={3}>
      <Flex w={{ base: "100%", md: "80%" }} m="auto" alignItems="center">
        <Heading
          fontSize={{ base: "xl", md: "2xl" }}
          bgGradient="linear(to-l, primary.400, secondary.400)"
          bgClip="text"
        >
          <Link as={NavLink} to="/words" _hover={{ textDecoration: "none" }}>
            Nyaya - Admin Panel
          </Link>
        </Heading>
        <Spacer />
        <HStack spacing={{ base: 4, md: 8 }} fontWeight="bold">
          <Link
            as={NavLink}
            to="/words"
            _hover={{ color: "primary.500" }}
            _activeLink={{ color: "primary.400" }}
          >
            Dictionary
          </Link>
          {isAccessAllowed && (
            <Link
              as={NavLink}
              to="/management/"
              _hover={{ color: "primary.500" }}
              _activeLink={{ color: "primary.400" }}
            >
              Management
            </Link>
          )}
          <Button
            onClick={logout}
            color="background"
            bg="primary.400"
            _hover={{ bg: "primary.500" }}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Flex>
  )
}

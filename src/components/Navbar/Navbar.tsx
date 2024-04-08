import {
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";

import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const user = localStorage.getItem("token") ? true : false

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <Flex
      as = "header"
      bg = "foreground"
      boxShadow = "md"
      p = {3}
      >
      <Flex
        w = {{base: "100%", md: "80%"}}
        m = "auto"
        alignItems= "center"
        >
        <Heading 
          fontSize={{base: "xl", md: "2xl"}}
          bgGradient='linear(to-l, primary, secondary)'
          bgClip='text'
          ><Link 
            as = {NavLink}
            to = "/words"
            _hover = {{textDecoration: "none"}}
            >Nyaya - Admin Panel
          </Link>
        </Heading>
        <Spacer/>
        <HStack
          spacing = {{base: 4, md: 8}}
          fontWeight= "bold"
          >
          <Link
            as = {NavLink}
            to = "/words"
            _hover = {{color: "secondary"}}
            _activeLink = {{color: "primary"}}
            >Dictionary
          </Link>
          {user &&
            <Link
            as = {NavLink}
            to = "/management"
            _hover = {{color: "secondary"}}
            _activeLink = {{color: "primary"}}
            >Management
          </Link>
          }
          <Button
            onClick = {logout}
            color = "background"
            bg = "primary"
            _hover = {{bg: "secondary"}}
          >Logout</Button> 
        </HStack>
      </Flex>
    </Flex>
  )
}
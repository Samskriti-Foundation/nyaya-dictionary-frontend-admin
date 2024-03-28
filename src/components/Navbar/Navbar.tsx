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
            to = "/dashboard"
            _hover = {{textDecoration: "none"}}
            >Nyaya Khosha
          </Link>
        </Heading>
        <Spacer/>
        <HStack
          spacing = {{base: 4, md: 8}}
          fontWeight= "bold"
          >
          <Link
            as = {NavLink}
            to = "/dashboard"
            _hover = {{color: "secondary"}}
            _activeLink = {{color: "primary"}}
            >Home
          </Link>
          {user &&
            <Link
            as = {NavLink}
            to = "/admin-management"
            _hover = {{color: "secondary"}}
            _activeLink = {{color: "primary"}}
            >Admin-Management
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
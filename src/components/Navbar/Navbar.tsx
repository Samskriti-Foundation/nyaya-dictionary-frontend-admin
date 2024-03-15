import {
    Flex,
    HStack,
    Heading,
    Link,
    Spacer,
    Box
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box
      as = "nav"
      color = "primary.300"
      bg = "primary.500"
      p = {4}
      >
      <Flex
        w = {{base: "100%", md: "80%"}}
        m = "auto"
        >
        <Heading 
          fontSize={{base: "xl", md: "2xl"}}
          color = "primary.300"
          ><Link 
            as = {NavLink}
            to = "/"
            _hover = {{textDecoration: "none"}}
            >Admin Panel
          </Link>
        </Heading>
        <Spacer/>
        <HStack
          spacing = {{base: 4, md: 8}}
          fontWeight= "bold"
          >
          <Link
            as = {NavLink}
            to = "/"
            >Home
          </Link>
          <Link
            as = {NavLink}
            to = "/about"
            >About
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}
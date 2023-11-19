import { Flex, Box, Heading, Spacer, IconButton } from "@chakra-ui/react"
import { FaHome } from 'react-icons/fa';
import Navbar from "./navbar/Navbar"
import { NavLink } from "react-router-dom"

export default function Header() {

  return (
    <Flex as="nav" p="5px" bg = "brand.900" h="10vh">
      <NavLink to="/">
        <IconButton size="lg" aria-label='Home' colorScheme='blue' icon={<FaHome />} />
      </NavLink>
      <Heading as="h1" fontSize="2em" p="10px" color="white">Go Fish</Heading>
      <Spacer />
      <Navbar />
    </Flex>
  );
}
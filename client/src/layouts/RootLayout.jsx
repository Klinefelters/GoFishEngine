import { Outlet } from "react-router-dom"
import {Box} from "@chakra-ui/react"

// components
import Header from "../components/Header"

export default function RootLayout() {
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Outlet />
    </Box>
  )
}
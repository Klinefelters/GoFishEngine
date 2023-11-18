import { Outlet } from "react-router-dom"
import {Box} from "@chakra-ui/react"

// components
import Topbar from "../components/Topbar"

export default function RootLayout() {
  return (
    <Box w="100vw" h="100vh">
      <Topbar />
      <Outlet />
    </Box>
  )
}
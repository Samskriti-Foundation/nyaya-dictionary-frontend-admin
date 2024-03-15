import { Box } from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar"
import { useQuery } from "@tanstack/react-query"
import { getAdmins } from "../api/AdminApi"

export default function DashboardPage() {
  const {data} = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  })

  return (
    <Box h = "full" bg = "primary.300">
      <Navbar />
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Box>
  )
}

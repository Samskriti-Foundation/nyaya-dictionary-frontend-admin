import { Box } from "@chakra-ui/react"

export default function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bg="tertiary.300"
      minW="240px"
      h="calc(100vh - 64px)"
      boxShadow="xl"
      textAlign="center"
    >
      {children}
    </Box>
  )
}

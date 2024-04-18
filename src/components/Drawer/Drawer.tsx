import { Box } from "@chakra-ui/react"

export default function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bg="tertiary.300"
      w="240px"
      h="calc(100vh - 64px)"
      boxShadow="xl"
      textAlign="center"
      py={2}
    >
      {children}
    </Box>
  )
}

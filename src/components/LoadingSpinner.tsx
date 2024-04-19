import { Flex, Spinner } from "@chakra-ui/react"

export default function LoadingSpinner() {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  )
}

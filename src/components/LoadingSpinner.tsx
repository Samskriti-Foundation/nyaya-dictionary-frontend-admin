import { Flex, Spinner } from "@chakra-ui/react"

export default function LoadingSpinner() {
  return (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  )
}

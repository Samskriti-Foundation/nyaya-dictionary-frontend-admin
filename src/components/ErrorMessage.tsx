import { Text, Flex } from "@chakra-ui/react"

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Text size="xl">{error}</Text>
    </Flex>
  )
}

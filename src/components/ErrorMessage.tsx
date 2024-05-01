import { Text, Flex } from "@chakra-ui/react"

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Text size="xl">{error}</Text>
    </Flex>
  )
}

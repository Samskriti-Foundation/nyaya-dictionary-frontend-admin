import { Box, Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { Etymology } from "../../../types"
import {
  deleteWordEtymologies,
  getWordEtymologies,
} from "../../../api/WordEtymology"
import DeleteModal from "../BaseModals/DeleteModal"
import { useQuery } from "@tanstack/react-query"

export default function WordEtymology({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { data, isLoading, error } = useQuery<Etymology[]>({
    queryKey: ["words", word, meaning_id],
    queryFn: () => getWordEtymologies(word, meaning_id),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(data)

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Etymology
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Delete"
            title="Delete meaning"
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
            onClick={onOpen}
          />
        </Flex>
        <Box>
          {data &&
            data.map((etymology) => (
              <Box key={etymology.id}>{etymology.etymology}</Box>
            ))}
        </Box>
      </Box>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        title="Are you sure you want to delete these etymologies?"
        description="All the etymologies associated with this meaning will be deleted. This action cannot be undone."
        deleteFn={deleteWordEtymologies}
        queryKey={["words", word, meaning_id]}
        mutParams={{ word, meaning_id }}
        deletemessage="Etymologies deleted successfully"
      />
    </Box>
  )
}

import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { IoIosCreate } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import EditableTextInput from "../EditableTextInput"
import {
  useDeleteWordDerivationMutation,
  useGetWordDerivationsQuery,
  useUpdateWordDerivationMutation,
} from "../../../api/derivation.api"
import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import DeleteDerivationModal from "./DeleteDerivationModal"
import AddDerivationModal from "./AddDerivationModal"

export default function WordDerivation({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) {
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const toast = useToast()

  const { data, isLoading, error } = useGetWordDerivationsQuery(
    word,
    meaning_id
  )

  const updateDerivationMutation = useUpdateWordDerivationMutation(
    word,
    meaning_id
  )

  const handleUpdate = (derivation_id: number, derivation: string) => {
    updateDerivationMutation.mutate(
      { derivation_id, derivation },
      {
        onSuccess: () => {
          toast({
            title: "Derivation has been edited successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          onClose()
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        },
      }
    )
  }

  const deleteDerivationMutation = useDeleteWordDerivationMutation(
    word,
    meaning_id
  )

  const handleDelete = (derivation_id: number) => {
    deleteDerivationMutation.mutate(
      { derivation_id },
      {
        onSuccess: () => {
          toast({
            title: "Derivation has been deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        },
      }
    )
  }

  {
    isLoading && <LoadingSpinner />
  }
  {
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Box position="relative">
        <Heading size="lg" p="2" textAlign="center">
          Derivation
        </Heading>
        <Flex gap="2" position="absolute" right="2" top="4">
          <IconButton
            aria-label="Add"
            title="Add derivation"
            icon={<IoIosCreate />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete"
            title={
              data?.length ?? 0 > 0
                ? "Delete all derivations"
                : "No derivations"
            }
            isDisabled={!(data?.length || 0)}
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
            onClick={onDeleteOpen}
          />
        </Flex>
        <Box>
          {data && data.length > 0 ? (
            data.map((derivation) => (
              <EditableTextInput
                key={derivation.id}
                defaultValue={derivation.derivation}
                setText={(value) => {
                  value === ""
                    ? handleDelete(derivation.id)
                    : handleUpdate(derivation.id, value)
                }}
                type="textarea"
              />
            ))
          ) : (
            <Text textAlign="center" p="2" fontSize="2xl">
              No derivations found
            </Text>
          )}
        </Box>
      </Box>
      <AddDerivationModal
        isOpen={isOpen}
        onClose={onClose}
        word={word}
        meaning_id={meaning_id}
      />
      <DeleteDerivationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        word={word}
        meaning_id={meaning_id}
      />
    </Box>
  )
}

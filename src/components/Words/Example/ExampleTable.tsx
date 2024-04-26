import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
  Flex,
  Box,
} from "@chakra-ui/react"

import LoadingSpinner from "../../LoadingSpinner"
import ErrorMessage from "../../ErrorMessage"
import { useGetWordExamplesQuery } from "../../../api/example.api"
import DeleteSingleExampleModal from "./DeleteSingleExampleModal"
import { useState } from "react"
import EditExampleModal from "./EditExampleModal"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

interface ExampleTableProps {
  word: string
  meaning_id: number
}

export default function ExampleTable({ word, meaning_id }: ExampleTableProps) {
  const { data, isLoading, error } = useGetWordExamplesQuery(word, meaning_id)

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const [exampleId, setExampleId] = useState(0)
  const [example, setExample] = useState("")
  const [applicableModernContext, setApplicableModernContext] = useState("")

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th style={{ textAlign: "center" }}>Example</Th>
            <Th style={{ textAlign: "center" }}>Applicable Modern Context</Th>
            <Th style={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((example) => (
              <Tr key={example.id}>
                <Td style={{ textAlign: "center" }}>
                  {example.example_sentence}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  {example.applicable_modern_context}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex gap="2" justifyContent="center">
                    <AccessControlledIconButton
                      type="EDIT"
                      onClick={() => {
                        setExampleId(example.id)
                        setExample(example.example_sentence)
                        setApplicableModernContext(
                          example.applicable_modern_context
                        )
                        onEditOpen()
                      }}
                      title="Edit example"
                    />
                    <AccessControlledIconButton
                      type="DELETE"
                      onClick={() => {
                        setExampleId(example.id)
                        onDeleteOpen()
                      }}
                      title="Delete example"
                      isEmpty={!(example.example_sentence || "")}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th style={{ textAlign: "center" }}>Example</Th>
            <Th style={{ textAlign: "center" }}>Applicable Modern Context</Th>
            <Th style={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
      <EditExampleModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isEditOpen}
        onClose={onEditClose}
        example_id={exampleId}
        defaultExample={example}
        defaultApplicableContext={applicableModernContext}
      />
      <DeleteSingleExampleModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        example_id={exampleId}
      />
    </Box>
  )
}

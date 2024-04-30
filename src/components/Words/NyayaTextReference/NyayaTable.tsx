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
import { useState } from "react"
import { useGetWordNyayaTextReferencesQuery } from "../../../api/nyayaTextReference.api"
import EditNyayaTextReferenceModal from "./EditNyayaTextReferenceModal"
import DeleteSingleNyayaTextReferenceModal from "./DeleteSingleNyayaTextReferenceModal"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

interface NyayaTableProps {
  word: string
  meaning_id: number
}

export default function NyayaTable({ word, meaning_id }: NyayaTableProps) {
  const { data, isLoading, error } = useGetWordNyayaTextReferencesQuery(
    word,
    meaning_id
  )

  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [nyayaId, setNyayaId] = useState(0)

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
            data.map((nyaya) => (
              <Tr key={nyaya.id}>
                <Td style={{ textAlign: "center" }}>{nyaya.source}</Td>
                <Td style={{ textAlign: "center" }}>{nyaya.description}</Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex gap="2" justifyContent="center">
                    <AccessControlledIconButton
                      type="EDIT"
                      title="Edit nyaya text reference"
                      onClick={() => {
                        setNyayaId(nyaya.id)
                        setSource(nyaya.source)
                        setDescription(nyaya.description)
                        onEditOpen()
                      }}
                    />
                    <AccessControlledIconButton
                      type="DELETE"
                      title="Delete nyaya text reference"
                      isEmpty={nyaya ? false : true}
                      onClick={() => {
                        setNyayaId(nyaya.id)
                        onDeleteOpen()
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th style={{ textAlign: "center" }}></Th>
            <Th style={{ textAlign: "center" }}>Applicable Modern Context</Th>
            <Th style={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
      <EditNyayaTextReferenceModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isEditOpen}
        onClose={onEditClose}
        defaultSource={source}
        defaultDescription={description}
        nyaya_text_id={nyayaId}
      />
      <DeleteSingleNyayaTextReferenceModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        nyaya_text_id={nyayaId}
      />
    </Box>
  )
}

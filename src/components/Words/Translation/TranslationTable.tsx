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
import { useGetWordTranslationsQuery } from "../../../api/translation.api"
import DeleteSingleTranslationModal from "./DeleteSingleTranslationModal"
import { useState } from "react"
import EditTranslationModal from "./EditTranslationModal"
import AccessControlledIconButton from "../../Button/AccessControlledIconButton"

interface TranslationTableProps {
  word: string
  meaning_id: number
}

export default function TranslationTable({
  word,
  meaning_id,
}: TranslationTableProps) {
  const { data, isLoading, error } = useGetWordTranslationsQuery(
    word,
    meaning_id
  )

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

  const [translationId, setTranslationId] = useState(0)
  const [translation, setTranslation] = useState("")
  const [language, setLanguage] = useState("")

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }

  return (
    <Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th style={{ textAlign: "center" }}>Languages</Th>
            <Th style={{ textAlign: "center" }}>Translation</Th>
            <Th style={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((translation) => (
              <Tr key={translation.id}>
                <Td style={{ textAlign: "center" }}>{translation.language}</Td>
                <Td style={{ textAlign: "center" }}>
                  {translation.translation}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex gap="2" justifyContent="center">
                    <AccessControlledIconButton
                      title="Edit translation"
                      type="EDIT"
                      onClick={() => {
                        setTranslationId(translation.id)
                        setTranslation(translation.translation)
                        setLanguage(translation.language)
                        onEditOpen()
                      }}
                    />
                    <AccessControlledIconButton
                      title="Delete translation"
                      type="DELETE"
                      isEmpty={translation ? false : true}
                      onClick={() => {
                        setTranslationId(translation.id)
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
            <Th style={{ textAlign: "center" }}>Languages</Th>
            <Th style={{ textAlign: "center" }}>Translation</Th>
            <Th style={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
      <EditTranslationModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isEditOpen}
        onClose={onEditClose}
        translation_id={translationId}
        defaultLanguage={language}
        defaultTranslation={translation}
      />
      <DeleteSingleTranslationModal
        word={word}
        meaning_id={meaning_id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        translation_id={translationId}
      />
    </Box>
  )
}

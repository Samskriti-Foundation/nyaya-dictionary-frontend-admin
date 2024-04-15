import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import EditModal from "./BaseModals/EditModal"
import { useState } from "react"
import { editWord } from "../../api/WordApi"

interface EditWordModalProps {
  isOpen: boolean
  onClose: () => void
  dataItem: {
    sanskrit_word: string
    english_transliteration: string
  }
}

export default function EditWordModal({
  isOpen,
  onClose,
  dataItem,
}: EditWordModalProps) {
  const [sanskritWord, setSanskritWord] = useState(dataItem.sanskrit_word)
  const [englishTransliteration, setEnglishTransliteration] = useState(
    dataItem.english_transliteration
  )

  return (
    <EditModal
      title="Edit Word Details"
      isOpen={isOpen}
      onClose={onClose}
      queryKey={["words", dataItem.sanskrit_word]}
      mutParams={{
        sanskrit_word: sanskritWord,
        english_transliteration: englishTransliteration,
      }}
      editFn={editWord}
    >
      <Flex gap="4" direction="column">
        <FormControl>
          <FormLabel>Sanskrit Word</FormLabel>
          <Input
            placeholder="Enter Sanskrit word"
            defaultValue={dataItem.sanskrit_word}
            value={sanskritWord}
            onChange={(e) => setSanskritWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>English Transliteration</FormLabel>
          <Input
            placeholder="Enter English Transliteration"
            defaultValue={dataItem.english_transliteration}
            value={englishTransliteration}
            onChange={(e) => setEnglishTransliteration(e.target.value)}
          />
        </FormControl>
      </Flex>
    </EditModal>
  )
}

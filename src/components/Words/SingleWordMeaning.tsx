import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
  useDisclosure
} from "@chakra-ui/react";

import { Meaning } from "../../types";
import { getWordMeaning } from "../../api/WordMeaning";
import { useQuery } from "@tanstack/react-query";
import EditableTextInput from "./EditableTextInput";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import SingleWordEtymology from "./SingleWordEtymology";
import SingleWordDerivation from "./SingleWordDerivation";
import SingleWordTranslation from "./SingleWordTranslation";
import SingleWordExample from "./SingleWordExample";
import SingleWordNyayaTextReference from "./SingleWordNyayaTextReference";
import DeleteVerificationModal from "./Modals/DeleteVerificationModal";

export default function SingleWordMeaning({ word, meaning_id }: { word: string, meaning_id: number }) {
  const { data, isLoading, error } = useQuery<Meaning>({
    queryKey: ["words", word, meaning_id],
    queryFn: () => getWordMeaning(word, meaning_id)
  });

  const [meaning, setMeaning] = useState(data?.meaning)
  const {isOpen, onOpen, onClose} = useDisclosure()

  if (isLoading) {
    return (
      <Box w = "100%" textAlign="center">
        <Spinner />
      </Box>
    )
  }

  if (error) {
    return <Text color="red">{error.message}</Text>;
  }


  return (
    <Box >
      <Box position="relative">
        <Heading size = "lg" p = "2" textAlign="center">Meaning</Heading>
        <Flex gap = "2" position="absolute" right = "2" top = "4">
          <IconButton aria-label = "Delete" title = "Delete meaning" icon = {<MdDelete />} size = "sm" fontSize = "xl" variant='outline' colorScheme = "red" onClick={onOpen}/>
        </Flex>
      </Box>
      {data && (
        <>
          <EditableTextInput defaultValue={data.meaning} type = "textarea" setText={setMeaning}/>
          <Flex direction = "column" gap = "2" mt = "6">
            <Divider />
            <SingleWordEtymology word = {word} meaning_id = {meaning_id}/>
            <Divider />
            <SingleWordDerivation word = {word} meaning_id = {meaning_id}/>
            <Divider />
            <SingleWordTranslation word = {word} meaning_id = {meaning_id}/>
            <Divider />
            <SingleWordExample word = {word} meaning_id = {meaning_id}/>
            <Divider />
            <SingleWordNyayaTextReference word = {word} meaning_id = {meaning_id}/>
          </Flex>
        </>
      )}
      <DeleteVerificationModal isOpen = {isOpen} onClose = {onClose} word = {word} meaning_id = {meaning_id} meaning = {meaning}/>
    </Box>
  );
}

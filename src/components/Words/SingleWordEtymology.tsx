import { Flex, Heading } from "@chakra-ui/react";
import EditableTextInput from "./EditableTextInput";
import { useQuery } from "@tanstack/react-query";
import { Etymology } from "../../types";
import { getWordEtymologies } from "../../api/WordEtymology";

export default function SingleWordEtymology({ word, meaning_id }: { word: string, meaning_id: number }) {
  const { data, isLoading, error } = useQuery<[Etymology]>({
    queryKey: ["words", word, meaning_id, "etymologies"],
    queryFn: () => getWordEtymologies(word, meaning_id)
  });
  
  return (
    <Flex direction = "column" w = "100%">
      <Heading mx="auto" size = "lg">Etymology</Heading>
      {data?.map(eymology => (
        <EditableTextInput defaultValue = {eymology.etymology} type = "input" setText={() => {}}/>
      ))}
    </Flex>
  )
}

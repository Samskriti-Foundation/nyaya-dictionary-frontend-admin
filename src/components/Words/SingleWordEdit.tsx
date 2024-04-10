import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { Meaning } from "../../types";
import { getWordMeaning } from "../../api/WordMeaning";
import { useQuery } from "@tanstack/react-query";
import EditableTextInput from "./EditableTextInput";

export default function SingleWordEdit({ word, meaning_id }: { word: string | undefined, meaning_id: number }) {
  const { data, isLoading, error }: { data: Meaning | undefined, isLoading: boolean, error: Error | null } = useQuery({
    queryKey: ["words", word, meaning_id],
    queryFn: () => getWordMeaning({word, meaning_id})
  });

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
    <Box>
      <Heading size = "lg" p = "2" textAlign="center">Meaning</Heading>
      {data && <EditableTextInput defaultValue={data.meaning} type = "textarea"/>}
    </Box>
  );
}

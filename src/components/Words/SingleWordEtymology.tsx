// import { Flex, Heading } from "@chakra-ui/react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import EditableTextInput from "./EditableTextInput";
// import { Etymology } from "../../types";
// import { deleteWordEtymology, getWordEtymologies, updateWordEtymology } from "../../api/WordEtymology";

// // SingleWordEtymology.tsx
// export default function SingleWordEtymology({ word, meaning_id }: { word: string, meaning_id: number }) {
//   const { data, isLoading, error } = useQuery<[Etymology]>({
//     queryKey: ["words", word, meaning_id, "etymologies"],
//     queryFn: () => getWordEtymologies(word, meaning_id)
//   });

//   const updateMutation = useMutation({
//     mutationFn: (id: number, newValue: string) => updateWordEtymology(id, newValue),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id: number) => deleteWordEtymology(id),
//   });

//   const deleteAllMutation = useMutation({
//     mutationFn: () => deleteWordAllEtymologies(),
//   });

//   const handleUpdateEtymology = (id: number, newValue: string) => {
//     updateMutation.mutate(id, newValue);
//   };

//   const handleDeleteEtymology = (id: number) => {
//     deleteMutation.mutate(id);
//   };

//   const handleDeleteAllEtymologies = () => {
//     deleteAllMutation.mutate();
//   };

//   return (
//     <Flex direction="column" w="100%">
//       <Heading mx="auto" size="lg">Etymology</Heading>
//       {data?.map(eymology => (
//         <EditableTextInput
//           key={eymology.id}
//           defaultValue={eymology.etymology}
//           type="input"
//           setText={(text) => {
//             if (text === "") {
//               handleDeleteEtymology(eymology.id);
//             } else {
//               handleUpdateEtymology(eymology.id, text);
//             }
//           }}
//           elementID={eymology.id}
//         />
//       ))}
//       <Button onClick={handleDeleteAllEtymologies}>Delete All Etymologies</Button>
//     </Flex>
//   )
// }
import React from 'react'

export default function SingleWordEtymology() {
  return (
    <div>SingleWordEtymology</div>
  )
}

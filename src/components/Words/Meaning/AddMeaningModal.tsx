import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import AddModal from "../BaseModals/AddModal";
import { useState } from "react";
import { createWordMeaning } from "../../../api/WordMeaning";

interface AddMeaningModalProps {
  word: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMeaningModal({
  word,
  isOpen,
  onClose,
}: AddMeaningModalProps) {
  const [meaning, setMeaning] = useState("");

  return (
    <AddModal
      title="Add new meaning"
      mutParams={{ word, meaning }}
      mutationFn={createWordMeaning}
      queryKey={["words", word]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormControl>
        <FormLabel>New meaning</FormLabel>
        <Textarea
          placeholder="Enter new meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
      </FormControl>
    </AddModal>
  );
}

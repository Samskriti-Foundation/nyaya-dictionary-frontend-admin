import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

interface TSynonym {
  id: number
  sanskrit_word_id: number
  meaning_id: number
  synonym: string
}

export const getWordSynonyms = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/synonyms`)
  return response.data
}

export const useGetWordSynonymsQuery = (word: string, meaning_id: number) => {
  return useQuery<TSynonym[]>({
    queryKey: ["words", word, meaning_id, "synonyms"],
    queryFn: () => getWordSynonyms(word, meaning_id),
  })
}

export const getWordSynonym = async (
  word: string,
  meaning_id: number,
  synonym_id: number
) => {
  const response = await api.get(
    `/words/${word}/${meaning_id}/synonyms/${synonym_id}`
  )
  return response.data
}

export const createWordSynonym = async (
  word: string,
  meaning_id: number,
  synonym: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/synonyms`, {
    synonym,
  })
  return response.data
}

export const useCreateWordSynonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ synonym }: { synonym: string }) =>
      createWordSynonym(word, meaning_id, synonym),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "synonyms"],
      })
    },
  })
}

export const updateWordSynonym = async (
  word: string,
  meaning_id: number,
  synonym_id: number,
  synonym: string
) => {
  const response = await api.put(
    `/words/${word}/${meaning_id}/synonyms/${synonym_id}`,
    {
      synonym,
    }
  )
  return response.data
}

export const useUpdateWordSynonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      synonym_id,
      synonym,
    }: {
      synonym_id: number
      synonym: string
    }) => updateWordSynonym(word, meaning_id, synonym_id, synonym),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "synonyms"],
      })
    },
  })
}

export const deleteWordSynonym = async (
  word: string,
  meaning_id: number,
  synonym_id: number
) => {
  const response = await api.delete(
    `/words/${word}/${meaning_id}/synonyms/${synonym_id}`
  )
  return response.data
}

export const useDeleteWordSynonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ synonym_id }: { synonym_id: number }) =>
      deleteWordSynonym(word, meaning_id, synonym_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "synonyms"],
      })
    },
  })
}

export const deleteWordSynonyms = async (word: string, meaning_id: number) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/synonyms`)
  return response.data
}

export const useDeleteWordSynonymsMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordSynonyms(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "synonyms"],
      })
    },
  })
}
